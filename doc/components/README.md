# Component Documentation

This directory contains documentation for all React components used in the application.

## Main Components

### Layout & Structure

| Component | File | Purpose |
|-----------|------|---------|
| Home | [doc/components/Home.md](./Home.md) | Main page container (entry point) |
| Navbar | [doc/components/Navbar.md](./Navbar.md) | Navigation and language toggle |
| Footer | [doc/components/Footer.md](./Footer.md) | Footer section |

### Page Sections

| Component | File | Purpose | Anchor |
|-----------|------|---------|--------|
| Hero | [doc/components/Hero.md](./Hero.md) | Hero/welcome section | #home |
| Gallery | [doc/components/Gallery.md](./Gallery.md) | Photo gallery with filters | #gallery |
| Booking | [doc/components/Booking.md](./Booking.md) | Booking form | #booking |
| Contact | [doc/components/Contact.md](./Contact.md) | Contact form | #contact |

### Effects & Visual

| Component | File | Purpose |
|-----------|------|---------|
| GlobalMouseEffect | [doc/components/GlobalMouseEffect.md](./GlobalMouseEffect.md) | Mouse tracking effect |
| FloatingSquares | [doc/components/FloatingSquares.md](./FloatingSquares.md) | Animated background |
| GoldenGlitter | [doc/components/GoldenGlitter.md](./GoldenGlitter.md) | Glitter effect |

## Code Organization

```
client/src/
├── components/
│   ├── Home.jsx          (entry point)
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Gallery.jsx
│   ├── Booking.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── GlobalMouseEffect.jsx
│   ├── FloatingSquares.jsx
│   └── GoldenGlitter.jsx
├── pages/
│   └── Home.jsx          (renders all components)
└── i18n/
    └── locales/
        ├── en/translation.json
        └── he/translation.json
```

## Component Hierarchy

```
Home.jsx (single entry point - client/src/pages/Home.jsx)
├── Navbar (sticky, language toggle)
├── Hero (anchor: #home)
├── Gallery (anchor: #gallery, filters by sessionType)
├── Booking (anchor: #booking, form submission)
├── Contact (anchor: #contact, EmailJS)
├── Footer
└── Effects 
    ├── GlobalMouseEffect
    ├── FloatingSquares
    └── GoldenGlitter
```

## Creating New Component Documentation

When creating a new React component:

1. Create a new `.md` file with component name (e.g., `ComponentName.md`)
2. Use the [React Component Template](../../.github/skills/documentation-writer/references/react-component-template.md)
3. Fill in all required sections:
   - Overview and Purpose
   - Props Interface
   - i18n Keys used (Hebrew & English)
   - Styling (Tailwind classes)
   - Animations (Framer Motion)
   - Integration in Home.jsx
   - Code Examples
   - Dependencies
4. Add the component entry to the appropriate section in this README.md
5. **Important**: Add the component import and render in `client/src/pages/Home.jsx`

## Standards & Conventions

### Props Naming
- Use camelCase: `prop`, `onEvent`, `isVisible`
- Prefix handlers with `on`: `onClick`, `onSubmit`, `onEvent`
- Prefix booleans with `is`: `isActive`, `isLoading`

### i18n Keys
- Format: `section.key` (dot notation)
- Examples:
  - `hero.title`
  - `gallery.filter.all`
  - `booking.form.clientName`
  
### Styling
- Use **Tailwind semantic colors**: `text-gold`, `bg-background`, `text-textLight`
- Add `rtl:` classes for RTL (Hebrew) support
- Responsive classes: `md:`, `lg:` for breakpoints

### Animations
- All sections use Framer Motion
- Use `whileInView` with `once: true`
- Pattern: `initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}`

## Common Props

### Form Components
```javascript
{
  onSubmit: (formData) => void;
  isLoading?: boolean;
  error?: string | null;
  success?: boolean;
}
```

### Display Components
```javascript
{
  title?: string;
  description?: string;
  items?: Array;
  filter?: string;
}
```

## Hooks Used

- `useState` - Local state management
- `useEffect` - Side effects and lifecycle
- `useTranslation` - i18n support (required on all components)
- `useRef` - DOM references (if needed)

## Translation Keys Pattern

Every component should use translation keys:

```javascript
const { t } = useTranslation();

// Usage
<h2>{t('section.title')}</h2>
<button>{t('section.button')}</button>
```

---

For more information, see the [documentation-writer skill](.github/skills/documentation-writer/SKILL.md).
