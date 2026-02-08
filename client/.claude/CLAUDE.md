# Client Structure Documentation

## Overview

React 19 + Vite frontend application for Racheli Ostrov Photography portfolio and booking website.
- **Module System**: ES Modules (`type: "module"`)
- **Build Tool**: Vite 7
- **Port**: 3000 (development)
- **API Proxy**: `/api/*` requests proxied to backend at `http://localhost:5000` ([vite.config.js:8-13](../vite.config.js#L8-L13))

## Directory Structure

```
client/
├── .claude/              # Claude Code configuration
├── dist/                 # Production build output
├── node_modules/         # Dependencies
├── public/               # Static assets (served as-is)
├── src/                  # Source code
│   ├── assets/           # Images and media files
│   │   └── gallery/      # Gallery images (Hebrew-named folders)
│   │       ├── גיל שנה/   # Year-old photos
│   │       ├── חאלקה/     # Chalka/Family ceremonies
│   │       ├── חוץ/       # Outdoor photos
│   │       ├── מוצרים/    # Products
│   │       └── סטודיו/    # Studio photos
│   ├── components/       # Reusable React components
│   ├── i18n/             # Internationalization
│   │   ├── locales/      # Translation files
│   │   │   ├── en/       # English translations
│   │   │   └── he/       # Hebrew translations
│   │   └── i18n.js       # i18n configuration
│   ├── pages/            # Page-level components
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Root component with routing
│   ├── App.css           # Root component styles
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles (Tailwind directives)
├── .env                  # Environment variables
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── eslint.config.js      # ESLint configuration
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── postcss.config.cjs    # PostCSS configuration (Tailwind)
├── tailwind.config.js    # Tailwind CSS configuration
└── vite.config.js        # Vite build configuration
```

## Key Files

### Entry Points

- **[index.html](../index.html)**: HTML template, includes root div and script tag for [main.jsx](../src/main.jsx)
- **[src/main.jsx](../src/main.jsx)**: Application entry point, renders `<App />` and imports global styles
- **[src/App.jsx](../src/App.jsx)**: Root component, handles:
  - React Router setup
  - Language change effect (sets `document.documentElement.dir` for RTL/LTR)
  - Route definitions

### Configuration Files

- **[vite.config.js](../vite.config.js)**: Vite configuration
  - Dev server on port 3000
  - API proxy: `/api/*` → `http://localhost:5000`
  - React plugin enabled

- **[tailwind.config.js](../tailwind.config.js)**: Tailwind CSS configuration
  - Content paths for class detection
  - Theme customization
  - Custom utilities

- **[postcss.config.cjs](../postcss.config.cjs)**: PostCSS configuration
  - `@tailwindcss/postcss` plugin
  - `autoprefixer` plugin

- **[eslint.config.js](../eslint.config.js)**: ESLint rules for code quality

- **[package.json](../package.json)**: Project metadata and dependencies
  - Scripts: `dev`, `build`, `lint`, `preview`
  - Module type: `"module"` (ES modules)

### Environment Variables

- **[.env](../.env)**: Local environment variables (not committed)
- **[.env.example](../.env.example)**: Template for environment variables
  - `VITE_EMAILJS_SERVICE_ID`
  - `VITE_EMAILJS_TEMPLATE_ID`
  - `VITE_EMAILJS_PUBLIC_KEY`

Note: Vite requires env variables to be prefixed with `VITE_` to be exposed to the client.

## Source Code Structure

### Components ([src/components/](../src/components/))

Reusable UI components following React 19 patterns with Framer Motion animations:

- **[Navbar.jsx](../src/components/Navbar.jsx)**: Navigation bar with language switcher
- **[Hero.jsx](../src/components/Hero.jsx)**: Homepage hero section with animated elements
- **[Gallery.jsx](../src/components/Gallery.jsx)**: Image gallery with category filtering
  - Hardcoded `galleryData` object (lines 10-61)
  - Images organized by Hebrew category folders
  - When adding images: update the relevant category array
- **[Contact.jsx](../src/components/Contact.jsx)**: Contact form with EmailJS integration
- **[Footer.jsx](../src/components/Footer.jsx)**: Page footer with contact info
- **[FloatingSquares.jsx](../src/components/FloatingSquares.jsx)**: Animated background element
- **[GoldenGlitter.jsx](../src/components/GoldenGlitter.jsx)**: Decorative animated particles
- **[GlobalMouseEffect.jsx](../src/components/GlobalMouseEffect.jsx)**: Mouse tracking effect
- **[Gallery.example.jsx](../src/components/Gallery.example.jsx)**: Example/template gallery component

### Pages ([src/pages/](../src/pages/))

Page-level components (routed in [App.jsx](../src/App.jsx)):

- **[Home.jsx](../src/pages/Home.jsx)**: Homepage layout

### Internationalization ([src/i18n/](../src/i18n/))

Bilingual support (Hebrew RTL / English LTR):

- **[i18n.js](../src/i18n/i18n.js)**: i18next configuration
  - Default language: Hebrew (`lng: 'he'`)
  - Fallback language: Hebrew
  - Loads translations from `locales/` folder

- **Translation Files**:
  - [locales/he/translation.json](../src/i18n/locales/he/translation.json): Hebrew translations
  - [locales/en/translation.json](../src/i18n/locales/en/translation.json): English translations

**Usage in components**:
```javascript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();
  return <h1>{t('key.path')}</h1>;
}
```

**RTL/LTR handling**: [App.jsx](../src/App.jsx) watches for language changes and updates `document.documentElement.dir` attribute.

### Utilities ([src/utils/](../src/utils/))

Helper functions:

- **[api.js](../src/utils/api.js)**: Axios instance configured for backend API calls
  - Base URL: `/api` (proxied by Vite to `http://localhost:5000`)
  - Error handling
  - Request/response interceptors

### Styles

- **[src/index.css](../src/index.css)**: Global styles
  - Tailwind CSS directives (`@import 'tailwindcss'`)
  - Custom global classes
  - CSS variables

- **[src/App.css](../src/App.css)**: Root component specific styles

### Assets ([src/assets/](../src/assets/))

Images and media files:

- **Gallery images**: Organized in Hebrew-named category folders
  - Use Vite asset path format: `/src/assets/gallery/...`
  - Example: `/src/assets/gallery/סטודיו/image.jpg`

**Note**: Hebrew folder names are intentional for photographer's content organization.

## Technology Stack

### Core Dependencies

- **react** ^19.2.0 - UI library
- **react-dom** ^19.2.0 - React DOM renderer
- **react-router-dom** ^7.9.6 - Client-side routing
- **framer-motion** ^12.23.24 - Animation library
- **i18next** ^25.6.2 - Internationalization framework
- **react-i18next** ^16.3.3 - React bindings for i18next
- **axios** ^1.13.2 - HTTP client
- **@emailjs/browser** ^4.4.1 - Email service integration
- **react-big-calendar** ^1.19.4 - Calendar component for booking
- **lucide-react** ^0.554.0 - Icon library
- **date-fns** ^4.1.0 - Date utilities

### Styling

- **Tailwind CSS** 4.1.17 - Utility-first CSS framework
- **@tailwindcss/postcss** ^4.1.17 - PostCSS plugin
- **autoprefixer** ^10.4.22 - CSS vendor prefixing

### Build Tools

- **Vite** ^7.2.2 - Build tool and dev server
- **@vitejs/plugin-react** ^5.1.0 - React integration for Vite
- **ESLint** ^9.39.1 - Code linting

## Development Workflow

### Starting Development Server

```bash
# From project root
.\start-dev.ps1

# Or manually from client directory
cd client
npm run dev
```

Runs on `http://localhost:3000` with hot module replacement (HMR).

### Available Scripts

```bash
npm run dev      # Start development server (Vite)
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build locally
```

### Build Output

Production build creates optimized files in `dist/` directory:
- Minified JavaScript bundles
- Optimized CSS
- Processed assets
- HTML with injected bundle references

## Common Patterns

### Adding a New Component

1. Create file in `src/components/ComponentName.jsx`
2. Use ES module exports: `export default ComponentName`
3. Import `useTranslation` for text: `const { t } = useTranslation()`
4. Add translation keys to both `locales/he/translation.json` and `locales/en/translation.json`
5. Use Tailwind utility classes for styling
6. Import Framer Motion for animations: `import { motion } from 'framer-motion'`

Example:
```javascript
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function MyComponent() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4"
    >
      <h1>{t('myComponent.title')}</h1>
    </motion.div>
  );
}
```

### Adding a New Page

1. Create file in `src/pages/PageName.jsx`
2. Add route in [src/App.jsx](../src/App.jsx)
3. Use React Router's `<Link>` for navigation

### Working with API

Use the configured Axios instance from [src/utils/api.js](../src/utils/api.js):

```javascript
import api from '../utils/api';

// GET request
const response = await api.get('/bookings');

// POST request
const response = await api.post('/bookings', bookingData);
```

API requests to `/api/*` are automatically proxied to `http://localhost:5000`.

### Adding Gallery Images

1. Place image in appropriate category folder under `src/assets/gallery/`
2. Update `galleryData` object in [src/components/Gallery.jsx](../src/components/Gallery.jsx)
3. Use Vite asset path format: `/src/assets/gallery/category/image.jpg`

Example:
```javascript
const galleryData = {
  studio: [
    '/src/assets/gallery/סטודיו/photo1.jpg',
    '/src/assets/gallery/סטודיו/photo2.jpg',
  ],
};
```

### Adding Translations

1. Add key to [src/i18n/locales/he/translation.json](../src/i18n/locales/he/translation.json)
2. Add corresponding key to [src/i18n/locales/en/translation.json](../src/i18n/locales/en/translation.json)
3. Use in component: `t('your.key.path')`

Example:
```json
// he/translation.json
{
  "contact": {
    "title": "צור קשר"
  }
}

// en/translation.json
{
  "contact": {
    "title": "Contact"
  }
}
```

## Module System Notes

**CRITICAL**: Client uses **ES Modules** (specified in [package.json](../package.json) with `"type": "module"`):

- Use `import` / `export` syntax (NOT `require` / `module.exports`)
- File extensions matter in imports (`.js`, `.jsx`)
- Top-level `await` is supported
- `__dirname` and `__filename` are not available (use `import.meta.url`)

**Example**:
```javascript
// ✅ Correct (ES Modules)
import React from 'react';
import api from './utils/api.js';

export default function Component() { }

// ❌ Wrong (CommonJS - don't use in client)
const React = require('react');
module.exports = Component;
```

## Testing Bilingual Support

When making changes:
1. Test in Hebrew (default) - RTL layout
2. Switch language and test in English - LTR layout
3. Verify text appears correctly in both languages
4. Check that layout adapts properly to RTL/LTR

Language switcher is in the Navbar component.

## Important Reminders

- **Never hardcode user-facing text** - always use `t('key')` with translation keys
- **All code in English** - only translation files contain Hebrew/English text
- **Prefer editing existing files** over creating new ones
- **Use Tailwind utilities** instead of custom CSS when possible
- **Follow React 19 patterns** (no class components, use hooks)
- **Test both languages** before considering a feature complete
