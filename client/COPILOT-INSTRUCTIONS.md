# Client Development Guide

## Technology Stack
- React + Vite (port 3000)
- Tailwind CSS with custom theme
- Framer Motion for animations
- react-i18next for bilingual support (Hebrew RTL / English LTR)

## Starting the Client
```bash
cd client
npm run dev
```
Or use the root PowerShell script: `.\start-dev.ps1`

## Internationalization (i18n)

### Language Management
```javascript
// Default language is Hebrew (he), fallback to English (en)
// Toggle changes both i18n.language AND document.documentElement.dir
i18n.changeLanguage(newLang);
document.documentElement.dir = newLang === 'he' ? 'rtl' : 'ltr';
```

### Translation Files
- Located in `src/i18n/locales/{en,he}/translation.json`
- Structure: Nested objects by component/section (e.g., `nav.home`, `booking.form.submit`)
- **Always update BOTH language files** when adding new UI text
- Use `{t('key')}` from `useTranslation()` hook - never hardcode text
- **⚠️ CRITICAL: NO HEBREW TEXT IN CODE** - All code, comments, variable names, console logs, and documentation MUST be in English only. Hebrew text is ONLY allowed in `translation.json` files.

### Translation Example
```jsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t, i18n } = useTranslation();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'he' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'he' ? 'rtl' : 'ltr';
  };
  
  return <h1>{t('hero.title')}</h1>;
};
```

## Component Architecture

### Framer Motion Usage Pattern
```jsx
// Staggered animations: parent initial/animate, children with delays
<motion.div 
  initial={{ opacity: 0, y: 30 }} 
  animate={{ opacity: 1, y: 0 }} 
  transition={{ duration: 0.8 }}
>
  <motion.h1 transition={{ delay: 0.2 }}>...</motion.h1>
  <motion.p transition={{ delay: 0.4 }}>...</motion.p>
</motion.div>

// Interactive elements use whileHover and whileTap
<motion.a 
  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(45, 183, 160, 0.3)" }} 
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.a>
```

See `components/Hero.jsx` for complete staggered animation example.

### Styling Conventions
- **Tailwind-first**: Use custom theme colors from `tailwind.config.js`
  - `primary` (#2C3E50) - Dark blue-gray for main text/backgrounds
  - `accent` (#7DD3C0) - Soft turquoise for CTAs
  - `accentDark` (#5FB8A6) - Darker turquoise for hover states
  - `background` (#E8F6F3) - Light turquoise background
  - Custom fonts: `font-sans` (Inter/Heebo), `font-heading` (Montserrat/Rubik)
- **⚠️ NO BRIGHT GREEN COLORS** - Do not use bright green (#00FF00, lime, neon green, etc.) anywhere in the project
- Navbar pattern: `sticky top-0 z-50 backdrop-blur-sm bg-opacity-95`
- Prefer `className` composition over inline styles
- Use gradient backgrounds: `bg-gradient-to-br from-background via-lightGray to-accent/20`

## API Integration

### API Client Pattern
All API calls go through `src/utils/api.js`:

```javascript
import { bookingAPI } from '../utils/api';

// Create booking
const response = await bookingAPI.createBooking(formData);
// response = { success: true, data: {...} }

// Get all bookings
const bookings = await bookingAPI.getAllBookings();
// bookings = { success: true, count: 10, data: [...] }
```

### Vite Proxy Configuration
The `vite.config.js` proxies `/api/*` requests to `http://localhost:5000` automatically:
```javascript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
    },
  },
}
```

### Error Handling
```javascript
try {
  const result = await bookingAPI.createBooking(data);
  if (result.success) {
    // Show success message
  }
} catch (error) {
  // Show error message
  console.error('Booking failed:', error.message);
}
```

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Sticky nav with language toggle
│   │   ├── Hero.jsx           # Landing section with staggered animations
│   │   ├── Footer.jsx         # Site footer
│   │   └── FloatingSquares.jsx # Background animation
│   ├── pages/
│   │   └── Home.jsx           # Main page (renders all sections)
│   ├── i18n/
│   │   ├── i18n.js            # i18next configuration
│   │   └── locales/
│   │       ├── en/translation.json
│   │       └── he/translation.json
│   ├── utils/
│   │   └── api.js             # Axios client and API methods
│   ├── App.jsx                # Root component (sets RTL/LTR)
│   └── main.jsx               # Entry point
├── tailwind.config.js         # Custom theme configuration
├── vite.config.js             # Dev server + proxy config
└── package.json               # "type": "module" (ESM)
```

## Key Patterns

### Single-Page Navigation
Current implementation uses anchor links (no React Router):
- Navigation: `<a href="#home">`, `<a href="#gallery">`, `<a href="#booking">`
- Sections: `<section id="home">`, `<section id="gallery">`, etc.

### Form Validation
- Validate on client before API submission
- Display error messages using translation keys
- Show loading states during async operations

## Development Constraints

- **ESM modules**: Use `import`/`export` (package.json has `"type": "module"`)
- **No React Router**: Single-page with anchor navigation
- **Images**: Use placeholder URLs or store in `public/images/`
- **Environment variables**: Use `import.meta.env.VITE_*` format

## Testing Checklist

When adding features, verify:
- ✅ Both Hebrew (RTL) and English (LTR) translations work
- ✅ Layout direction switches correctly (inspect `document.documentElement.dir`)
- ✅ Framer Motion animations don't break with RTL
- ✅ Tailwind custom colors are used (no hardcoded hex values)
- ✅ API calls handle errors gracefully
- ✅ Forms validate before submission
