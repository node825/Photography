# Copilot Instructions - Kids Photography Website

## Instruction Files in This Project

This repository uses a three-tier instruction system for AI agents:

1. **[copilot-instructions.md](.github/copilot-instructions.md)** (this file)
   - High-level project overview, architecture, and critical conventions
   - Starting point for understanding the project structure
   - Applies globally to all code changes

2. **[client.instructions.md](.github/instructions/client.instructions.md)**
   - Frontend-specific rules and patterns
   - Applies to: `client/**/*.jsx`, `client/**/*.js`, `client/**/*.css`, `client/**/*.json`
   - Details on React components, i18n, styling, EmailJS, API integration

3. **[reactjs.instructions.md](.github/instructions/reactjs.instructions.md)**
   - General ReactJS best practices and development standards
   - Applies to: `**/*.jsx`, `**/*.tsx`, `**/*.js`, `**/*.ts`, `**/*.css`, `**/*.scss`
   - Covers hooks, state management, testing, accessibility, security, performance

**How they work together**: Client-specific rules override ReactJS general standards. All instruction files must be followed for consistency.

## Skills

Skills are reusable agent capabilities located in `.github/skills/`. Each skill has a `SKILL.md` with frontmatter describing when to use it.

| Skill | Description | Trigger Keywords |
|-------|-------------|------------------|
| **[make-skill-template](.github/skills/make-skill-template/SKILL.md)** | Create new Agent Skills for GitHub Copilot. Generates SKILL.md files with proper frontmatter, directory structure, and optional bundled resources. | "create a skill", "make a new skill", "scaffold a skill" |
| **[react-component](.github/skills/react-component/SKILL.md)** | Create React components with Framer Motion animations, i18n translations, Tailwind styling, and proper project conventions. | "create a component", "add a new section", "build a React component", "scaffold a component" |
| **[documentation-writer](.github/skills/documentation-writer/SKILL.md)** | Create unified documentation for APIs, React components, server models, and features with consistent templates and structure. | "write documentation", "create docs", "document an API", "document a component", "document this" |

To create a new skill, use the `make-skill-template` skill or manually create a folder in `.github/skills/<skill-name>/` with a `SKILL.md` file.

## Critical Rules
- **NO Hebrew text in code** - All code, comments, variable names must be in English. Hebrew is only allowed in `locales/he/translation.json`
- **NO emojis in files** - Do not use emojis anywhere in the codebase
- **Add component to Home.jsx** - New sections must be imported and rendered in [client/src/pages/Home.jsx](client/src/pages/Home.jsx#L1)
- **Documentation required** - Create documentation for every new API endpoint, component, and feature added to the system. Store documentation in `doc/` folder organized by type (e.g., `doc/api/`, `doc/components/`, `doc/features/`)

## Project Overview
Bilingual (Hebrew RTL / English LTR) kids photography portfolio & booking website. Photographer: Racheli Ostrov (r4199158@gmail.com, 053-419-9158).

## Architecture Overview

### Monorepo Stack
- **Frontend**: React 19 + Vite (port 3000) - Single-page app with section anchors
- **Backend**: Express 5 + MongoDB (port 5000) - RESTful API, optional DB connection
- **Config**: [photographer-info.json](photographer-info.json) - Centralized photographer/contact data

### Data Flow Architecture
1. **Contact Form** → EmailJS client-side API (no backend) → Direct email notification
2. **Booking Form** → `POST /api/bookings` → MongoDB Booking model → Pending status
3. **Gallery** → Static images in `client/src/assets/gallery/{Hebrew folder}` → Filtered by sessionType

### Component Hierarchy
```
Home.jsx (single entry point)
├── Navbar (sticky, language toggle)
├── Hero (anchor: #home)
├── Gallery (anchor: #gallery, filters by sessionType)
├── Booking (anchor: #booking, form submission)
├── Contact (anchor: #contact, EmailJS)
├── Footer
└── Effects (GlobalMouseEffect, FloatingSquares, GoldenGlitter)
```

## Start Development
```powershell
# Fastest: concurrent servers with HMR
.\start-dev.ps1

# Or separately:
cd server; npm run dev    # Nodemon watches server.js
cd client; npm run dev    # Vite dev server with HMR
```

## Critical Conventions

### i18n / Bilingual
- **Default language**: Hebrew (`lng: 'he'` in [i18n.js](client/src/i18n/i18n.js#L14))
- **All UI text** → `client/src/i18n/locales/{en,he}/translation.json` (dot notation keys)
- **Component usage**: `const { t } = useTranslation()` → `t('section.key')`
- **RTL/LTR automatic**: i18n sets `document.documentElement.dir` automatically

### Styling (Tailwind v4)
- **Theme**: [tailwind.config.js](client/tailwind.config.js) - Custom colors, fonts
- **Color scheme**: Gold-on-dark (`primary: #D4AF37`, accent: `#DAA520`, bg: `#0F0F0F`)
- **Semantic colors** (use these, not raw hex):
  - `text-primary` / `text-gold` - Headings
  - `text-textLight` - Main text
  - `text-textDark` - Secondary text
  - `bg-background` - Dark background
- **Typography**: Inter/Heebo (body), Montserrat/Rubik (headings)

### React Component Patterns
- **Animations**: Framer Motion on all sections (`motion.div`, `whileInView`, `exit` transitions)
- **Example from [Gallery.jsx](client/src/components/Gallery.jsx)**:
  ```jsx
  <motion.div whileInView={{opacity: 1}} viewport={{once: true}} initial={{opacity: 0}}>
  ```
- **Validation**: Form fields validate before submission, show errors inline
- **Loading states**: Disable buttons during API calls, show "Sending..." text

## API & Backend

### Routes & Models
- `POST /api/bookings` - Create new booking → Sends `clientName`, `phone`, `email`, `sessionType`, `preferredDate`, `notes`
- `GET /api/bookings` / `GET /api/bookings/:id` - List/fetch
- `GET /api/health` - Server status check

### Booking Model (MongoDB)
- `clientName` (required) | `phone` (required) | `email` (required, unique with date)
- `sessionType` (enum: newborn/toddler/kids/family) | `preferredDate` (required)
- `notes` (optional) | `status` (pending/confirmed/cancelled, default: pending)
- **Duplicate prevention**: Unique index on (email, preferredDate)

### MongoDB Connection
- **Optional for development**: Server continues without DB if `MONGODB_URI` missing or invalid
- Set valid URI in `server/.env` to enable bookings persistence
- [db.js](server/config/db.js#L1) validates connection string before connecting

## Environment Variables

**Client** ([client/.env](client/.env)):
```
VITE_API_URL=http://localhost:5000/api
VITE_EMAILJS_SERVICE_ID=<your-service-id>
VITE_EMAILJS_TEMPLATE_ID=<your-template-id>
VITE_EMAILJS_PUBLIC_KEY=<your-public-key>
```

**Server** ([server/.env](server/.env)):
```
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/photography
```

## Gallery Images
Location: `client/src/assets/gallery/{Hebrew folder}/`
- `גיל שנה/` - First birthday
- `חאלקה/` - Upsherin (haircut ceremony)
- `חוץ/` - Outdoor
- `מוצרים/` - Products
- `סטודיו/` - Studio

To add: Update [galleryData](client/src/components/Gallery.jsx) array with image paths + metadata.

## Key Dependencies
- **Framer Motion** - Animations, scroll detection
- **react-i18next** - Bilingual UI
- **EmailJS** - Contact form (client-side)
- **axios** - HTTP client for API calls
- **lucide-react** - Icons
- **date-fns** - Date formatting
- **react-big-calendar** - Booking calendar (if used)
