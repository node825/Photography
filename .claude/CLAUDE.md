# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kids Photography Website - a modern, bilingual (Hebrew/English) website with photo gallery and booking system. The site features an interactive booking calendar, RTL/LTR language support, and smooth animations.

## Development Commands

### Client (React + Vite)
```bash
cd client
npm run dev        # Start development server (port 3000)
npm run build      # Build for production
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

### Server (Node.js + Express)
```bash
cd server
npm run dev        # Start with nodemon (auto-reload on file changes)
npm start          # Start production server
npm test           # No tests configured yet
```

### Running Both (from project root)
Use `start-dev.ps1` PowerShell script to run both servers concurrently.

## Architecture Overview

### Frontend Architecture (client/)

**Tech Stack:** React 19, Vite, Tailwind CSS v4, Framer Motion, i18next, React Router

**Key Directories:**
- `src/components/` - Reusable UI components (Navbar, Gallery, Contact, Footer, Hero, etc.)
- `src/pages/` - Page components (currently just Home.jsx)
- `src/i18n/` - Internationalization setup with Hebrew and English locales
- `src/utils/` - Utility functions
- `src/assets/` - Static images and assets

**Bilingual Support:**
- Powered by i18next with locale files in `src/i18n/locales/{en,he}/translation.json`
- Default language is Hebrew (RTL)
- App automatically sets document direction based on language (`dir="rtl"` or `ltr"`)
- Component `GlobalMouseEffect.jsx` and `FloatingSquares.jsx` provide visual effects
- Contact form uses EmailJS for sending booking inquiries

**API Integration:**
- Vite proxy configured to forward `/api/*` requests to `http://localhost:5000` during development
- Main API endpoint: `/api/bookings` for booking-related operations

### Backend Architecture (server/)

**Tech Stack:** Node.js, Express 5.x, MongoDB/Mongoose, CORS middleware

**Structure:**
- `server.js` - Main application entry point, Express app setup, CORS and middleware configuration
- `config/db.js` - MongoDB connection utility (gracefully handles missing MONGODB_URI for development)
- `models/Booking.js` - Mongoose schema for bookings with validation
- `controllers/bookingController.js` - Business logic for booking operations
- `routes/bookings.js` - Express routes for booking endpoints
- `middleware/errorHandler.js` - Global error handling middleware

**API Endpoints:**
- `GET/POST /api/bookings` - List all bookings or create new booking
- `GET /api/bookings/available-dates` - Get available booking dates
- `GET /api/bookings/:id` - Get specific booking details
- `GET /api/health` - Health check endpoint

**Database:**
- Booking model includes: clientName, phone, email, sessionType (newborn/toddler/kids/family), preferredDate, notes, status (pending/confirmed/cancelled)
- Unique index on (email, preferredDate) to prevent duplicate bookings on same date

## Environment Configuration

### Server (.env file required)
```
MONGODB_URI=your_mongodb_connection_string_here
PORT=5000
NODE_ENV=development
```

- **MONGODB_URI** is optional in development mode; server will run without DB if not set or invalid
- Default PORT is 5000
- Example: `mongodb+srv://user:password@cluster.mongodb.net/database-name`

## Key Architectural Decisions

1. **Separation of Concerns:** Frontend and backend are completely separate, communicating only via REST API. This allows independent scaling and deployment.

2. **Bilingual from Ground Up:** i18next is configured at app initialization (App.jsx) to ensure proper RTL/LTR handling across the entire app, not added as an afterthought.

3. **Optional MongoDB:** Backend can run without MongoDB connection for frontend development purposes. DB connection errors are warnings, not fatal.

4. **Validation at Model Level:** Mongoose schema validation enforces data integrity (required fields, email format, enum values for sessionType and status).

5. **Error Handler Middleware:** Centralized error handling in middleware for consistent API error responses.

## Common Development Tasks

- **Starting full-stack development:** Run `start-dev.ps1` from project root to start both servers
- **Modifying booking logic:** Update either `models/Booking.js` (schema), `controllers/bookingController.js` (logic), or `routes/bookings.js` (endpoints)
- **Adding new language strings:** Add entries to both `src/i18n/locales/en/translation.json` and `src/i18n/locales/he/translation.json`
- **Adjusting booking form:** Main Contact form is in `src/components/Contact.jsx`
- **Gallery component:** `src/components/Gallery.jsx` displays photo categories
- **Testing API endpoints:** Use `GET /api/health` to verify server is running before testing booking endpoints

## Frontend Pages & Component Hierarchy

The app currently has a single-page structure with Home.jsx containing:
- Navbar (language switcher, navigation)
- Hero section (introduction)
- Gallery (photo categories)
- Contact section (booking form)
- FloatingSquares & GoldenGlitter (decorative effects)
- Footer

## Performance & Styling

- **Tailwind CSS v4** with PostCSS for styling
- **Framer Motion** for smooth animations and transitions
- **Lucide React** icons throughout UI
- Large build artifacts are expected (React + libraries); use `npm run build` to optimize

## Code Standards - Critical Requirements

**Language:**
- All code, comments, variable names, function names, and documentation MUST be in English only
- No Hebrew text allowed in any code files, comments, or commit messages
- No emojis in code, commits, or pull requests

**Documentation:**
- Internal documentation and inline comments must be in English
- All git commit messages must be in English

## Database Notes

- No migrations framework set up; schema changes are made directly to Booking.js model
- Development can proceed without MongoDB by simply not setting MONGODB_URI
- Production deployment should always have valid MONGODB_URI set
