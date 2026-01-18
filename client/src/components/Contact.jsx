import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import GoldenGlitter from './GoldenGlitter';

const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
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
  const [glitterCoords, setGlitterCoords] = useState({ x: 0, y: 0 });
  const [showGlitter, setShowGlitter] = useState(false);

  const handleButtonHover = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlitterCoords({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    setShowGlitter(true);
  };

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
    <section id="contact" className="py-16 px-4 bg-mediumGray/30 relative">
      {showGlitter && <GoldenGlitter x={glitterCoords.x} y={glitterCoords.y} count={10} />}
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
            className="text-4xl md:text-5xl font-heading font-semibold text-primary text-center mb-4"
          >
            {t('contact.title')}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-center text-textDark/80 mb-12 text-lg font-light"
          >
            {t('contact.subtitle')}
          </motion.p>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Left Column: Contact Information */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-heading font-medium text-primary mb-6">
                {t('contact.photographerName')}
              </h3>

              {/* Phone */}
              <motion.a
                href="tel:050-123-4567"
                className="flex items-center gap-4 text-textDark hover:text-primary transition-colors group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-textLight">{t('contact.info.phone')}</p>
                  <p className="text-lg group-hover:underline">050-123-4567</p>
                </div>
              </motion.a>

              {/* Email */}
              <motion.a
                href="mailto:info@kidsphotos.com"
                className="flex items-center gap-4 text-textDark hover:text-primary transition-colors group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-textLight">{t('contact.info.email')}</p>
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
                    className="block text-sm font-normal text-textDark mb-2"
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
                      errors.name ? 'border-red-400' : 'border-primary/20'
                    } bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-normal text-textDark mb-2"
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
                      errors.phone ? 'border-red-400' : 'border-primary/20'
                    } bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all`}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-normal text-textDark mb-2"
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
                      errors.email ? 'border-red-400' : 'border-primary/20'
                    } bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Inquiry Type */}
                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-normal text-textDark mb-2"
                  >
                    {t('contact.form.type')} *
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.type ? 'border-red-400' : 'border-primary/20'
                    } bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all`}
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
                    <p className="text-red-400 text-sm mt-1">{errors.type}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-normal text-textDark mb-2"
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
                      errors.message ? 'border-red-400' : 'border-primary/20'
                    } bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={!isSubmitting ? handleButtonHover : undefined}
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  className={`w-full py-3 px-6 rounded-lg font-bold text-background ${
                    isSubmitting
                      ? 'bg-primary/60 cursor-not-allowed'
                      : 'bg-primary hover:bg-accent'
                  } transition-colors flex items-center justify-center gap-2 btn-shimmer metallic-blur !text-black`}
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
