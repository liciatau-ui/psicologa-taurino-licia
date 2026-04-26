require('dotenv').config();
const express = require('express');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { pool, initDb, getSite, saveSite } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const uploadDir = path.join(__dirname, 'public', 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1e9) + ext);
  }
});
const upload = multer({ storage });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(express.json({ limit: '20mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  store: new PgSession({ pool, createTableIfMissing: true }),
  secret: process.env.SESSION_SECRET || 'dev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

function requireAdmin(req, res, next) {
  if (req.session.isAdmin) return next();
  res.redirect('/admin/login');
}

app.get('/', async (req, res) => {
  const site = await getSite();
  res.render('site', { site, preview: false });
});


app.get('/admin-visual', requireAdmin, async (req, res) => {
  const site = await getSite();
  res.render('admin/visual', { site });
});

app.get('/preview', requireAdmin, async (req, res) => {
  const site = await getSite();
  res.render('site', { site, preview: true });
});

app.get('/admin/login', (req, res) => res.render('admin/login', { error: null }));
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === (process.env.ADMIN_USER || 'admin') && password === (process.env.ADMIN_PASSWORD || 'admin123')) {
    req.session.isAdmin = true;
    return res.redirect('/admin');
  }
  res.render('admin/login', { error: 'Credenziali non corrette' });
});
app.post('/admin/logout', (req, res) => req.session.destroy(() => res.redirect('/admin/login')));

app.get('/admin', requireAdmin, async (req, res) => {
  const site = await getSite();
  res.render('admin/dashboard', { site, saved: req.query.saved === '1' });
});

app.post('/admin/save', requireAdmin, async (req, res) => {
  try {
    const site = JSON.parse(req.body.siteJson);
    await saveSite(site);
    res.redirect('/admin?saved=1');
  } catch (e) {
    res.status(400).send('Errore salvataggio JSON: ' + e.message);
  }
});

app.post('/admin/upload', requireAdmin, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Nessun file caricato' });
  res.json({ url: '/uploads/' + req.file.filename });
});

initDb().then(() => {
  app.listen(PORT, () => console.log(`Server avviato su porta ${PORT}`));
}).catch(err => {
  console.error('Errore database:', err);
  process.exit(1);
});
