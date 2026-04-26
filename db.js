const { Pool } = require('pg');
const { defaultSite } = require('./data');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

function deepMerge(defaultObj, savedObj) {
  if (Array.isArray(defaultObj)) return Array.isArray(savedObj) ? savedObj : defaultObj;
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

function applyRequestedUpdates(site) {
  site.settings = site.settings || {};
  site.settings.phone = "+39 392 522 9478";
  site.settings.whatsapp = "393925229478";
  site.settings.instagram = "liciataurino.psicologa";
  site.settings.instagramUrl = "https://www.instagram.com/liciataurino.psicologa/";

  site.nav = site.nav || [];
  if (!site.nav.some(item => item.href === "#stimolazione")) {
    const besIndex = site.nav.findIndex(item => item.href === "#bes");
    const newItem = { label: "Stimolazione cognitiva", href: "#stimolazione" };
    if (besIndex >= 0) site.nav.splice(besIndex + 1, 0, newItem);
    else site.nav.push(newItem);
  }

  site.cognitive = site.cognitive || defaultSite.cognitive;
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
    await pool.query('INSERT INTO site_content (id, data) VALUES (1, $1)', [applyRequestedUpdates(defaultSite)]);
  }
}

async function getSite() {
  const result = await pool.query('SELECT data FROM site_content WHERE id = 1');
  const saved = result.rows[0]?.data || {};
  return applyRequestedUpdates(deepMerge(defaultSite, saved));
}

async function saveSite(data) {
  await pool.query('UPDATE site_content SET data = $1, updated_at = NOW() WHERE id = 1', [applyRequestedUpdates(data)]);
}

module.exports = { pool, initDb, getSite, saveSite };
