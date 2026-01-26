---
name: react-component
description: 'Create new React components for the client-side application. Use when asked to "create a component", "add a new section", "build a React component", "scaffold a component", or when adding UI elements to the photography website. Generates components with Framer Motion animations, i18n translations, Tailwind styling, and proper project conventions.'
---

# React Component Generator

A skill for creating new React components in the Kids Photography Website client application. This skill ensures all components follow project conventions including bilingual support, Framer Motion animations, and Tailwind CSS v4 styling.

## When to Use This Skill

- User asks to "create a component", "add a new section", or "build a component"
- User wants to add a new UI element to the photography website
- User needs a reusable component with animations and translations
- User asks to scaffold a React component following project patterns

## Prerequisites

- Understanding of what the component should accomplish
- Component name in PascalCase (e.g., `Testimonials`, `PricingCard`)
- Knowledge of whether it's a section component or a reusable UI component

## Component Creation Workflow

### Step 1: Determine Component Type

| Type | Location | Purpose |
|------|----------|---------|
| **Section** | `client/src/components/` | Full-page sections (Hero, Gallery, Contact) |
| **UI Component** | `client/src/components/` | Reusable elements (buttons, cards, modals) |
| **Page** | `client/src/pages/` | Route-level components (only Home.jsx exists) |

### Step 2: Create Component File

Create file at `client/src/components/ComponentName.jsx`:

```jsx
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function ComponentName() {
  const { t } = useTranslation();

  return (
    <motion.section
      id="component-anchor"
      className="py-20 bg-background"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading text-primary text-center mb-8">
          {t('componentName.title')}
        </h2>
        {/* Component content */}
      </div>
    </motion.section>
  );
}
```

### Step 3: Add Translations

Add keys to both translation files:

**`client/src/i18n/locales/en/translation.json`:**
```json
{
  "componentName": {
    "title": "English Title",
    "description": "English description text"
  }
}
```

**`client/src/i18n/locales/he/translation.json`:**
```json
{
  "componentName": {
    "title": "Hebrew Title",
    "description": "Hebrew description text"
  }
}
```

### Step 4: Register in Home.jsx (For Section Components)

Import and add to `client/src/pages/Home.jsx`:

```jsx
import ComponentName from '../components/ComponentName';

export default function Home() {
  return (
    <main>
      {/* Existing sections */}
      <ComponentName />
      {/* More sections */}
    </main>
  );
}
```

### Step 5: Add Navigation Link (Optional)

If the section needs a nav link, update `Navbar.jsx`:

```jsx
const navLinks = [
  // ... existing links
  { href: '#component-anchor', label: t('nav.componentName') }
];
```

## Component Templates

### Section Component Template

Full-width section with animation and translations:

```jsx
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function SectionName() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section
      id="section-anchor"
      className="py-20 bg-background"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-heading text-primary text-center mb-12"
          variants={itemVariants}
        >
          {t('sectionName.title')}
        </motion.h2>
        
        <motion.p 
          className="text-textLight text-center max-w-2xl mx-auto"
          variants={itemVariants}
        >
          {t('sectionName.description')}
        </motion.p>
      </div>
    </motion.section>
  );
}
```

### Card Component Template

Reusable card with hover effects:

```jsx
import { motion } from 'framer-motion';

export default function Card({ title, description, icon: Icon, onClick }) {
  return (
    <motion.div
      className="bg-background/50 border border-primary/20 rounded-lg p-6 cursor-pointer"
      whileHover={{ scale: 1.02, borderColor: 'rgba(212, 175, 55, 0.5)' }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {Icon && (
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      )}
      <h3 className="text-xl font-heading text-primary mb-2">{title}</h3>
      <p className="text-textLight">{description}</p>
    </motion.div>
  );
}
```

### Form Component Template

Form with validation and loading state:

```jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function FormComponent({ onSubmit }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ field1: '', field2: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.field1.trim()) {
      newErrors.field1 = t('form.errors.required');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div>
        <label className="block text-textLight mb-2">
          {t('form.field1Label')}
        </label>
        <input
          type="text"
          value={formData.field1}
          onChange={(e) => setFormData({ ...formData, field1: e.target.value })}
          className="w-full px-4 py-2 bg-background border border-primary/30 rounded-lg 
                     text-textLight focus:border-primary focus:outline-none transition-colors"
        />
        {errors.field1 && (
          <p className="text-red-400 text-sm mt-1">{errors.field1}</p>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-primary text-background font-semibold rounded-lg
                   hover:bg-primary/90 disabled:opacity-50 transition-colors"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        {isSubmitting ? t('form.submitting') : t('form.submit')}
      </motion.button>
    </motion.form>
  );
}
```

### Modal Component Template

Animated modal with backdrop:

```jsx
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-background border border-primary/30 rounded-xl p-6 
                         max-w-md w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-heading text-primary">{title}</h2>
                <button
                  onClick={onClose}
                  className="text-textLight hover:text-primary transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

## Styling Reference

### Semantic Color Classes

| Class | Usage |
|-------|-------|
| `text-primary` | Gold headings, accent text |
| `text-textLight` | Main body text |
| `text-textDark` | Secondary/muted text |
| `bg-background` | Dark background |
| `border-primary/30` | Subtle gold borders |

### Common Utility Patterns

```jsx
// Container with responsive padding
<div className="container mx-auto px-4 md:px-6 lg:px-8">

// Responsive text sizing
<h2 className="text-2xl md:text-3xl lg:text-4xl">

// Flex with RTL support (automatic via dir attribute)
<div className="flex items-center gap-4">

// Grid layouts
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

### Animation Presets

```jsx
// Fade up on scroll
const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Stagger children
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// Scale on hover
<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
```

## Critical Rules

1. **NO Hebrew text in code** - All code, comments, variable names must be in English
2. **NO emojis in files** - Do not use emojis anywhere
3. **All UI strings via i18n** - Use `t('key')` for all user-facing text
4. **Use semantic colors** - Never use raw hex values like `#D4AF37` directly
5. **Framer Motion for animations** - Not CSS animations/transitions
6. **Add to Home.jsx** - New section components must be imported and rendered

## Validation Checklist

- [ ] Component file uses PascalCase naming
- [ ] Imports `useTranslation` from 'react-i18next'
- [ ] Uses Framer Motion `motion` components
- [ ] All text uses `t()` translation function
- [ ] Colors use Tailwind semantic classes
- [ ] Translations added to BOTH en and he JSON files
- [ ] Component added to Home.jsx (if section)
- [ ] No Hebrew text in code
- [ ] No emojis in code

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Text not translating | Ensure key exists in both translation.json files |
| Animation not triggering | Check `viewport={{ once: true }}` and initial state |
| RTL layout broken | Use flex/grid gap instead of margin-left/right |
| Colors inconsistent | Use semantic classes from Tailwind config |
| Component not rendering | Verify import and placement in Home.jsx |

## References

- [client.instructions.md](../../instructions/client.instructions.md) - Full client-side conventions
- [reactjs.instructions.md](../../instructions/reactjs.instructions.md) - React best practices
- [Framer Motion Docs](https://www.framer.com/motion/) - Animation reference
- [i18next Docs](https://react.i18next.com/) - Translation reference
