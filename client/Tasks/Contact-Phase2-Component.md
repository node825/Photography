# Contact Component - Phase 2: Component Development & Integration

## Phase Overview
**Duration**: ~1.5-2 hours  
**Risk Level**: Medium  
**Dependencies**: Phase 1 completed ✓  
**Status**: ✅ COMPLETED (Nov 17, 2025)

---

## Objectives
1. Create Contact.jsx component with full functionality
2. Implement form validation and state management
3. Integrate EmailJS (with placeholder credentials)
4. Add animations with Framer Motion
5. Integrate component into `client/src/pages/Home.jsx`
6. Add navigation link to `client/src/components/Navbar.jsx`
7. Test in both languages (EN/HE)

---

## Task 1: Create Contact.jsx Component

### File: `client/src/components/Contact.jsx`

### Full Component Code:

```javascript
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

// TODO: Replace with actual EmailJS credentials from https://www.emailjs.com/
const EMAILJS_CONFIG = {
  SERVICE_ID: 'YOUR_SERVICE_ID',
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID',
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY',
};

const Contact = () => {
  const { t } = useTranslation();

  // State management
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errors, setErrors] = useState({});

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Check required fields
    if (!formData.name.trim()) {
      newErrors.name = t('contact.form.validation.required');
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t('contact.form.validation.required');
    }
    if (!formData.email.trim()) {
      newErrors.email = t('contact.form.validation.required');
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t('contact.form.validation.invalidEmail');
    }
    if (!formData.type) {
      newErrors.type = t('contact.form.validation.required');
    }
    if (!formData.message.trim()) {
      newErrors.message = t('contact.form.validation.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous status
    setSubmitStatus(null);

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email via EmailJS
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: formData.name,
          from_phone: formData.phone,
          from_email: formData.email,
          inquiry_type: formData.type,
          message: formData.message,
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      // Success
      setSubmitStatus('success');
      // Clear form
      setFormData({
        name: '',
        phone: '',
        email: '',
        type: '',
        message: '',
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="contact" className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Section Title */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-heading text-primary text-center mb-4"
          >
            {t('contact.title')}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-center text-primary/80 mb-12 text-lg"
          >
            {t('contact.subtitle')}
          </motion.p>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Left Column: Contact Information */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-heading text-primary mb-6">
                {t('contact.photographerName')}
              </h3>

              {/* Phone */}
              <motion.a
                href="tel:050-123-4567"
                className="flex items-center gap-4 text-primary hover:text-accent transition-colors group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-6 h-6 text-accent" />
                <div>
                  <p className="text-sm text-primary/60">{t('contact.info.phone')}</p>
                  <p className="text-lg group-hover:underline">050-123-4567</p>
                </div>
              </motion.a>

              {/* Email */}
              <motion.a
                href="mailto:info@kidsphotos.com"
                className="flex items-center gap-4 text-primary hover:text-accent transition-colors group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-6 h-6 text-accent" />
                <div>
                  <p className="text-sm text-primary/60">{t('contact.info.email')}</p>
                  <p className="text-lg group-hover:underline">info@kidsphotos.com</p>
                </div>
              </motion.a>
            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-primary mb-2"
                  >
                    {t('contact.form.name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('contact.form.placeholders.name')}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.name ? 'border-red-500' : 'border-primary/20'
                    } bg-white focus:outline-none focus:ring-2 focus:ring-accent transition-all`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-primary mb-2"
                  >
                    {t('contact.form.phone')} *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('contact.form.placeholders.phone')}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.phone ? 'border-red-500' : 'border-primary/20'
                    } bg-white focus:outline-none focus:ring-2 focus:ring-accent transition-all`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-primary mb-2"
                  >
                    {t('contact.form.email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('contact.form.placeholders.email')}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-primary/20'
                    } bg-white focus:outline-none focus:ring-2 focus:ring-accent transition-all`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Inquiry Type */}
                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-primary mb-2"
                  >
                    {t('contact.form.type')} *
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.type ? 'border-red-500' : 'border-primary/20'
                    } bg-white focus:outline-none focus:ring-2 focus:ring-accent transition-all`}
                  >
                    <option value="">
                      {t('contact.form.placeholders.selectType')}
                    </option>
                    <option value="general">
                      {t('contact.form.types.general')}
                    </option>
                    <option value="pricing">
                      {t('contact.form.types.pricing')}
                    </option>
                    <option value="booking">
                      {t('contact.form.types.booking')}
                    </option>
                    <option value="other">{t('contact.form.types.other')}</option>
                  </select>
                  {errors.type && (
                    <p className="text-red-500 text-sm mt-1">{errors.type}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-primary mb-2"
                  >
                    {t('contact.form.message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact.form.placeholders.message')}
                    rows="4"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.message ? 'border-red-500' : 'border-primary/20'
                    } bg-white focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  className={`w-full py-3 px-6 rounded-lg font-medium text-white ${
                    isSubmitting
                      ? 'bg-accent/60 cursor-not-allowed'
                      : 'bg-accent hover:bg-accent/90'
                  } transition-colors flex items-center justify-center gap-2`}
                >
                  {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
                  {isSubmitting
                    ? t('contact.form.sending')
                    : t('contact.form.submit')}
                </motion.button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
                  >
                    {t('contact.form.success')}
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
                  >
                    {t('contact.form.error')}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
```

