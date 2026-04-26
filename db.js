const { Pool } = require('pg');
const { defaultSite } = require('./data');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

function deepMerge(defaultObj, savedObj) {
  if (Array.isArray(defaultObj)) {
    return Array.isArray(savedObj) ? savedObj : defaultObj;
  }
  if (defaultObj && typeof defaultObj === 'object') {
    const result = { ...defaultObj };
    if (savedObj && typeof savedObj === 'object') {
      Object.keys(savedObj).forEach((key) => {
        result[key] = deepMerge(defaultObj[key], savedObj[key]);
      });
    }
    return result;
  }
  return savedObj !== undefined && savedObj !== null ? savedObj : defaultObj;
}

function upgradeSite(saved) {
  const site = deepMerge(defaultSite, saved || {});

  site.settings.phone = "+39 392 522 9478";
  site.settings.whatsapp = "393925229478";
  site.settings.instagram = "liciataurino.psicologa";
  site.settings.instagramUrl = "https://www.instagram.com/liciataurino.psicologa/";
  site.settings.whatsappMessage = site.settings.whatsappMessage || "Buongiorno Dott.ssa Taurino, vorrei ricevere informazioni per prenotare un primo colloquio.";
  site.settings.albo = "Iscrizione nr. 8233";

  site.hero.image = site.hero.image || "/img/licia-taurino.jpg";
  site.about.image = "/img/licia-taurino.jpg";
  site.about.name = site.about.name || "LICIA TAURINO";
  site.about.alboText = site.about.alboText || "Iscrizione nr. 8233";

  if (!Array.isArray(site.nav)) site.nav = defaultSite.nav;
  if (!site.nav.some(n => n.href === "#stimolazione")) {
    site.nav.splice(3, 0, { label: "Stimolazione cognitiva", href: "#stimolazione", visible: true });
  }
  site.nav = site.nav.map(n => ({ visible: true, ...n }));

  if (!Array.isArray(site.sectionOrder) || site.sectionOrder.length === 0) {
    site.sectionOrder = defaultSite.sectionOrder;
  }
  if (!site.sectionOrder.includes("cognitive")) {
    const index = site.sectionOrder.indexOf("bes");
    if (index >= 0) site.sectionOrder.splice(index + 1, 0, "cognitive");
    else site.sectionOrder.push("cognitive");
  }

  site.cognitive = deepMerge(defaultSite.cognitive, site.cognitive || {});
  site.styles = site.styles || {};
  return site;
}

async function initDb() {
  await pool.query(`CREATE TABLE IF NOT EXISTS site_content (
    id INTEGER PRIMARY KEY DEFAULT 1,
    data JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW()
  )`);
  const existing = await pool.query('SELECT id FROM site_content WHERE id = 1');
  if (existing.rowCount === 0) {
    await pool.query('INSERT INTO site_content (id, data) VALUES (1, $1)', [upgradeSite(defaultSite)]);
  }
}

async function getSite() {
  const result = await pool.query('SELECT data FROM site_content WHERE id = 1');
  return upgradeSite(result.rows[0]?.data || {});
}

async function saveSite(data) {
  await pool.query('UPDATE site_content SET data = $1, updated_at = NOW() WHERE id = 1', [upgradeSite(data)]);
}

module.exports = { pool, initDb, getSite, saveSite };
