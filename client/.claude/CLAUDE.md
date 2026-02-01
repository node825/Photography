# CLAUDE.md - Client Frontend

This file provides guidance to Claude Code when working with the React frontend in this repository.

## Quick Reference

```bash
npm run dev        # Start dev server (port 3000)
npm run build      # Build for production
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI framework |
| Vite | Latest | Build tool & dev server |
| Tailwind CSS | 4.1.17 | Utility-first CSS |
| Framer Motion | 12.23.24 | Animations |
| i18next | 25.6.2 | Internationalization |
| react-i18next | 16.3.3 | React i18n integration |
| Axios | 1.13.2 | HTTP client |
| EmailJS | 4.4.1 | Email sending |
| Lucide React | 0.554.0 | Icons |
| react-big-calendar | 1.19.4 | Calendar component |
| date-fns | 4.1.0 | Date utilities |

## Directory Structure

```
client/
├── src/
│   ├── assets/
│   │   └── gallery/           # 5 photo categories (Hebrew folder names)
│   │       ├── גיל שנה/       # Year-old children (24+ images)
│   │       ├── חאלקה/         # Family celebrations (45+ images)
│   │       ├── חוץ/           # Outdoor shoots (51+ images)
│   │       ├── מוצרים/        # Props/products (8 images)
│   │       └── סטודיו/        # Studio shoots (13 images)
│   ├── components/
│   │   ├── Navbar.jsx         # Navigation with language toggle
│   │   ├── Hero.jsx           # Landing section with animations
│   │   ├── Gallery.jsx        # Photo gallery with filtering
│   │   ├── Contact.jsx        # Contact form (EmailJS)
│   │   ├── Footer.jsx         # Footer with links
│   │   ├── FloatingSquares.jsx    # Background animation
│   │   ├── GlobalMouseEffect.jsx  # Mouse tracking glow
│   │   └── GoldenGlitter.jsx      # Particle effects
│   ├── pages/
│   │   └── Home.jsx           # Main page (orchestrates all sections)
│   ├── i18n/
│   │   ├── i18n.js            # i18next configuration
│   │   └── locales/
│   │       ├── en/translation.json
│   │       └── he/translation.json
│   ├── utils/
│   │   └── api.js             # Axios API client
│   ├── App.jsx                # Root component (RTL/LTR setup)
│   ├── index.css              # Global styles & animations
│   └── main.jsx               # Entry point
├── public/
├── dist/                      # Production build output
├── .env                       # Environment variables
├── vite.config.js
├── tailwind.config.js
├── postcss.config.cjs
└── eslint.config.js
```

## Component Architecture

### Page Hierarchy

```
Home.jsx (Main Page)
├── GlobalMouseEffect      # Fixed, pointer-events-none
├── FloatingSquares        # Fixed background (z-0)
├── Navbar                 # Fixed top (z-50)
│   └── GoldenGlitter      # On hover effects
├── Hero                   # id="home"
│   └── GoldenGlitter      # On button hover
├── Gallery                # id="gallery"
├── Contact                # id="contact" / id="booking"
│   └── GoldenGlitter      # On submit button
└── Footer
```

### Component Details

| Component | Section ID | Key Features |
|-----------|------------|--------------|
| `Navbar.jsx` | - | Sticky nav, logo, language toggle (EN/עב), navigation links |
| `Hero.jsx` | `#home` | Gradient background, scattered images animation, 2 CTAs |
| `Gallery.jsx` | `#gallery` | Category filtering, 4-column grid, hover zoom effects |
| `Contact.jsx` | `#contact` | EmailJS form, validation, success/error states |
| `Footer.jsx` | - | 3-column layout, quick links, social icons |

### Visual Effects Components

| Component | Purpose | Z-Index |
|-----------|---------|---------|
| `FloatingSquares.jsx` | 6 large + 4 small animated squares, infinite loop | z-0 |
| `GlobalMouseEffect.jsx` | Mouse tracking, CSS variables, glow trigger | - |
| `GoldenGlitter.jsx` | Particle system on hover/click events | z-9999 |

## Styling System

### Tailwind CSS v4 Custom Theme

**Color Palette (Luxury Dark with Gold):**
```javascript
primary: '#D4AF37'      // Bright gold (headings, accents)
secondary: '#B8956A'    // Warm gold (subtle backgrounds)
accent: '#DAA520'       // Golden rod (buttons, CTAs)
accentDark: '#AA8C2C'   // Darker gold (hover states)
background: '#0F0F0F'   // Deep black (main background)
textDark: '#F5F5F5'     // Off-white (main text)
textLight: '#B0B0B0'    // Light gray (secondary text)
```

**Font Families:**
- `font-sans`: Inter, Heebo (body text)
- `font-heading`: Montserrat, Rubik (headings)

### Global CSS Animations (index.css)

| Class | Effect |
|-------|--------|
| `.text-glow` | Premium heading animation with golden glow |
| `.text-premium` | Golden gradient text |
| `.btn-shimmer` | Button shine on hover |
| `.metallic-blur` | Hover glow effect |

