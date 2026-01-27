---
applyTo: 'client/**'
---

# Client Application Instructions

## Project Overview
Photography portfolio website for kids & family photography. Built with React 19 + Vite, featuring bilingual support (Hebrew/English), gold/black luxury theme, and smooth animations.

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI Framework |
| Vite | 7.2.2 | Build Tool (ES Modules) |
| Tailwind CSS | 4.1.17 | Styling |
| Framer Motion | 12.x | Animations |
| i18next | 25.x | Internationalization |
| Axios | 1.13.x | API Calls |
| EmailJS | 4.4.x | Contact Form |
| Lucide React | 0.554.x | Icons |

---

## Critical Rules

### Code Standards
- **No Hebrew in code** – All variable names, comments, function names must be in English
- **No emojis in code** – Use Lucide icons instead
- **Never use green colors** – Stick to the gold/black theme palette
- **ES Modules** – Use `import/export` syntax (not CommonJS)

---

## Design System

### Color Palette (Tailwind Classes)
```javascript
// Primary colors
primary: '#D4AF37'      // Bright gold - headings, main accents
secondary: '#B8956A'    // Warm gold - subtle backgrounds
accent: '#DAA520'       // Golden rod - buttons, CTAs
accentDark: '#AA8C2C'   // Darker gold - hover states

// Background colors
background: '#0F0F0F'   // Deep black - main background
lightPink: '#1A1A1A'    // Very dark gray - sections
mediumPink: '#2A2A2A'   // Medium dark gray
lightGray: '#3A3A3A'    // Light dark gray
mediumGray: '#555555'   // Warm medium gray

// Text colors
textDark: '#F5F5F5'     // Off-white - main text
textLight: '#B0B0B0'    // Light gray - secondary text
```

### Typography
```javascript
fontFamily: {
  sans: ['Inter', 'Heebo', 'sans-serif'],      // Body text
  heading: ['Montserrat', 'Rubik', 'sans-serif'] // Headings
}
```

### Heading Styles (from index.css)
- `h1`: 4rem, weight 800, letter-spacing 0.08em, gold text-shadow
- `h2`: 3rem, weight 700, letter-spacing 0.06em
- `h3`: 1.875rem, weight 700, letter-spacing 0.05em

---

## Component Patterns

### Animation Pattern (Framer Motion)
Always use consistent animation patterns:

```jsx
// Standard fade-in animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>

// Button hover effect
<motion.button
  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(212, 175, 55, 0.35)" }}
  whileTap={{ scale: 0.95 }}
>

// Staggered children animation
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
```

### Button Styling
```jsx
// Primary button (gold background)
className="bg-primary text-background px-12 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-accent transition-all duration-300 btn-shimmer metallic-blur"

// Secondary button (outline)
className="bg-mediumGray text-primary border-2 border-primary px-12 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-lightGray transition-all duration-300 btn-shimmer metallic-blur"
```

### Form Input Styling
```jsx
className={`w-full px-4 py-3 rounded-lg border ${
  errors.fieldName ? 'border-red-400' : 'border-primary/30'
} bg-white text-textDark text-base focus:outline-none focus:ring-2 focus:ring-primary/60`}
```

### Section Container
```jsx
<section id="section-name" className="py-24 px-4 bg-background relative">
  <div className="container mx-auto max-w-6xl">
    {/* Content */}
  </div>
</section>
```

---

## Internationalization (i18n)

### Setup
- Default language: **Hebrew (he)** with RTL
- Fallback: **English (en)**
- Translation files: `src/i18n/locales/{en,he}/translation.json`

### Usage Pattern
```jsx
import { useTranslation } from 'react-i18next';

const Component = () => {
  const { t, i18n } = useTranslation();
  
  return <h1>{t('hero.title')}</h1>;
};
```

### RTL Handling
RTL is set automatically in `App.jsx`:
```jsx
useEffect(() => {
  document.documentElement.dir = i18n.language === 'he' ? 'rtl' : 'ltr';
}, [i18n.language]);
```

### Adding New Strings
**Always add to BOTH translation files:**
1. `src/i18n/locales/he/translation.json` (Hebrew)
2. `src/i18n/locales/en/translation.json` (English)

### Translation Structure
```json
{
  "nav": { "home": "...", "gallery": "..." },
  "hero": { "title": "...", "subtitle": "..." },
  "gallery": { "title": "...", "all": "..." },
  "booking": { "title": "...", "form": {...}, "sessionTypes": {...} },
  "contact": { "title": "...", "form": {...}, "info": {...} },
  "footer": { "rights": "...", "followUs": "..." }
}
```

