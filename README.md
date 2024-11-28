# Kasse POS - Point of Sale Application

## Technologie-Stack
- React mit TypeScript
- Supabase (Datenbank & Authentifizierung)
- Tailwind CSS
- Redux Toolkit
- Netlify Hosting

## Funktionen
- Artikel-Management
- Echtzeit-Warenkorb
- Verkaufsabwicklung
- Kategorisierung von Artikeln
- Verkaufsanalyse

## Voraussetzungen
- Node.js 18+
- npm

## Lokale Entwicklung

### Installation
```bash
git clone https://github.com/flohe88/kasse-pos.git
cd kasse-pos
npm install
```

### Umgebungsvariablen
Erstellen Sie eine `.env`-Datei mit:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Entwicklungsserver starten
```bash
npm run dev
```

## Deployment
Automatisches Deployment über GitHub Actions zu Netlify

## Deployment Status

[![Netlify Status](https://api.netlify.com/api/v1/badges/58da5a58-af85-4391-a5f2-d5fa6bb523d9/deploy-status)](https://app.netlify.com/sites/kasse-pos/deploys)

This project is automatically deployed via Netlify and GitHub Actions.

## Lizenz
MIT License
