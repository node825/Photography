import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, Users, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import GoldenGlitter from './GoldenGlitter';

const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

const BookingForm = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    sessionType: '',
    preferredDate: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    const newErrors = {};
    if (!formData.clientName.trim()) {
      newErrors.clientName = t('booking.form.validation.required');
    }
    if (!formData.email.trim()) {
      newErrors.email = t('booking.form.validation.required');
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t('booking.form.validation.invalidEmail');
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t('booking.form.validation.required');
    }
    if (!formData.sessionType) {
      newErrors.sessionType = t('booking.form.validation.required');
    }
    if (!formData.preferredDate) {
      newErrors.preferredDate = t('booking.form.validation.required');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          client_name: formData.clientName,
          client_email: formData.email,
          client_phone: formData.phone,
          session_type: formData.sessionType,
          preferred_date: formData.preferredDate,
          notes: formData.notes || 'No additional notes',
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      setSubmitStatus('success');
      setFormData({
        clientName: '',
        email: '',
        phone: '',
        sessionType: '',
        preferredDate: '',
        notes: '',
      });
    } catch (error) {
      console.error('BookingForm EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full max-w-2xl mx-auto"
    >
      {showGlitter && <GoldenGlitter x={glitterCoords.x} y={glitterCoords.y} count={10} />}

      {/* Form Title */}
      <motion.h3
        variants={itemVariants}
        className="text-4xl font-heading font-bold text-primary mb-8 text-center"
      >
        {t('booking.form.title')}
      </motion.h3>

      <motion.p
        variants={itemVariants}
        className="text-center text-textLight mb-12 text-lg"
      >
        {t('booking.form.subtitle')}
      </motion.p>

      {/* Form */}
      <motion.form onSubmit={handleSubmit} className="space-y-6">
        {/* Client Name */}
        <motion.div variants={itemVariants}>
          <label className="block text-lg font-semibold text-primary mb-2">
            {t('booking.form.clientName')} *
          </label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            placeholder={t('booking.form.placeholders.clientName')}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.clientName ? 'border-red-400' : 'border-primary/30'
            } bg-white text-textDark text-base focus:outline-none focus:ring-2 focus:ring-primary/60`}
          />
          {errors.clientName && (
            <p className="text-red-400 text-sm mt-1">{errors.clientName}</p>
          )}
        </motion.div>

        {/* Email */}
        <motion.div variants={itemVariants}>
          <label className="block text-lg font-semibold text-primary mb-2">
            {t('booking.form.email')} *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t('booking.form.placeholders.email')}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.email ? 'border-red-400' : 'border-primary/30'
            } bg-white text-textDark text-base focus:outline-none focus:ring-2 focus:ring-primary/60`}
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </motion.div>

        {/* Phone */}
        <motion.div variants={itemVariants}>
          <label className="block text-lg font-semibold text-primary mb-2 flex items-center gap-2">
            <Phone className="w-5 h-5" />
            {t('booking.form.phone')} *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t('booking.form.placeholders.phone')}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.phone ? 'border-red-400' : 'border-primary/30'
            } bg-white text-textDark text-base focus:outline-none focus:ring-2 focus:ring-primary/60`}
          />
          {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
        </motion.div>

        {/* Session Type */}
        <motion.div variants={itemVariants}>
          <label className="block text-lg font-semibold text-primary mb-2 flex items-center gap-2">
            <Users className="w-5 h-5" />
            {t('booking.form.sessionType')} *
          </label>
          <select
            name="sessionType"
            value={formData.sessionType}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.sessionType ? 'border-red-400' : 'border-primary/30'
            } bg-white text-textDark text-base focus:outline-none focus:ring-2 focus:ring-primary/60`}
          >
            <option value="">{t('booking.form.placeholders.selectSessionType')}</option>
            <option value="newborn">{t('booking.form.sessionTypes.newborn')}</option>
            <option value="toddler">{t('booking.form.sessionTypes.toddler')}</option>
            <option value="kids">{t('booking.form.sessionTypes.kids')}</option>
            <option value="family">{t('booking.form.sessionTypes.family')}</option>
          </select>
          {errors.sessionType && (
            <p className="text-red-400 text-sm mt-1">{errors.sessionType}</p>
          )}
        </motion.div>

        {/* Preferred Date */}
        <motion.div variants={itemVariants}>
          <label className="block text-lg font-semibold text-primary mb-2 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {t('booking.form.preferredDate')} *
          </label>
          <input
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.preferredDate ? 'border-red-400' : 'border-primary/30'
            } bg-white text-textDark text-base focus:outline-none focus:ring-2 focus:ring-primary/60`}
          />
          {errors.preferredDate && (
            <p className="text-red-400 text-sm mt-1">{errors.preferredDate}</p>
          )}
        </motion.div>

        {/* Additional Notes */}
        <motion.div variants={itemVariants}>
          <label className="block text-lg font-semibold text-primary mb-2">
            {t('booking.form.notes')}
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder={t('booking.form.placeholders.notes')}
            rows="4"
            className={`w-full px-4 py-3 rounded-lg border border-primary/30 bg-white text-textDark text-base focus:outline-none focus:ring-2 focus:ring-primary/60 resize-none`}
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={itemVariants} className="flex justify-center pt-4">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            onMouseEnter={!isSubmitting ? handleButtonHover : undefined}
            whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
            className={`py-3 px-12 rounded-lg font-bold text-lg ${
              isSubmitting ? 'bg-primary/60 cursor-not-allowed' : 'bg-primary hover:bg-accent'
            } text-black transition-colors flex items-center gap-2 btn-shimmer metallic-blur shadow-lg`}
          >
            {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
            {isSubmitting ? t('booking.form.submitting') : t('booking.form.submit')}
          </motion.button>
        </motion.div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center"
          >
            {t('booking.form.success')}
          </motion.div>
        )}
        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center"
          >
            {t('booking.form.error')}
          </motion.div>
        )}
      </motion.form>
    </motion.div>
  );
};

export default BookingForm;
