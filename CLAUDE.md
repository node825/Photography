# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack bilingual (Hebrew RTL / English LTR) photography portfolio and booking website for kids and family photographer Racheli Ostrov.

## Code Language Policy

**CRITICAL:** All code must be written in English only.

- **Variable names**: English only (e.g., `userName`, not `שםמשתמש`)
- **Function names**: English only (e.g., `handleSubmit`, not `טפלבשליחה`)
- **Comments**: English only
- **Class names**: English only
- **File names**: English only (except existing asset folders which use Hebrew names)

**Exception:** User-facing text in translation files (`locales/he/translation.json` and `locales/en/translation.json`) contains Hebrew and English respectively.

**Note:** Chat communication with Claude Code can be in Hebrew, but all generated code, comments, and identifiers must be in English.

## Development Commands

### Starting Development Servers

**Quick start (both servers):**
```powershell
.\start-dev.ps1
```
This launches both frontend (port 3000) and backend (port 5000) in separate PowerShell windows.

**Manual start:**
```bash
# Backend
cd server && npm run dev

# Frontend (in separate terminal)
cd client && npm run dev
```

### Other Commands

```bash
# Frontend
cd client
npm run build    # Production build
npm run lint     # ESLint check
npm run preview  # Preview production build

# Backend
cd server
npm start        # Production mode (no auto-reload)
```

## Architecture

### Client-Server Split

- **Client**: React 19 + Vite (ESM modules, port 3000)
- **Server**: Express + MongoDB (CommonJS modules, port 5000)
- **API Proxy**: Vite proxies `/api/*` requests to backend (see [client/vite.config.js](client/vite.config.js:8-13))

### Module Systems

**IMPORTANT:** The client and server use different module systems:
- Client uses **ES modules** (`import`/`export`, `type: "module"`)
- Server uses **CommonJS** (`require`/`module.exports`, `type: "commonjs"`)

Do not mix module syntax between client and server code.

### Bilingual i18n Architecture

The app supports Hebrew (default) and English with automatic RTL/LTR switching.

**Key implementation details:**
- **i18n setup**: [client/src/i18n/i18n.js](client/src/i18n/i18n.js) configures react-i18next
- **Translations**: JSON files in `client/src/i18n/locales/{he,en}/translation.json`
- **RTL switching**: [client/src/App.jsx](client/src/App.jsx:11) sets `document.documentElement.dir` based on language
- **Default language**: Hebrew (`lng: 'he'`)
- **Usage in components**: `const { t, i18n } = useTranslation()`

When adding translatable text:
1. Add keys to both `locales/he/translation.json` and `locales/en/translation.json`
2. Use `t('key')` in components, never hardcode text
3. Test both RTL (Hebrew) and LTR (English) layouts

### Gallery Image Organization

Images are organized in Hebrew-named folders under `client/src/assets/gallery/`:
- `גיל שנה/` (Year-old)
- `חאלקה/` (Chalka/Family ceremonies)
- `חוץ/` (Outdoor)
- `מוצרים/` (Products)
- `סטודיו/` (Studio)

**Gallery implementation:** [client/src/components/Gallery.jsx](client/src/components/Gallery.jsx)
- Images are hardcoded in `galleryData` object (lines 10-61)
- When adding new images, update the relevant category array
- Use Vite's `/src/assets/` path format

### MongoDB Booking System

**Schema:** [server/models/Booking.js](server/models/Booking.js)

Key constraints:
- **Unique index**: `{ email: 1, preferredDate: 1 }` prevents duplicate bookings for same email on same date
- **Session types**: `['newborn', 'toddler', 'kids', 'family']` (enum validation)
- **Statuses**: `['pending', 'confirmed', 'cancelled']` (default: 'pending')

**API Endpoints:** Defined in [server/routes/bookings.js](server/routes/bookings.js)
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - List all bookings
- `GET /api/bookings/:id` - Get specific booking
- `GET /api/bookings/available-dates` - Get available dates

### Environment Configuration

Backend requires `.env` file in `server/` directory:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
```

Template available in [server/.env.example](server/.env.example). The server can run without MongoDB (graceful degradation) but booking functionality requires a valid connection.

### Photographer Contact Information

Centralized in [photographer-info.json](photographer-info.json):
- Name (Hebrew/English)
- Phone: 053-419-9158
- Email: r4199158@gmail.com
- WhatsApp link
- Session type categories

When updating contact info or categories, modify this file rather than hardcoding values in components.

## Technology Stack

**Frontend:**
- React 19 with Vite
- Tailwind CSS 4 (PostCSS plugin)
- Framer Motion (animations)
- react-i18next (bilingual support)
- React Big Calendar (booking UI)
- EmailJS (contact form emails)

**Backend:**
- Express 5
- MongoDB with Mongoose
- CORS enabled for cross-origin requests

## Common Patterns

### Adding a New Component

1. Create in `client/src/components/ComponentName.jsx`
2. Use Framer Motion for animations (follow existing patterns)
3. Import and use `useTranslation()` for text
4. Add translation keys to both locale files
5. Follow Tailwind CSS conventions (utility classes)

### Adding a New API Endpoint

1. Define route in `server/routes/` or extend existing routes
2. Create controller function in `server/controllers/`
3. Use async/await with proper error handling
4. Return consistent JSON responses
5. Frontend will access via `/api/endpoint` (Vite proxy handles routing)

### Working with Images

- Place images in appropriate `client/src/assets/gallery/{category}/` folder
- Use Vite asset path format: `/src/assets/gallery/...`
- Update `galleryData` object in [Gallery.jsx](client/src/components/Gallery.jsx)
- Hebrew folder names are intentional (keep them)
