# Navbar Component

## Purpose
The Navbar component provides sticky top navigation for the single-page photography website. It contains anchor links to all major sections, a language toggle button for switching between Hebrew and English, and the photographer's logo with a golden glitter hover effect.

**Location:** [client/src/components/Navbar.jsx](../../../client/src/components/Navbar.jsx)

## Props

This is a **self-contained component** with no props required.

```jsx
<Navbar />
```

## Key Features

### 1. **Section Navigation**
- Anchor links to all page sections: Home (`#home`), Gallery (`#gallery`), Booking (`#booking`), Contact (`#contact`)
- Links use i18n translation keys (`nav.home`, `nav.examples`, `nav.booking`, `nav.contact`)
- Hover effect transitions text color from `text-textDark` to `text-primary` (gold)

### 2. **Language Toggle**
- Button switches between Hebrew (`he`) and English (`en`)
- Updates `i18n.language` via `i18n.changeLanguage()`
- Sets `document.documentElement.dir` to `rtl` (Hebrew) or `ltr` (English)
- Displays "EN" when current language is Hebrew, displays Hebrew characters when current language is English

### 3. **Logo with Glitter Effect**
- Photographer logo displayed on the right side
- Framer Motion scale animation on hover (`scale: 1.1`)
- Triggers `GoldenGlitter` particle effect on mouse enter
- Logo uses CSS `invert(1)` filter with a gold drop shadow

### 4. **Sticky Positioning**
- Fixed to top of viewport with `sticky top-0 z-50`
- Compact height of 32px
- Semi-transparent backdrop blur (`backdrop-blur-md`)
- Subtle gold bottom border (`border-primary/30`)

## Usage Example

```jsx
// In Home.jsx (main page component)
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <div className="relative z-10">
        <Hero />
        <Gallery />
        <Booking />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
```

## State Management

```jsx
const [glitterCoords, setGlitterCoords] = useState({ x: 0, y: 0 });
const [showGlitter, setShowGlitter] = useState(false);
```

- `glitterCoords` - Tracks the center position of the logo for the glitter particle spawn point
- `showGlitter` - Controls visibility of the `GoldenGlitter` effect component

## Styling & Colors

Uses Tailwind CSS with custom theme colors from [tailwind.config.js](../../../client/tailwind.config.js):

- **Background** (`bg-background`): Dark (`#0F0F0F`)
- **Text** (`text-textDark`): Off-white (`#F5F5F5`)
- **Primary** (`text-primary`, `bg-primary`): Gold (`#D4AF37`)
- **Accent** (`bg-accent`): Golden rod (`#DAA520`) for button hover
- **Border**: `border-primary/30` - Subtle gold bottom border

### Layout
- Flexbox row with `justify-between` for three-section layout
- Left: Navigation links
- Center: Language toggle button
- Right: Logo

## Translation Keys

| Key | English | Hebrew |
|-----|---------|--------|
| `nav.home` | Home | ראשי |
| `nav.examples` | Gallery | גלריה |
| `nav.booking` | Book Session | הזמנת צילום |
| `nav.contact` | Contact | צור קשר |

## Dependencies

- **react-i18next**: Language switching and translated navigation labels
- **Framer Motion**: Logo hover scale animation (`motion.div`)
- **GoldenGlitter**: Particle effect component triggered on logo hover
- **Tailwind CSS**: Styling, responsive layout, and color theme

## Accessibility Notes

- Semantic `<nav>` element for navigation landmark
- Anchor links with descriptive translated text
- Hover states with color transitions for visual feedback
- Logo image includes descriptive `alt` text ("Kids Photography Logo")

## Technical Notes

- Navbar is rendered outside the `z-10` content container in `Home.jsx` to maintain sticky behavior
- Language toggle directly modifies `document.documentElement.dir` for RTL/LTR switching
- Logo asset path: `src/assets/Black And White Camera Store Logo - black.png`
- Compact 32px height keeps the navbar unobtrusive over photography content

## Related Components

- [Gallery Component](../Gallery/README.md) - Gallery section (anchor: `#gallery`)
- [Booking Component](../Booking/README.md) - Booking form section (anchor: `#booking`)
- GoldenGlitter ([source](../../../client/src/components/GoldenGlitter.jsx)) - Particle effect on logo hover