### Key Features Implemented:
- ✅ Full state management with validation
- ✅ Email regex validation
- ✅ Real-time error clearing on input
- ✅ Loading state with spinner
- ✅ Success/Error feedback
- ✅ Form reset on success
- ✅ Framer Motion animations
- ✅ RTL/LTR compatible
- ✅ Accessible (labels, htmlFor, focus states)
- ✅ All text from translations

---

## Task 2: Add Contact to `client/src/pages/Home.jsx`

### Action:
Import Contact component and add it before Footer:

```javascript
import Contact from '../components/Contact';

// Inside the component:
<Hero />
<Contact />
<Footer />
```

---

## Task 3: Add Contact Link to Navbar

### File: `client/src/components/Navbar.jsx`

Add navigation link to `#contact` using `t('nav.contact')`.

**Note**: The translation key `nav.contact` already exists:
- EN: "Contact"
- HE: "צור קשר"

---

## Task 4: Testing Checklist

### Functional Testing:
- [ ] Component renders without errors
- [ ] All form fields display correctly
- [ ] Validation works (required fields)
- [ ] Email validation rejects invalid emails
- [ ] Phone/Email links are clickable
- [ ] Submit button shows loading state
- [ ] Form clears on successful submission
- [ ] Error messages display correctly

### Visual Testing:
- [ ] Responsive on mobile (320px+)
- [ ] Responsive on tablet (768px+)
- [ ] Responsive on desktop (1024px+)
- [ ] Icons display correctly
- [ ] Form inputs have proper spacing
- [ ] Hover effects work on links and button
- [ ] Animations are smooth

### Bilingual Testing:
- [ ] Switch to Hebrew - text changes
- [ ] Hebrew layout is RTL
- [ ] All placeholders in Hebrew
- [ ] All labels in Hebrew
- [ ] Error messages in Hebrew
- [ ] Success/Error messages in Hebrew
- [ ] Switch back to English - everything reverts

### Navigation Testing:
- [ ] Navbar has Contact link
- [ ] Clicking Contact link scrolls to section
- [ ] Smooth scroll behavior works
- [ ] Section ID is "contact"

### Accessibility Testing:
- [ ] All inputs have labels
- [ ] Labels have `htmlFor` attributes
- [ ] Tab navigation works through form
- [ ] Focus states visible
- [ ] Error messages associated with inputs

---

## Known Limitations (By Design)

- EmailJS credentials are placeholders (TODO comments)
- Contact info (name, phone, email) is hardcoded
- No form data persistence (intentional)
- No backend storage (uses EmailJS only)

---

## Post-Implementation: EmailJS Setup (Optional)

When ready to configure real email sending:

1. Create account at https://www.emailjs.com/
2. Create Email Service (Gmail, Outlook, etc.)
3. Create Email Template with variables:
   - `{{from_name}}`
   - `{{from_phone}}`
   - `{{from_email}}`
   - `{{inquiry_type}}`
   - `{{message}}`
4. Get credentials:
   - Service ID
   - Template ID
   - Public Key
5. Update `EMAILJS_CONFIG` in Contact.jsx
6. Test form submission

---

## Verification Checklist

After completing Phase 2:

- [ ] `client/src/components/Contact.jsx` created
- [ ] Contact component imported in `client/src/pages/Home.jsx`
- [ ] Contact link added to `client/src/components/Navbar.jsx`
- [ ] Component renders on home page
- [ ] All functionality works as specified
- [ ] Both languages tested
- [ ] Responsive design verified
- [ ] Animations working
- [ ] No console errors
- [ ] No hardcoded strings (all from translations)

---

## Completion

✅ Phase 2 Complete when all checklist items pass.

🎉 Contact Component fully integrated and functional!