### CSS Variables (Mouse Effects)

```css
--mouse-x: [tracked]
--mouse-y: [tracked]
--glow-opacity: [0-1]
```

## Internationalization (i18n)

### Configuration

- **Default Language**: Hebrew (he)
- **Fallback**: English (en)
- **Direction**: Automatic RTL/LTR based on language

### Translation Keys Structure

```
nav.*        # Navigation labels
hero.*       # Hero section text
gallery.*    # Gallery labels
booking.*    # Booking form
contact.*    # Contact section
footer.*     # Footer text
```

### Adding Translations

1. Add key to `src/i18n/locales/en/translation.json`
2. Add same key to `src/i18n/locales/he/translation.json`
3. Use in component: `const { t } = useTranslation(); t('key.path')`

### RTL/LTR Handling

```jsx
// App.jsx sets direction based on language
document.documentElement.dir = i18n.language === 'he' ? 'rtl' : 'ltr';
```

## API Integration

### Axios Configuration (src/utils/api.js)

```javascript
baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
```

### Available API Functions

```javascript
import { bookingAPI } from './utils/api';

bookingAPI.createBooking(data)     // POST /bookings
bookingAPI.getAllBookings()        // GET /bookings
bookingAPI.getBooking(id)          // GET /bookings/:id
bookingAPI.getAvailableDates()     // GET /bookings/available-dates
```

### Vite Proxy (Development)

All `/api/*` requests proxied to `http://localhost:5000` during development.

## Environment Variables

**File**: `.env`

```bash
VITE_API_URL=http://localhost:5000/api
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

**Access in code**: `import.meta.env.VITE_VARIABLE_NAME`

**Note**: All client-accessible variables MUST be prefixed with `VITE_`

## Common Development Tasks

### Adding a New Component

1. Create file in `src/components/NewComponent.jsx`
2. Use functional component with hooks
3. Import in parent component (usually `Home.jsx`)
4. Add translations if needed

### Adding a New Gallery Category

1. Add folder to `src/assets/gallery/[category-name]/`
2. Add images to folder
3. Update `Gallery.jsx` categories array
4. Add translation keys for category name

### Modifying Contact Form

- **Form fields**: `src/components/Contact.jsx`
- **Validation**: In component state
- **Email template**: EmailJS dashboard
- **API submission**: Use `bookingAPI.createBooking()`

### Changing Theme Colors

Edit `tailwind.config.js` colors section:
```javascript
colors: {
  primary: '#D4AF37',
  // ... other colors
}
```

### Adding New Animation

1. Define keyframes in `src/index.css`
2. Add Tailwind animation in `tailwind.config.js`
3. Use Framer Motion for component animations

## Navigation System

Currently using anchor-based navigation (single-page app):

| Link | Target Section |
|------|----------------|
| Home | `#home` (Hero) |
| Gallery | `#gallery` |
| Booking | `#contact` |
| Contact | `#contact` |

**Note**: `react-router-dom` is installed but not implemented. Future multi-page support ready.

## Performance Considerations

1. **Images**: Async loading with error handling
2. **Animations**: Throttled (100ms glitter, viewport-based triggers)
3. **Effects**: `pointer-events-none` on decorative elements
4. **Z-Index Layers**: Background (0) < Content (10) < Nav (50) < Effects (9999)

## Code Standards

- **Language**: All code, comments, variables in English only
- **No emojis**: In code, commits, or documentation
- **ESLint**: Configured with React Hooks rules
- **Formatting**: Consistent indentation, semicolons optional

## Debugging Tips

### Common Issues

1. **EmailJS not sending**: Check `.env` variables and EmailJS dashboard
2. **API calls failing**: Ensure backend running on port 5000
3. **RTL not working**: Check `document.documentElement.dir` in App.jsx
4. **Animations not showing**: Check z-index and `pointer-events`

### Useful Console Commands

```javascript
// Check current language
console.log(i18n.language);

// Check document direction
console.log(document.documentElement.dir);

// Check environment variables
console.log(import.meta.env);
```

## Build & Deployment

### Production Build

```bash
npm run build    # Output to /dist
npm run preview  # Preview build locally
```

### Build Output

- Minified JavaScript bundles
- Optimized CSS (Tailwind purged)
- Assets copied to dist/assets

### Expected Bundle Size

Large bundle expected due to:
- React 19
- Framer Motion
- i18next
- Lucide icons
- react-big-calendar

## File Modification Guide

| Task | Files to Modify |
|------|-----------------|
| Navigation items | `Navbar.jsx`, translation files |
| Hero content | `Hero.jsx`, translation files |
| Gallery categories | `Gallery.jsx`, assets folder |
| Contact form fields | `Contact.jsx`, translation files |
| Color scheme | `tailwind.config.js` |
| Global animations | `index.css` |
| API endpoints | `utils/api.js` |
| New translations | `i18n/locales/{en,he}/translation.json` |
