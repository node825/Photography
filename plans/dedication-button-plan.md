# Plan: Dedication Button for Gallery Photos

## Context

The user wants a new "Dedicate Photo" button that appears when hovering over gallery images. Clicking it opens a modal form where visitors can submit a personal dedication (name + text) for a specific photo. The form sends the dedication via EmailJS, following the same pattern as the existing Contact form.

Currently, gallery images have hover effects (scale, overlay, golden border) but **no click interaction** and **no modal component** exists in the project.

## Files to Modify

1. **[Gallery.jsx](client/src/components/Gallery.jsx)** - Add dedication button to image hover overlay, add modal state management
2. **[translation.json (HE)](client/src/i18n/locales/he/translation.json)** - Add dedication translation keys
3. **[translation.json (EN)](client/src/i18n/locales/en/translation.json)** - Add dedication translation keys

## Files to Create

1. **[DedicationModal.jsx](client/src/components/DedicationModal.jsx)** - New modal component with dedication form

## Implementation Steps

### Step 1: Create DedicationModal.jsx

New component at `client/src/components/DedicationModal.jsx`:

- **Portal-rendered** modal using `createPortal(content, document.body)` to avoid z-index issues
- **AnimatePresence** wrapper for entrance/exit animations
- **Backdrop**: `bg-black/80`, closes modal on click
- **Modal card**: spring animation (scale 0.9 -> 1), golden border, dark background
- **Image preview**: shows the selected photo thumbnail at the top
- **Form fields**:
  - Person's name (text input, required)
  - Dedication message (textarea, required)
- **Submit via EmailJS**: reuse the same `VITE_EMAILJS_SERVICE_ID` and `VITE_EMAILJS_PUBLIC_KEY` env vars; use a new `VITE_EMAILJS_DEDICATION_TEMPLATE_ID` for the template (or fallback to the existing template ID)
- **Keyboard**: close on Escape
- **Body scroll**: disable when modal is open
- **GoldenGlitter** on submit button hover (same pattern as Contact.jsx)
- **Success**: green message, auto-close after 2s
- **Error**: red message, stay open for retry
- **Styling**: match Contact.jsx form patterns (same input classes, validation display, button style)

### Step 2: Add Dedication Button to Gallery.jsx

Modify image cards in Gallery.jsx (lines 150-176):

- Add state: `dedicationModalOpen`, `selectedImage`
- Inside each image's `motion.div` (after the overlay div on line 168), add a button:
  - Positioned `absolute bottom-4 left-1/2 -translate-x-1/2`
  - Hidden by default (`opacity-0`), visible on hover (`group-hover:opacity-100`)
  - On mobile: always visible (`opacity-100 md:opacity-0 md:group-hover:opacity-100`)
  - Heart icon from `lucide-react` + translated label `t('gallery.dedicateButton')`
  - `onClick`: sets `selectedImage` with `{ src, category, index }` and opens modal
  - `e.stopPropagation()` to prevent event bubbling
- Render `<DedicationModal>` once at the end of the section, passing `isOpen`, `onClose`, and `imageData` props

### Step 3: Add Translation Keys

**Hebrew** - add to existing `gallery` object + new `dedication` object:
```json
"gallery": {
  "...existing keys": "",
  "dedicateButton": "הקדש תמונה"
},
"dedication": {
  "title": "הקדשה לתמונה",
  "subtitle": "שתף הקדשה אישית לתמונה הזו",
  "form": {
    "personName": "שם",
    "dedicationText": "הודעת ההקדשה",
    "submit": "שלח הקדשה",
    "sending": "שולח...",
    "success": "ההקדשה נשלחה בהצלחה!",
    "error": "השליחה נכשלה. אנא נסה שוב.",
    "placeholders": {
      "personName": "למי ההקדשה?",
      "dedicationText": "כתוב את ההקדשה שלך כאן..."
    }
  }
}
```

**English** - mirror structure:
```json
"gallery": {
  "...existing keys": "",
  "dedicateButton": "Dedicate Photo"
},
"dedication": {
  "title": "Photo Dedication",
  "subtitle": "Share a personal dedication for this photo",
  "form": {
    "personName": "Name",
    "dedicationText": "Dedication Message",
    "submit": "Send Dedication",
    "sending": "Sending...",
    "success": "Dedication sent successfully!",
    "error": "Failed to send. Please try again.",
    "placeholders": {
      "personName": "Who is this for?",
      "dedicationText": "Write your dedication here..."
    }
  }
}
```

## Reused Patterns & Utilities

- **GoldenGlitter** component (GoldenGlitter.jsx) - button hover sparkle
- **EmailJS config pattern** from Contact.jsx - `import.meta.env.VITE_EMAILJS_*`
- **Form validation pattern** from Contact.jsx - error state + validation messages
- **Existing validation translation**: reuse `contact.form.validation.required` key
- **lucide-react icons** (Heart, X) - already installed, used in Contact.jsx

## No New Dependencies Required

All packages already installed: `framer-motion`, `@emailjs/browser`, `lucide-react`, `react-i18next`.

## Verification

1. Run `cd client && npm run dev` and open the gallery
2. Hover over a gallery image - dedication button should appear at the bottom
3. Click the button - modal should open with the photo preview
4. Test form validation (submit empty form, check error messages)
5. Submit with valid data - EmailJS should send the dedication
6. Test Escape key and backdrop click to close
7. Switch language (EN/HE) - verify all text translates and RTL/LTR layout is correct
8. Test on mobile viewport - button should be visible without hover
