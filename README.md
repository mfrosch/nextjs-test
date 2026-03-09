# Next.js ISR Test App für Netcup/Plesk

Minimale Next.js 14 App zum Testen von Incremental Static Regeneration (ISR) auf Netcup Shared Hosting (Plesk).

## Lokaler Build

```bash
npm install
npm run build
PORT=3000 npm start
```

## Seiten

| Route | Typ | Revalidate | Beschreibung |
|---|---|---|---|
| `/` | Static | - | Build-Zeitstempel, Node-Version, Filesystem-Test |
| `/produkte` | ISR | 60s | Produktliste (20 Produkte) |
| `/produkte/[slug]` | ISR | 120s | Produktdetail, Pre-rendered vs On-demand |
| `/api/revalidate` | API | - | Manuelle Revalidierung |

## Revalidate API

```
GET /api/revalidate?secret=test123&path=/produkte
```

Antwort: `{ "revalidated": true, "path": "/produkte", "timestamp": "..." }`

## Plesk Setup

1. Node.js App in Plesk anlegen
2. Document Root auf das Projektverzeichnis setzen
3. Application Startup File: `node_modules/.bin/next` (oder custom `server.js`)
4. Plesk setzt `PORT` automatisch als Environment-Variable
5. Environment-Variablen setzen:
   - `NODE_ENV=production`
   - `REVALIDATE_SECRET=<sicheres-secret>`

## ISR Testanleitung

1. **Build:** `npm run build` — prüfen ob alle Routen korrekt gebaut werden
2. **Startseite:** `/` — Build-Zeitstempel und Filesystem-Test prüfen
3. **Produktliste:** `/produkte` — Render-Zeitstempel notieren, nach 60s neu laden → neuer Zeitstempel
4. **Produktdetail:**
   - `/produkte/ergonomischer-buerostuhl` → "Pre-rendered (Build-Zeit)"
   - `/produkte/usb-hub-7-port` → "On-demand (Runtime)"
5. **Revalidate:** `/api/revalidate?secret=test123&path=/produkte` aufrufen → Produktliste sofort neu rendern
