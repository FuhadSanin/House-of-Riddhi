# 24Shoppers Web App

Clean ecommerce front-end built with:

- React + Vite
- Tailwind CSS v4
- shadcn-style UI primitives
- Firebase (Firestore contact capture)

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

## Firebase setup

Fill all variables in `.env`:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

Contact form writes to Firestore collection: `contactMessages`.

## Theme (shadcn-style)

Light and dark modes use CSS variables in `src/index.css` (same token model as shadcn: `--background`, `--foreground`, `--primary`, etc.). The active scheme is stored under `localStorage` key `24-shoppers-theme` (`light`, `dark`, or `system`). Default is **system**, which follows the OS preference.

A tiny script in `index.html` sets `class="dark"` on `<html>` before paint to reduce flash.

## Project structure

`src/components/ui` — shadcn-like UI components (`Button`, `Input`, `Textarea`)  
`src/components/theme-provider.jsx` — theme state + DOM class sync  
`src/components/mode-toggle.jsx` — sun/moon toggle  
`src/lib/firebase.js` — Firebase initialization  
`src/lib/contact.js` — Firestore write helper  
`src/App.jsx` — landing page sections