---

## Special Effects Components

### GoldenGlitter
Particle effect on button hover:
```jsx
import GoldenGlitter from './GoldenGlitter';

const [glitterCoords, setGlitterCoords] = useState({ x: 0, y: 0 });
const [showGlitter, setShowGlitter] = useState(false);

const handleButtonHover = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  setGlitterCoords({
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  });
  setShowGlitter(true);
};

// In JSX
{showGlitter && <GoldenGlitter x={glitterCoords.x} y={glitterCoords.y} count={12} />}
<button onMouseEnter={handleButtonHover}>...</button>
```

### FloatingSquares
Background animated squares - gold gradient, glass morphism effect:
```jsx
import FloatingSquares from './FloatingSquares';
// Component is fixed position, z-0, pointer-events-none
```

### GlobalMouseEffect
Global mouse tracking with golden glow effect following cursor.

---

## CSS Utility Classes (from index.css)

| Class | Effect |
|-------|--------|
| `text-glow` | Animated premium gold glow effect |
| `text-premium` | Static gold text with shadow |
| `text-subtitle` | Large light secondary text |
| `btn-shimmer` | Button with shimmer on hover |
| `metallic-blur` | Metallic hover effect |
| `letter-spacing` | 0.05em letter spacing |

---

## API Integration

### API Client Setup (`src/utils/api.js`)
```javascript
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const bookingAPI = {
  createBooking: async (data) => (await api.post('/bookings', data)).data,
  getAllBookings: async () => (await api.get('/bookings')).data,
  getBooking: async (id) => (await api.get(`/bookings/${id}`)).data,
  getAvailableDates: async () => (await api.get('/bookings/available-dates')).data,
};
```

### Environment Variables (`.env`)
```
VITE_API_URL=http://localhost:5000/api
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## File Structure Convention

```
src/
├── assets/
│   └── gallery/           # Gallery images by category (Hebrew folder names OK)
├── components/
│   ├── Contact.jsx        # Contact form + info section
│   ├── FloatingSquares.jsx # Background animation
│   ├── Footer.jsx         # Site footer
│   ├── Gallery.jsx        # Image gallery with filters
│   ├── GlobalMouseEffect.jsx # Mouse tracking effect
│   ├── GoldenGlitter.jsx  # Particle effect component
│   ├── Hero.jsx           # Hero section
│   └── Navbar.jsx         # Navigation bar
├── i18n/
│   ├── i18n.js            # i18next configuration
│   └── locales/           # Translation files
├── pages/
│   └── Home.jsx           # Main page composition
├── utils/
│   └── api.js             # API client
├── App.jsx                # Root component with RTL setup
├── index.css              # Global styles + animations
└── main.jsx               # React entry point
```

---

## Image Handling

### Dynamic Import (for assets)
```jsx
<img
  src={new URL('../assets/gallery/גיל שנה/image.jpg', import.meta.url).href}
  alt="description"
  onError={(e) => e.target.style.display = 'none'}
/>
```

### Static Path (for gallery)
```jsx
const images = ['/src/assets/gallery/סטודיו/image.jpg'];
```

---

## Development

### Start Dev Server
```powershell
cd client
npm run dev  # Runs on port 3000
```

### Vite Proxy Config
API calls to `/api` are proxied to `localhost:5000`:
```javascript
// vite.config.js
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  },
},
```

---

## Form Validation Pattern

```jsx
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateForm = () => {
  const newErrors = {};
  if (!formData.name.trim()) newErrors.name = t('contact.form.validation.required');
  if (!formData.email.trim()) {
    newErrors.email = t('contact.form.validation.required');
  } else if (!emailRegex.test(formData.email)) {
    newErrors.email = t('contact.form.validation.invalidEmail');
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

---

## Session Types (Booking)
```javascript
const sessionTypes = ['newborn', 'toddler', 'kids', 'family'];

// Labels from i18n:
// newborn: "Newborn (0-1 years)" / "תינוקות (0-1 שנים)"
// toddler: "Toddler (1-3 years)" / "פעוטות (1-3 שנים)"
// kids: "Kids (3-10 years)" / "ילדים (3-10 שנים)"
// family: "Family" / "משפחה"
```

---

## Best Practices Summary

1. **Always use Tailwind classes** from the defined palette
2. **Wrap text in `t()`** for all user-facing strings
3. **Add Framer Motion** animations to new sections
4. **Include error handling** for API calls and forms
5. **Test in both RTL and LTR** modes
6. **Keep components focused** - single responsibility
7. **Use semantic HTML** sections with proper IDs for navigation