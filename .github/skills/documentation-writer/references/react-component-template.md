# React Component Documentation Template

Copy this template for documenting new React components.

---

## Component Name

**Type**: Section | UI Component  
**Location**: `client/src/components/ComponentName.jsx`  
**Purpose**: [Brief description of what the component does]

### Overview

[Detailed description of the component's purpose, functionality, and how it fits into the application]

### Props Interface

```typescript
interface ComponentNameProps {
  prop1?: string;        // Optional - Description
  prop2: number;         // Required - Description
  onEvent?: function;    // Optional callback
}
```

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| prop1 | string | No | undefined | What it controls |
| prop2 | number | Yes | — | What it controls |
| onEvent | function | No | undefined | Called when [action] |

### i18n Keys

All text strings are internationalized using `react-i18next`.

**Translation Keys Used**:

```javascript
const translationKeys = [
  'section.heading',
  'section.description',
  'button.label',
  // Include all keys used in component
];
```

**Hebrew Translations** (`client/src/i18n/locales/he/translation.json`):

```json
{
  "section": {
    "heading": "כותרת בעברית",
    "description": "תיאור בעברית"
  }
}
```

**English Translations** (`client/src/i18n/locales/en/translation.json`):

```json
{
  "section": {
    "heading": "English Heading",
    "description": "English Description"
  }
}
```

### Styling

**Framework**: Tailwind CSS v4

**Theme Colors** (from `tailwind.config.js`):
- `bg-background` - Dark background (#0F0F0F)
- `text-primary` / `text-gold` - Gold heading color (#D4AF37)
- `text-textLight` - Main text color
- `text-textDark` - Secondary text color
- `text-accent` - Accent color (#DAA520)

**Tailwind Classes Used**:
- Spacing: [px, py, mb, mt, etc.]
- Typography: [text-size, font-weight, font-family]
- Colors: [text-gold, bg-background, etc.]
- Responsive: [md:, lg:, rtl: for RTL support]

**CSS Classes** (if custom CSS needed):
- Class name: [What it styles]

### Animations (Framer Motion)

**Library**: framer-motion

**Animation Pattern**:

```jsx
<motion.section
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  {children}
</motion.section>
```

**Animations in Component**:
1. **On Mount**: [Animation type and effect]
2. **On Scroll View**: [whileInView animation]
3. **On Hover**: [whileHover animation if applicable]
4. **Interaction**: [Click, form submit, etc.]

### Critical Sections

#### Section 1: [Name]
- [Key functionality]
- [State management if applicable]
- [User interactions]

#### Section 2: [Name]
- [Key functionality]
- [State management if applicable]
- [User interactions]

### State Management

**Local State**:
```javascript
const [stateVar, setStateVar] = useState(initialValue);
// [Description of state]
```

**Hooks Used**:
- `useState` - [For what]
- `useEffect` - [For what]
- `useTranslation` - [i18n support]

**No Global State**: Component uses only local state and props (not Redux/Context)

### Integration in Home.jsx

**Anchor ID**: `#component-name-anchor` (for navigation)

**Import**:
```javascript
import ComponentName from './components/ComponentName';
```

**Usage in Home.jsx**:
```jsx
<ComponentName 
  prop1="value"
  prop2={42}
  onEvent={handleEvent}
/>
```

**Note**: All new components must be imported and rendered in `client/src/pages/Home.jsx`

### Code Examples

#### Basic Usage

```jsx
import ComponentName from './components/ComponentName';

export default function MyPage() {
  const handleEvent = (data) => {
    console.log('Event triggered:', data);
  };

  return (
    <div>
      <ComponentName 
        prop1="example"
        prop2={123}
        onEvent={handleEvent}
      />
    </div>
  );
}
```

#### With Translation and Styling

```jsx
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function ComponentName({ prop1, prop2 }) {
  const { t } = useTranslation();

  return (
    <motion.section
      className="py-20 bg-background"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold text-gold mb-4">
        {t('section.heading')}
      </h2>
      <p className="text-textLight">
        {t('section.description')}
      </p>
    </motion.section>
  );
}
```

### Dependencies

**Component Dependencies** (other components used inside):
- [ComponentName](./ComponentName.md) - [Why used]

**Hook Dependencies**:
- `react-i18next` - Bilingual UI
- `framer-motion` - Animations
- `lucide-react` - Icons (if applicable)

**API Endpoints** (if calling server):
- [GET /api/endpoint](#) - [What data it gets]
- [POST /api/endpoint](#) - [What data it sends]

**Related Sections**:
- [Related component](./RelatedComponent.md)
- [Other section](#anchor)

### Responsive Design

**Breakpoints** (Tailwind):
- Mobile: base
- Tablet: `md:` (768px)
- Desktop: `lg:` (1024px)
- RTL: `rtl:` (automatic when Hebrew is active)

**Responsive Strategy**:
- Mobile: [Layout style]
- Tablet: [Layout style with `md:`]
- Desktop: [Layout style with `lg:`]

### Accessibility

**ARIA Labels** (if applicable):
- [What they describe]

**Keyboard Navigation**:
- Tab order: [Is it logical]
- Focus styles: [Visible feedback]

**Semantic HTML**:
- [Using `<button>`, `<nav>`, `<section>`, etc.]

### Testing Checklist

- [ ] Component renders correctly
- [ ] Props validation works
- [ ] Translations appear in Hebrew and English
- [ ] Tailwind styling looks correct
- [ ] Framer Motion animations smooth
- [ ] Responsive on mobile/tablet/desktop
- [ ] RTL layout correct in Hebrew
- [ ] Form inputs (if any) validate
- [ ] API calls (if any) working
- [ ] Error states handled
- [ ] Loading states show correctly

### Performance Considerations

- Component uses `whileInView` with `once: true` to animate only on first scroll view
- No unnecessary re-renders from props or state changes
- Images are optimized (if component displays images)
- Animations use Framer Motion best practices

### Notes

- [Any special considerations]
- [Edge cases to be aware of]
- [Browser compatibility notes]
- [Performance optimizations used]

### Version History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2025-02-08 | Initial documentation |

---

**Last updated**: 2025-02-08
**Documented by**: [Your name]
**Component file**: [Link to actual component file]
