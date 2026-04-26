# Psicologa Taurino Licia - Sito + Admin

Sito moderno con pannello admin per modificare testi, sezioni, colori, font, dimensioni e allineamenti.

## Avvio locale
```bash
npm install
cp .env.example .env
npm start
```

Apri:
- Sito: http://localhost:3000
- Admin: http://localhost:3000/admin

Credenziali iniziali da `.env`:
- utente: `admin`
- password: `admin123`

## Render
1. Crea un nuovo repository GitHub e carica questi file.
2. Su Render fai **New > Blueprint** se usi `render.yaml`, oppure **New > Web Service**.
3. Imposta:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Aggiungi variabili ambiente:
   - `DATABASE_URL`
   - `SESSION_SECRET`
   - `ADMIN_USER`
   - `ADMIN_PASSWORD`

## Nota immagini
Il progetto include upload immagini locale in `/public/uploads`. Su Render free i file caricati possono sparire a ogni deploy/restart. Per produzione conviene Cloudinary.
