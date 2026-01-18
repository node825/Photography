# GitHub Copilot Prompt: Contact Component

## File Location
`client/src/components/Contact.jsx`

## Component Overview
Create a bilingual (Hebrew RTL/English LTR) Contact component for a kids photography website that displays contact information and a form that sends emails via EmailJS.

---

## Layout Structure

### Desktop (2 columns)
- **Left Column**: Contact information (static display)
- **Right Column**: Contact form (interactive)

### Mobile (1 column - stacked)
- Contact info on top
- Form below

---

## Section 1: Contact Information (Static)

Display the following with icons from `lucide-react`:

- **Photographer Name**: "Sarah Cohen" (use `font-heading` class)
- **Phone**: "050-123-4567" 
  - Icon: `Phone` from lucide-react
  - Wrapped in `<a href="tel:050-123-4567">` for click-to-call
- **Email**: "info@kidsphotos.com"
  - Icon: `Mail` from lucide-react
  - Wrapped in `<a href="mailto:info@kidsphotos.com">`

**Styling Requirements:**
- Icons should be `text-accent` color
- Links should have hover effects
- Vertical spacing between items

---

## Section 2: Contact Form

### Form Fields

1. **Full Name*** 
   - Input type: text
   - Required field
   - Placeholder via translation key

2. **Phone***
   - Input type: tel
   - Required field
   - Placeholder via translation key

3. **Email***
   - Input type: email
   - Required field
   - Email format validation
   - Placeholder via translation key

4. **Inquiry Type*** (Dropdown/Select)
   - Required field
   - Options:
     - General Question
     - Pricing Inquiry
     - Book a Session
     - Other
   - All options from translation keys

5. **Message*** (Textarea)
   - Required field
   - Minimum 4 rows
   - Placeholder via translation key

### Form Behavior

**Client-Side Validation:**
- Check all required fields are filled
- Validate email format using regex
- Show error messages in current language
- Prevent submission if validation fails

**EmailJS Integration:**
```javascript
// TODO: Replace with actual EmailJS credentials
const SERVICE_ID = 'YOUR_SERVICE_ID';
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

// Use emailjs.send() to send form data
// Handle success/error responses
```

**Submit Button:**
- Text from translation key: `contact.form.submit`
- Show loading state during submission (disable button, show spinner)
- Use Framer Motion: `whileHover={{ scale: 1.05 }}`, `whileTap={{ scale: 0.95 }}`

**User Feedback:**
- Success: Show success message from `contact.form.success`
- Error: Show error message from `contact.form.error`
- Clear form on successful submission

---

## Styling Guidelines

### Tailwind Classes to Use:
- Background: `bg-background`
- Text: `text-primary` for main text, `text-accent` for highlights
- Fonts: `font-heading` for titles, `font-sans` for body text
- Grid: `grid grid-cols-1 md:grid-cols-2 gap-8`
- Padding: `py-16 px-4` for section
- Form inputs: Consistent styling with borders, focus states, proper padding

### RTL/LTR Support:
- Component must work in both directions
- Use logical properties where possible
- Test that icons and layout flip correctly in RTL

---

## Framer Motion Animations

### Section Animation:
```javascript
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
```

### Staggered Children:
- Title: `delay: 0.2`
- Subtitle: `delay: 0.3`
- Contact Info: `delay: 0.4`
- Form: `delay: 0.5`

### Interactive Elements:
- All buttons and links: `whileHover={{ scale: 1.05 }}`, `whileTap={{ scale: 0.95 }}`

---

## i18n Integration

### Import:
```javascript
import { useTranslation } from 'react-i18next';
```

### Usage:
```javascript
const { t } = useTranslation();
```

### Translation Keys Structure:

```json
{
  "contact": {
    "title": "Contact Us",
    "subtitle": "We'd love to hear from you",
    "info": {
      "phone": "Phone",
      "email": "Email"
    },
    "form": {
      "name": "Full Name",
      "phone": "Phone",
      "email": "Email",
      "type": "Inquiry Type",
      "message": "Message",
      "submit": "Send Message",
      "types": {
        "general": "General Question",
        "pricing": "Pricing Inquiry",
        "booking": "Book a Session",
        "other": "Other"
      },
      "placeholders": {
        "name": "Enter your full name",
        "phone": "Enter your phone number",
        "email": "Enter your email address",
        "message": "Tell us what you'd like to know..."
      },
      "validation": {
        "required": "This field is required",
        "invalidEmail": "Please enter a valid email address"
      },
      "success": "Message sent successfully! We'll get back to you soon.",
      "error": "Failed to send message. Please try again or contact us directly."
    }
  }
}
```

**IMPORTANT:** Create both English (en) and Hebrew (he) translation files with these keys.

---

## Dependencies

Make sure these are installed:
- `framer-motion`
- `lucide-react`
- `react-i18next`
- `emailjs-com` or `@emailjs/browser`

---

## Code Requirements

1. **Functional Component** with React Hooks
2. **State Management:**
   - Form data state (object with all fields)
   - Loading state (boolean)
   - Error state (string or null)
3. **Event Handlers:**
   - `handleChange` for input updates
   - `handleSubmit` for form submission
   - Validation function
4. **Accessibility:**
   - Proper `<label>` for each input
   - `htmlFor` attributes
   - `aria-label` for icon-only buttons
   - Focus states on inputs
5. **Error Handling:**
   - Try-catch around EmailJS call
   - Display user-friendly error messages
6. **Comments:**
   - Add TODO comments for EmailJS configuration
   - Document validation logic

---

## Testing Checklist

After implementation, verify:
- ✅ Layout responsive on mobile/tablet/desktop
- ✅ RTL (Hebrew) and LTR (English) both work correctly
- ✅ All form validations work
- ✅ Links (tel:, mailto:) are clickable
- ✅ Animations smooth and not janky
- ✅ Form clears after successful submission
- ✅ Error messages display correctly
- ✅ All text comes from translation files (no hardcoded strings)

---

## Example Component Structure

```javascript
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Phone, Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const { t } = useTranslation();
  
  // State management here
  
  // Handlers here
  
  return (
    <section id="contact" className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Title and subtitle */}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Left: Contact Info */}
            <div>
              {/* Contact details with icons */}
            </div>
            
            {/* Right: Contact Form */}
            <div>
              <form onSubmit={handleSubmit}>
                {/* Form fields */}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
```

---

## Next Steps After Component Creation

1. Add `Contact` component to `client/src/pages/Home.jsx`
2. Add navigation link in `client/src/components/Navbar.jsx` pointing to `#contact`
3. Create translation files in both `client/src/i18n/locales/en/translation.json` and `client/src/i18n/locales/he/translation.json`
4. Test in both languages
5. Configure EmailJS account and replace placeholder credentials