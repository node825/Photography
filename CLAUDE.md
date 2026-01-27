# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A bilingual (Hebrew/English) kids photography website with gallery and booking system. Built as a full-stack application with separate client and server directories.

**Default Language**: Hebrew (RTL)
**Photographer**: Racheli Ostrov (רחלי אוסטרוב)
**Contact**: photographer-info.json contains all business information including phone, email, and photography categories

## Development Commands

### Full Stack Development

```powershell
# Start both servers (Windows PowerShell)
.\start-dev.ps1
```

This launches both backend (http://localhost:5000) and frontend (http://localhost:3000) in separate terminals.

### Frontend (client/)

```bash
cd client
npm run dev      # Start Vite dev server on port 3000
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint
```

### Backend (server/)

```bash
cd server
npm run dev      # Start with nodemon (auto-reload)
npm start        # Start production server
```

## Architecture

### Monorepo Structure

- `client/` - React SPA with Vite
- `server/` - Express REST API
- `photographer-info.json` - Central business configuration (name, contact, categories)

### Frontend (client/)

**Tech Stack**: React 19, Vite, Tailwind CSS 4, Framer Motion, react-i18next

**Key Directories**:
- `src/components/` - Reusable UI components (Gallery, Hero, Navbar, Contact, Footer, FloatingSquares, GlobalMouseEffect, GoldenGlitter)
- `src/pages/` - Page components (currently just Home.jsx)
- `src/i18n/` - i18next configuration and translations
  - `locales/en/` - English translations
  - `locales/he/` - Hebrew translations (default)
- `src/utils/api.js` - Axios instance and API client functions

**Routing**: Currently single-page (Home), but React Router is installed for future expansion

**Proxy**: Vite proxies `/api/*` requests to `http://localhost:5000` during development (see vite.config.js:8-12)

**Environment Variables**: See `client/.env.example`
- `VITE_API_URL` - Backend API URL
- `VITE_EMAILJS_*` - EmailJS credentials for contact form

### Backend (server/)

**Tech Stack**: Node.js (CommonJS), Express 5, MongoDB with Mongoose

**Structure**:
- `server.js` - Entry point, middleware registration, route mounting
- `config/db.js` - Mongxxxxxxxxxction (gracefully skips if MONGODB_URI not set)
- `models/` - Mongoose schemas (Booking.js)
- `controllers/` - Business logic (bookingController.js)
- `routes/` - Express route handlers (bookings.js)
- `middleware/` - Error handling (errorHandler.js)

**API Endpoints**:
- `GET /api/health` - Server health check
- `GET /api/bookings` - Get all bookings (sorted by creation date, newest first)
- `POST /api/bookings` - Create new booking with validation
- `GET /api/bookings/:id` - Get booking by MongoDB ID
- `GET /api/bookings/available-dates` - Get dates with non-cancelled bookings

**Booking Validation**:
- Cannot book dates in the past
- Unique constraint prevents duplicate bookings (same email + date combination)
- Session types: 'newborn', 'toddler', 'kids', 'family'
- Booking statuses: 'pending', 'confirmed', 'cancelled'

**Error Handling**:
- Centralized error middleware in `middleware/errorHandler.js`
- All errors return consistent JSON format: `{ success: false, message: "..." }`
- Status codes follow REST conventions (201 created, 400 validation, 404 not found, 500 server error)

**Environment Variables**: See `server/.env.example`
- `MONGODB_URI` - MongoDB connection string (optional in dev mode)
- `PORT` - Server port (default 5000)
- `NODE_ENV` - Environment mode (development/production)

**Database**: MongoDB connection is optional during development. Server will start and handle requests without it if MONGODB_URI is not set or invalid. This allows development without a running database.

### Bilingual System

The app uses react-i18next for Hebrew/English switching:

1. **Default Language**: Hebrew (RTL)
2. **Fallback**: English (LTR)
3. **Direction Switching**: App.jsx sets `document.documentElement.dir` based on language
4. **Translation Files**: `client/src/i18n/locales/{en,he}/translation.json`
5. **Configuration**: `client/src/i18n/i18n.js`

When adding text:
- Always add to both Hebrew and English translation files
- Use `useTranslation()` hook in components
- Reference keys with `t('key.path')`

### Booking Model

The Booking schema (server/models/Booking.js) includes:
- Client information (name, phone, email)
- Session type: 'newborn', 'toddler', 'kids', 'family'
- Preferred date
- Status: 'pending', 'confirmed', 'cancelled'
- Unique constraint on email + preferredDate to prevent duplicate bookings

## Key Files to Know

- `photographer-info.json` - Business data source (name, contact, categories). Update here instead of hardcoding.
- `client/src/utils/api.js` - All API calls. Import `bookingAPI` object for booking operations.
- `server/config/db.js` - Database connection logic (skips gracefully if not configured).
- `client/src/i18n/locales/` - All user-facing text should be here, not hardcoded.

## Common Patterns

### Adding a New Component

1. Create in `client/src/components/ComponentName.jsx`
2. Import and use in pages or other components
3. Add any new translatable text to both `en/translation.json` and `he/translation.json`

### Adding a New API Endpoint

1. Define route in `server/routes/` (or add to existing route file)
2. Implement controller function in `server/controllers/`
3. Add corresponding API call function in `client/src/utils/api.js`
4. Update Mongoose model in `server/models/` if database changes needed

### Styling

- Uses Tailwind CSS 4 with custom configuration in `client/tailwind.config.js`
- PostCSS configured in `client/postcss.config.cjs`
- Global styles in `client/src/index.css`
- Framer Motion for animations

## Server Development Patterns

### Adding API Endpoints

1. **Create/update route** in `server/routes/` file
   - Use descriptive route names following RESTful conventions
   - Example: `GET /bookings` (list), `POST /bookings` (create), `GET /bookings/:id` (retrieve)

2. **Implement controller function** in `server/controllers/bookingController.js`
   - Always wrap in try-catch, pass errors to `next(error)`
   - Validate inputs early (dates, required fields)
   - Return consistent response format with appropriate status codes

3. **Update Mongoose model** in `server/models/Booking.js` if schema changes
   - Use schema validation for data integrity
   - Define enums for restricted fields (status, sessionType)
   - Set up unique indexes to prevent duplicates

4. **Add API client function** in `client/src/utils/api.js`
   - Use Axios instance from same file
   - Export as part of `bookingAPI` object
   - Handle errors and return responses

5. **Register routes** in `server.js` if creating new route file
   - Mount at appropriate path: `app.use('/api/new', require('./routes/new.js'))`

### Database Patterns

- Mongoose schema validation catches type and format errors
- Use `required: true` for mandatory fields
- Define `enum` arrays for restricted values
- Unique indexes prevent duplicates at database level
- Pre-save hooks can normalize data (e.g., lowercase email)

### Error Responses

Controllers should use `next(error)` to pass errors to the error handler middleware. The error object can include:
```javascript
const error = new Error('Validation failed');
error.statusCode = 400;
next(error);
```

Or throw naturally, and the error handler will respond with 500.

### Testing the Server

Test routes with curl, Postman, or the frontend:
```bash
# Health check
curl http://localhost:5000/api/health

# Get all bookings
curl http://localhost:5000/api/bookings

# Create booking (requires JSON body)
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"clientName":"...","phone":"...","email":"...","sessionType":"kids","preferredDate":"2025-12-25"}'
```

See `server/.claude/CLAUDE.md` for detailed server development guide (loaded automatically when working in server directory).
