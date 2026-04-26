const { Pool } = require('pg');
const { defaultSite } = require('./data');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function initDb() {
  await pool.query(`CREATE TABLE IF NOT EXISTS site_content (
    id INTEGER PRIMARY KEY DEFAULT 1,
    data JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW()
  )`);
  const existing = await pool.query('SELECT id FROM site_content WHERE id = 1');
  if (existing.rowCount === 0) {
    await pool.query('INSERT INTO site_content (id, data) VALUES (1, $1)', [defaultSite]);
  }
}

async function getSite() {
  const result = await pool.query('SELECT data FROM site_content WHERE id = 1');
  return result.rows[0]?.data || defaultSite;
}

async function saveSite(data) {
  await pool.query('UPDATE site_content SET data = $1, updated_at = NOW() WHERE id = 1', [data]);
}

module.exports = { pool, initDb, getSite, saveSite };
