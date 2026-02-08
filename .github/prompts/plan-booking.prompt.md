## Plan: Booking Component with Date Selection

**TL;DR:** Create a `Booking.jsx` component mirroring the established `Contact.jsx` pattern with:
- Form fields for client info + session type selection + date picker
- Simple HTML5 date input (native browser picker, mobile-friendly)
- Success modal displaying booking confirmation
- Integration with existing `bookingAPI.createBooking()` backend
- Framer Motion scroll animations + Tailwind gold-on-dark styling
- Hebrew/English i18n translations (already defined)
- Full validation before submission + error states

**Architecture:** Anchor-linked section in Home.jsx (like Gallery, Contact), positioned after Gallery. No new backend changes needed—all API routes, MongoDB model, and validation already exist.

---

## Steps

### Phase 1: Component Creation

1. **Create [client/src/components/Booking.jsx](client/src/components/Booking.jsx)**
   - State: `formData` (name, phone, email, sessionType, preferredDate, notes), `isSubmitting`, `submitStatus`, `errors`
   - Form fields: text input (name), tel input (phone), email input, select dropdown (sessionType), date input, textarea (notes)
   - Validation: Client-side before submit - required fields, email regex, date must be future
   - Event handlers: `handleChange()`, `handleSubmit()`
   - API call: `await bookingAPI.createBooking(formData)` on submit
   - Success modal: Shows booking confirmation summary with client name + session type + date
   - Styling: Tailwind semantic colors (text-primary, bg-background, border-primary on focus)
   
2. **Add Framer Motion animations** to entire component:
   - Section container: `initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}`
   - Form fields: staggered reveal animation (0.1s delay between each)
   - Button: `whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}`
   - Success modal: fade-in + scale animation on mount

3. **Error handling & UX:**
   - Clear errors when user edits a field
   - Show field-level error messages in red (color: `text-red-400`)
   - Disable submit button while `isSubmitting === true`
   - Button text changes to "Sending..." (i18n key: `booking.form.sending`)
   - Toast-style feedback: After success, reset form + keep modal visible for 3 seconds

### Phase 2: Home.jsx Integration

4. **Update [client/src/pages/Home.jsx](client/src/pages/Home.jsx)**
   - Import `Booking` component
   - Render `<Booking id="booking" />` between Gallery and Contact sections
   - Navbar already references `#booking` anchor, so no changes needed there

### Phase 3: Internationalization

5. **Verify translation keys** in [client/src/i18n/locales/he/translation.json](client/src/i18n/locales/he/translation.json) and [client/src/i18n/locales/en/translation.json](client/src/i18n/locales/en/translation.json)
   - Keys required: `booking.title`, `booking.form.*`, `booking.sessionTypes.*`, `booking.success`, `booking.error`
   - Already defined in codebase (confirmed by subagent research)

### Phase 4: Verification & Testing

---

## Verification

**Manual Testing Checklist:**
1. ✅ Component renders in section #booking visible in Navbar scroll
2. ✅ Form fields: name, phone, email, session type dropdown, date picker, notes textarea all display correctly
3. ✅ Validation triggers on submit:
   - Empty required fields show error messages
   - Invalid email shows error
   - Past dates rejected by HTML5 input (`min` attribute = today)
4. ✅ Success flow:
   - Submit valid form → button shows "Sending..."
   - API responds → success modal appears with booking summary
   - Close modal → form clears, ready for new booking
5. ✅ Mobile: Date picker opens native calendar on mobile, responsive layout on all screen sizes
6. ✅ Bilingual: Toggle language in Navbar, all labels + placeholders + error messages switch Hebrew ↔ English
7. ✅ API workflow: Open browser DevTools → Network tab → POST to `/api/bookings` succeeds + returns 201
8. ✅ Accessibility: Form labels linked to inputs, ARIA labels on modal close button

**Via Browser DevTools:**
```
POST http://localhost:5000/api/bookings
Body: { clientName, phone, email, sessionType, preferredDate, notes }
Response: 201 { _id, createdAt, status: "pending" }
```

---

## Decisions

- **Date picker:** HTML5 `<input type="date">` instead of react-big-calendar for simplicity + native mobile experience
- **Confirmation UX:** Success modal (vs toast) because booking is significant transaction deserving prominent feedback
- **Form layout:** Single-column on mobile, two-column on desktop (matching Contact.jsx pattern)
- **API pattern:** Use existing `bookingAPI.createBooking()` (not EmailJS—backend manages email delivery)
- **Validation:** Client-side pre-flight + server-side enforcement (backend validates again)
- **Session types:** Use predefined enums (newborn/toddler/kids/family) from backend model—no custom input
