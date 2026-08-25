# AGENTS.md

## Project Overview

This repository contains a bilingual Hebrew/English photography portfolio and booking application:

- `client/`: React 19 + Vite 7 frontend using ES modules.
- `server/`: Express 5 + Mongoose backend using CommonJS.
- Hebrew is the default UI language and uses RTL; English uses LTR.

## Commands

Install dependencies separately because there is no root `package.json`:

```powershell
cd client
npm install

cd ..\server
npm install
```

Run both development servers:

```powershell
.\start-dev.ps1
```

The script opens Vite on port 3000 and Express on port 5000 in separate PowerShell windows. It contains an absolute repository path, so use manual startup when working from another checkout:

```powershell
# Terminal 1
cd server
npm run dev

# Terminal 2
cd client
npm run dev
```

Frontend validation:

```powershell
cd client
npm run lint
npm run build
```

Lint one file:

```powershell
cd client
npx eslint src\components\Booking.jsx
```

There is no configured project test runner or test suite. The server's `npm test` command is a placeholder that exits with an error, so no valid full-suite or single-test command currently exists.

To smoke-test a running backend:

```powershell
curl http://localhost:5000/api/health
```

## Architecture

### Frontend

`client/src/main.jsx` mounts `App`. `client/src/App.jsx` initializes i18next, updates the root document direction when the language changes, and renders `client/src/pages/Home.jsx`. The application is currently one composed page; React Router is installed but is not wired.

`Home` orders the navbar, hero, gallery, booking, contact, footer, and global visual effects. Components use hooks, Tailwind utilities, Framer Motion, and `useTranslation()`.

User-facing copy lives in both locale files:

- `client/src/i18n/locales/he/translation.json`
- `client/src/i18n/locales/en/translation.json`

The two forms use different integrations:

- `client/src/components/Booking.jsx` calls the Express API through `bookingAPI` in `client/src/utils/api.js`.
- `client/src/components/Contact.jsx` sends directly through EmailJS and requires the three `VITE_EMAILJS_*` variables.

The API client uses `VITE_API_URL` when provided and otherwise defaults to `http://localhost:5000/api`. Vite proxies relative `/api` calls to port 5000.

### Backend

`server/server.js` loads environment variables, attempts a MongoDB connection, installs middleware, mounts `/api/bookings`, exposes `/api/health`, and registers the shared error handler. The process can start without `MONGODB_URI`, but booking operations require a working database.

Booking requests follow:

1. `server/routes/bookings.js`
2. `server/controllers/bookingController.js`
3. `server/models/Booking.js`

Controllers return `{ success, data }` for successful entity responses, add `count` to list responses, and use `message` for errors. The model defines session/status enums and a unique `{ email, preferredDate }` index.

Keep `/available-dates` before `/:id` in the booking router so Express does not interpret `available-dates` as an ID.

## Repository Conventions

- Write code, identifiers, comments, class names, and new file names in English. Non-English text belongs in locale files; existing Hebrew gallery directory names are intentional.
- Never hardcode new user-facing text in JSX. Add matching keys to both locale files and verify Hebrew RTL and English LTR behavior.
- Use `import`/`export` in `client/` and `require`/`module.exports` in `server/`; do not mix module systems.
- Put reusable UI sections in `client/src/components/`. Keep page composition in `client/src/pages/Home.jsx`.
- Follow the existing functional-component, hook, Tailwind, and Framer Motion patterns.
- Gallery assets belong under `client/src/assets/gallery/<Hebrew category>/`. Update the hardcoded `galleryData` mapping in `client/src/components/Gallery.jsx` and use Vite `/src/assets/...` URLs.
- Treat `photographer-info.json` as canonical photographer/contact/category metadata. Current UI, translations, and booking schema duplicate some category values, so synchronize all affected surfaces when categories change.
- Client-exposed environment variables require the `VITE_` prefix. Use `client/.env.example` and `server/.env.example` as configuration contracts and never commit real credentials.
- When changing or adding a component, API endpoint, hook, utility, or feature, update documentation under `doc/`: components in `doc/react/<ComponentName>/README.md`, APIs in `doc/api/<routeName>.md`, and other features in `doc/features/<featureName>.md`.
