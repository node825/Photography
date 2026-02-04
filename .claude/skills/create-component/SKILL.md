---
name: create-component
description: This skill should be used when scaffolding and generating new React functional components in the client directory. It provides guidance for creating well-structured components that follow project conventions, including proper import statements, hooks usage, Tailwind CSS styling, and i18n integration for bilingual support.
---

# Create Component Skill

## Purpose

Generate new React functional components quickly and consistently for the Kids Photography Website project. This skill ensures all components follow established patterns, maintain code consistency, and integrate properly with the project's tech stack (React 19, Tailwind CSS v4, i18next, Framer Motion, Lucide React icons).

## When to Use This Skill

Use this skill when:
- Creating new functional components for the client application
- Scaffolding components that need Tailwind styling
- Building components that require bilingual (Hebrew/English) support via i18next
- Adding form components with proper state management
- Creating interactive components with Framer Motion animations

## Project Context

**Project Tech Stack:**
- React 19 with Vite
- Tailwind CSS v4 with PostCSS
- i18next for bilingual support (Hebrew RTL/English LTR)
- Framer Motion for animations
- Lucide React for icons
- React Router for navigation

**Component Location:** `client/src/components/`

**Key Conventions:**
- File names use PascalCase (e.g., `BookingForm.jsx`)
- Components are functional components with hooks
- Bilingual text comes from i18n translation files, not hardcoded
- Styling uses Tailwind CSS utility classes
- Icons use Lucide React
- RTL/LTR is handled automatically by the app based on language selection

## How to Create a Component

### Step 1: Determine Component Requirements

Identify what the component needs:
- Is it a presentational component or does it manage state?
- Does it need bilingual text? (almost always yes for user-facing components)
- Will it use animations or transitions?
- What styling approach best fits this component?

### Step 2: Create the Component File

Create a new `.jsx` file in `client/src/components/` with PascalCase naming.

Use the appropriate template from `assets/templates/` based on component type:
- **FunctionalComponent.jsx** - Basic functional component with hooks
- **FormComponent.jsx** - Component with form state and handling
- **AnimatedComponent.jsx** - Component with Framer Motion animations
- **BilingualComponent.jsx** - Component with full i18n integration

### Step 3: Add Translation Strings (if bilingual)

For any user-facing text:
1. Add English strings to `client/src/i18n/locales/en/translation.json`
2. Add Hebrew strings to `client/src/i18n/locales/he/translation.json`
3. Use the same keys in both files
4. Reference via `useTranslation()` hook in the component

### Step 4: Style with Tailwind

- Use Tailwind CSS utility classes for all styling
- Leverage responsive design with breakpoints (sm:, md:, lg:, xl:)
- Use consistent spacing and color tokens from Tailwind
- For animations, use Framer Motion instead of CSS animations for better control

### Step 5: Import and Use Icons (if needed)

- Import from `lucide-react`
- Example: `import { Menu, X, ChevronDown } from 'lucide-react'`
- Use appropriate icon sizes and colors

### Step 6: Export the Component

Export as default export:
```javascript
export default ComponentName;
```

Then import it in the parent component or page where needed.

## Common Patterns

### Using i18n in Components

```javascript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  return <div>{t('key.path')}</div>;
}
```

### Styling with Tailwind

```javascript
<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
  {t('buttons.submit')}
</button>
```

### Adding Animations with Framer Motion

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

### Using Lucide Icons

```javascript
import { Heart, MapPin, Calendar } from 'lucide-react';

<Heart className="w-6 h-6 text-red-500" />
```

## File Organization

After creating a component, verify:
- Component file exists at `client/src/components/ComponentName.jsx`
- Translation keys are added to both translation.json files (en and he)
- Component is imported where needed
- All dependencies (hooks, icons, motion) are properly imported
- Component follows naming and style conventions

## Code Standards (Required)

- All code, variable names, function names must be in English
- All comments and documentation must be in English
- No Hebrew text in code files
- No emojis in code
