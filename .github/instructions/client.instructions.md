---
description: "Use when creating or editing React frontend code in client/ — components, hooks, pages, Tailwind styling, Framer Motion animations, i18n translation keys, RTL/LTR layouts, or the axios API client."
applyTo: "client/**"
---

# Client (React 19 + Vite 7) Instructions

## Module & File Rules

- ES modules only (`import` / `export`). Never `require`.
- One component per file at `client/src/components/<ComponentName>.jsx`. PascalCase filename matching the component.
- Page composition belongs in `client/src/pages/Home.jsx` — do not add sections directly to `App.jsx`.
- All identifiers, comments, and filenames in English. Hebrew belongs only in `locales/he/translation.json` and the existing `assets/gallery/<Hebrew category>/` folder names.

## Component Shape

Always an arrow function assigned to a `const`, with a default export. Never `export default function` or named component exports.

```jsx
const SectionName = () => {
  const [formData, setFormData] = useState({ email: '' });
  const { t, i18n } = useTranslation();

  useEffect(() => { /* ... */ }, []);

  const containerVariants = { /* ... */ };

  return <motion.section>{/* ... */}</motion.section>;
};

export default SectionName;
```

Order inside the body: `useState` calls → `useTranslation()` → `useEffect` → variants/handlers/constants → JSX.

## Translations (never hardcode UI text)

- Every user-facing string goes through `t()`. Add the identical key to **both** `client/src/i18n/locales/he/translation.json` and `client/src/i18n/locales/en/translation.json` in the same edit.
- Keys are nested, camelCase, section-first: `t('booking.form.validation.invalidEmail')`, `t('nav.home')`. Top-level sections: `nav`, `hero`, `gallery`, `booking`, `contact`, `footer`.
- Hebrew is the default (`lng: 'he'`), English is the fallback. Direction is set globally in `App.jsx`; do not set `dir` on individual components.
- Use direction-neutral Tailwind utilities (`ms-*`, `me-*`, `ps-*`, `pe-*`, `text-start`, `text-end`, flex `gap-*`) instead of `ml-*`/`mr-*`/`text-left`/`text-right` so RTL and LTR both work. Verify both languages after any layout change.

## Styling

- Tailwind utility classes only. Do not create per-component CSS files or classes; global styles live in `index.css`.
- Use the theme tokens from [client/tailwind.config.js](client/tailwind.config.js) — never raw hex values:
  - Colors: `primary` `secondary` `accent` `accentDark` `blue` `blueDark` `background` `lightPink` `mediumPink` `lightGray` `mediumGray` `darkGray` `textDark` `textLight`
  - Fonts: `font-sans` (body), `font-heading` (headings)
- Dark theme is the baseline (`bg-background` = `#0F0F0F`, `text-textDark`). Do not introduce light-theme colors.
- `style={{ ... }}` is reserved for dynamic values (computed pixel positions, CSS variables).
- Mobile-first responsive: base classes then `md:` / `lg:` overrides.

## Framer Motion

- Declare `variants` objects at the top of the component body, above the JSX.
- Entrance animations use the scroll pattern; interactions use hover/tap:

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```

```jsx
<motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
```

- Use `motion.*` elements for anything animated; keep plain elements when static.

## Forms

- Single `formData` state object plus a separate `errors` object keyed by field name.
- Validate in a `validateForm()` that returns a boolean and writes error messages via `t(...)`; clear a field's error inside `handleChange`.
- Async submit: set `isSubmitting` true, `try` / `catch` / `finally`, disable the submit button while submitting, and render error text with `text-red-400`.

## API & Environment

- Backend calls go through the exported objects in [client/src/utils/api.js](client/src/utils/api.js) (e.g. `bookingAPI`). Never call `axios`/`fetch` directly from a component.
- New endpoints are added as methods on the existing exported API object, `async`, returning `response.data`.
- `Contact.jsx` intentionally bypasses the API and sends via EmailJS — keep that path.
- Browser-visible env vars must be prefixed `VITE_` and read with `import.meta.env.VITE_*`, always with a sensible fallback. Document new vars in `client/.env.example`; never commit secrets.

## Assets

- Gallery images are referenced as string paths (`'/src/assets/gallery/<category>/<file>.jpg'`) or `new URL('../assets/...', import.meta.url).href`. Do not add ESM `import` statements for gallery images.
- Adding an image requires updating the `galleryData` map in [client/src/components/Gallery.jsx](client/src/components/Gallery.jsx).
- Every `<img>` needs a meaningful `alt`; icon-only buttons and links need `aria-label` sourced from `t()`.

## Validation

After changing anything in `client/`:

```powershell
cd client
npm run lint
npm run build
```

`react-router-dom` is installed but unwired — do not introduce routing unless explicitly asked. `Gallery.example.jsx` is a reference file, not live code.

## Documentation

When you add or change a component, hook, or utility, update `doc/react/<ComponentName>/README.md` (or `doc/features/<featureName>.md`) in the same change.
