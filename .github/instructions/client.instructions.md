---
applyTo: 'client/**/*.jsx, client/**/*.js, client/**/*.css, client/**/*.json '
---

# Client (React + Vite) Instructions

## Critical Rules
- **NO Hebrew text in code** - All code, comments, variable names must be in English
- **NO emojis in files** - Do not use emojis anywhere in the code
- **All UI strings in i18n** - Use translation JSON files for all user-facing text
- **Default language is Hebrew** - App loads with Hebrew as default language

## Architecture & Technology

### Stack
- **React 19** with Vite (dev server on port 3000)
- **Tailwind CSS v4** for styling
- **Framer Motion** for animations
- **i18next** for bilingual support (Hebrew RTL / English LTR)
- **EmailJS** for contact form (client-side only)
- **Lucide React** for icons

### Folder Structure
```
src/
  components/         # Reusable components
    - Contact.jsx     # Contact form with EmailJS
    - Gallery.jsx     # Image gallery with galleries folders
    - Navbar.jsx      # Navigation with language toggle
    - Hero.jsx        # Hero section
    - Footer.jsx      # Footer
    - FloatingSquares.jsx
    - GlobalMouseEffect.jsx
    - GoldenGlitter.jsx
  pages/
    - Home.jsx        # Single-page app main component
  i18n/
    - i18n.js         # i18next configuration
    - locales/
      - en/translation.json
      - he/translation.json
  utils/
    - api.js          # API calls to backend
  assets/
    - gallery/        # Images in Hebrew folders
      - גיל שנה/
      - חאלקה/
      - חוץ/
      - מוצרים/
      - סטודיו/
```

## Internationalization (i18n)

### Language Configuration
- Default language: Hebrew (`lng: 'he'` in `i18n/i18n.js`)
- Fallback language: English
- Text direction: Automatic RTL for Hebrew, LTR for English via `document.documentElement.dir`

### Adding Translations
1. All UI strings must go in translation JSON files
2. Use dot notation for nested keys: `hero.title`, `contact.form.name`, etc.
3. Files:
   - `src/i18n/locales/he/translation.json` - Hebrew translations
   - `src/i18n/locales/en/translation.json` - English translations

### Using Translations in Components
```jsx
import { useTranslation } from 'react-i18next';

export default function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t('section.key')}</h1>;
}
```

## Styling Guidelines

### Tailwind CSS v4
- Custom theme in `tailwind.config.js`
- Use semantic color names (not raw colors):
  - `text-primary` - Main text color
  - `text-textDark` - Dark text
  - `text-textLight` - Light text
  - `bg-background` - Main background
  - `text-gold` or use gold utilities
  
### Color Palette
- Primary gold: `#D4AF37`
- Secondary gold: `#DAA520`
- Dark background: `#0F0F0F`
- Based on photographer's premium aesthetic

### Typography
- Body fonts: Inter (EN), Heebo (HE)
- Heading fonts: Montserrat (EN), Rubik (HE)
- Defined in Tailwind config

## Component Patterns

### Animation Guidelines
- Use **Framer Motion** for all animations
- Common patterns:
  - `motion.div` for animated containers
  - `whileInView` for scroll-triggered animations
  - `initial`, `animate`, `transition` props for timing
  
### Single Page App Structure
- Main component: `src/pages/Home.jsx`
- Navigation via anchor links: `#home`, `#gallery`, `#contact`
- Each section is a component with `id` attribute

### Component Best Practices
- Use hooks (useState, useEffect, useTranslation)
- Keep components focused and single-responsibility
- Props for configuration, state for internal changes
- Extract repeated logic into custom hooks

## API Integration

### Base URL
- Configured via `VITE_API_URL` environment variable (default: `http://localhost:5000/api`)
- In `src/utils/api.js`

### Available Endpoints
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get all bookings (admin only)
- `GET /api/bookings/:id` - Get single booking
- `GET /api/health` - Server health check

### Booking Form Data
```javascript
{
  clientName: string,
  phone: string,
  email: string,
  sessionType: 'newborn' | 'toddler' | 'kids' | 'family',
  preferredDate: date,
  notes: string
}
```

## Contact Form (EmailJS)

### Configuration
- Uses EmailJS for sending emails (client-side, no backend)
- Environment variables:
  - `VITE_EMAILJS_SERVICE_ID`
  - `VITE_EMAILJS_TEMPLATE_ID`
  - `VITE_EMAILJS_PUBLIC_KEY`
- Configured in `Contact.jsx`

### Email Sending
- Direct client-side integration
- No backend processing required
- Server has no involvement in contact form

## Gallery Assets

### Image Organization
Images stored in `src/assets/gallery/` with Hebrew folder names:
- `גיל שנה/` - First birthday photos
- `חאלקה/` - Upsherin ceremony photos
- `חוץ/` - Outdoor session photos
- `מוצרים/` - Product/album photos
- `סטודיו/` - Studio session photos

### Updating Gallery
- Add images to appropriate Hebrew-named folders
- Update `galleryData` object in `Gallery.jsx`
- Include alt text and image metadata

## Environment Variables

Create `.env` file in client root:
```
VITE_API_URL=http://localhost:5000/api
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Development Commands

```powershell
# Install dependencies
npm install

# Start dev server (with Vite HMR on port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Performance & Best Practices

- Lazy load images in gallery
- Use `whileInView` animations to reduce initial load
- Optimize image sizes for web
- Keep components small and reusable
- Use React DevTools for debugging

## Common Tasks

### Adding a New Section
1. Create component in `src/components/NewSection.jsx`
2. Use Framer Motion for animations
3. Add translations to both `translation.json` files
4. Import and add to `Home.jsx`
5. Add anchor link in Navbar

### Adding Images to Gallery
1. Place images in `src/assets/gallery/{HebrewFolder}/`
2. Update `galleryData` in `Gallery.jsx`
3. Ensure alt text is in translations

### Changing Styling
1. Check Tailwind config for semantic colors first
2. Use Tailwind utilities (don't add raw CSS unless necessary)
3. Keep animations in Framer Motion, not CSS

## File Naming Conventions
- Components: PascalCase (`MyComponent.jsx`)
- Utilities: camelCase (`apiUtils.js`)
- Constants: UPPER_SNAKE_CASE
- CSS classes: kebab-case (via Tailwind utilities)