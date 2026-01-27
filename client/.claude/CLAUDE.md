# Client - Frontend Instructions

This file provides Claude Code guidance when working in the `client/` directory.

## Quick Reference

**Tech Stack**: React 19 + Vite + Tailwind CSS 4 + Framer Motion + react-i18next
**Default Language**: Hebrew (RTL)
**Dev Server**: `npm run dev` → http://localhost:3000
**API Proxy**: `/api/*` → http://localhost:5000 (see vite.config.js:8-12)

## Directory Structure

```
client/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components (Home.jsx)
│   ├── i18n/           # Translations (he/en)
│   │   └── locales/    # Hebrew (default) and English translations
│   ├── utils/          # api.js - API client functions
│   └── assets/         # Images, gallery photos
├── public/             # Static assets
├── .env                # Environment variables (not in git)
├── .env.example        # Environment template
└── vite.config.js      # Vite configuration with API proxy
```

## Development Workflow

### Starting Development

```bash
cd client
npm run dev      # Start Vite dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

- `VITE_API_URL` - Backend API URL (default: http://localhost:5000)
- `VITE_EMAILJS_SERVICE_ID` - EmailJS service ID
- `VITE_EMAILJS_TEMPLATE_ID` - EmailJS template ID
- `VITE_EMAILJS_PUBLIC_KEY` - EmailJS public key

## Key Patterns

### 1. Bilingual Support (Hebrew/English)

**CRITICAL**: All user-facing text MUST be in translation files, never hardcoded.

```javascript
// In components
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t('hero.title')}</h1>;
}
```

**When adding new text**:
1. Add key to `src/i18n/locales/he/translation.json` (Hebrew - default)
2. Add key to `src/i18n/locales/en/translation.json` (English - fallback)
3. Use `t('key.path')` in component

**RTL Support**:
- Direction (`ltr`/`rtl`) is set automatically in App.jsx:11
- Tailwind handles RTL with directional classes (e.g., `ms-4` instead of `ml-4`)

### 2. API Calls

**Always use the API utility**, never call axios directly:

```javascript
import { bookingAPI } from '../utils/api';

// In component
const handleSubmit = async (data) => {
  try {
    const response = await bookingAPI.create(data);
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

**Available API functions** (src/utils/api.js):
- `bookingAPI.getAll()` - Get all bookings
- `bookingAPI.getById(id)` - Get booking by ID
- `bookingAPI.create(data)` - Create new booking
- `bookingAPI.update(id, data)` - Update booking
- `bookingAPI.delete(id)` - Delete booking
- `bookingAPI.getAvailability(date)` - Check date availability

### 3. Styling with Tailwind CSS 4

```javascript
// Use Tailwind utility classes
<div className="flex items-center justify-between px-4 py-2">
  <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
    {t('button.submit')}
  </button>
</div>
```

**RTL-aware spacing**:
- Use `ms-*` (margin-inline-start) instead of `ml-*`
- Use `me-*` (margin-inline-end) instead of `mr-*`
- Use `ps-*` (padding-inline-start) instead of `pl-*`
- Use `pe-*` (padding-inline-end) instead of `pr-*`

### 4. Animations with Framer Motion

```javascript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### 5. Routing (Future Use)

React Router is installed but not actively used yet. Currently single-page app (Home.jsx).

To add routes later:
1. Wrap `<Home />` in `<BrowserRouter>` in App.jsx
2. Add `<Routes>` and `<Route>` components
3. Create new page components in `src/pages/`

## Component Guidelines

### Creating New Components

1. **File naming**: PascalCase (e.g., `MyComponent.jsx`)
2. **Location**: Place in `src/components/`
3. **Structure**:

```javascript
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

function MyComponent({ prop1, prop2 }) {
  const { t } = useTranslation();

  return (
    <motion.div className="container mx-auto">
      <h2>{t('myComponent.title')}</h2>
      {/* Component content */}
    </motion.div>
  );
}

export default MyComponent;
```

4. **Export**: Use default export
5. **Translations**: Add all text to translation files
6. **Styling**: Use Tailwind classes

### Existing Components

- **Gallery.example.jsx** - Gallery component template (not currently used)
- **GlobalMouseEffect.jsx** - Mouse interaction effects
- **GoldenGlitter.jsx** - Decorative glitter effect
- **FloatingSquares.jsx** - Animated background elements
- **Hero.jsx** - Homepage hero section
- **Navbar.jsx** - Navigation bar with language switcher
- **Contact.jsx** - Contact form with EmailJS integration
- **Footer.jsx** - Site footer

## Testing New Features

1. Start dev server: `npm run dev`
2. Open http://localhost:3000
3. Test both Hebrew (default) and English
4. Check RTL layout in Hebrew mode
5. Verify responsive design (mobile, tablet, desktop)
6. Test API integration if applicable

## Common Tasks

### Adding a New Page

1. Create `src/pages/NewPage.jsx`
2. Add translations to `locales/he/translation.json` and `locales/en/translation.json`
3. Import and route in App.jsx (when routing is active)

### Updating Translations

1. Edit `src/i18n/locales/he/translation.json` (Hebrew)
2. Edit `src/i18n/locales/en/translation.json` (English)
3. Use nested keys for organization: `{ "section": { "key": "value" } }`

### Adding Gallery Images

1. Place images in `src/assets/gallery/{category}/`
2. Images are organized by photography category (matching photographer-info.json)
3. Supported formats: JPG, PNG
4. Optimize images before adding (recommended max width: 1920px)

### Debugging API Issues

1. Check Vite proxy configuration in vite.config.js:8-12
2. Verify backend is running on http://localhost:5000
3. Check browser console for network errors
4. Inspect `src/utils/api.js` for endpoint configuration

## Build & Deployment

### Production Build

```bash
npm run build
```

Output in `dist/` directory. Upload to hosting provider.

### Preview Production Build

```bash
npm run preview
```

### Environment Variables for Production

Ensure production environment has all required `VITE_*` variables set.

## Code Quality

### ESLint Configuration

- Configuration: `eslint.config.js`
- Plugins: React hooks, React refresh
- Run: `npm run lint`

### Best Practices

- **No hardcoded text** - Use translation files
- **RTL-aware spacing** - Use logical properties (`ms-`, `me-`, `ps-`, `pe-`)
- **Responsive design** - Mobile-first approach
- **Accessibility** - Use semantic HTML, ARIA labels where needed
- **Performance** - Lazy load images, code split large components
- **API errors** - Always handle errors gracefully with user feedback

## Troubleshooting

### Common Issues

**Build errors**:
- Clear node_modules: `rm -rf node_modules package-lock.json && npm install`
- Check Node.js version compatibility

**API connection fails**:
- Verify backend is running on port 5000
- Check VITE_API_URL in .env
- Inspect vite.config.js proxy settings

**Translation not showing**:
- Verify key exists in both he/translation.json and en/translation.json
- Check i18n configuration in src/i18n/i18n.js
- Ensure `useTranslation()` hook is properly imported

**RTL layout issues**:
- Use Tailwind logical properties instead of directional (ms- vs ml-)
- Check `document.documentElement.dir` is set correctly in App.jsx

## Additional Resources

- **Vite**: https://vitejs.dev/
- **React**: https://react.dev/
- **Tailwind CSS 4**: https://tailwindcss.com/
- **Framer Motion**: https://www.framer.com/motion/
- **react-i18next**: https://react.i18next.com/
- **EmailJS**: https://www.emailjs.com/docs/
