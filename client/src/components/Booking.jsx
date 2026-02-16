import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Calendar, X } from 'lucide-react';
import { bookingAPI } from '../utils/api';

const Booking = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    clientName: '',
    phone: '',
    email: '',
    sessionType: '',
    preferredDate: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Get today's date in YYYY-MM-DD format for min attribute
  const getTodayDate = () => {
    const today = new Date();
    today.setDate(today.getDate());
    return today.toISOString().split('T')[0];
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\d\s\-+()]+$/;

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.clientName.trim()) {
      newErrors.clientName = t('booking.form.validation.required');
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = t('booking.form.validation.required');
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = t('booking.form.validation.invalidPhone');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('booking.form.validation.required');
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t('booking.form.validation.invalidEmail');
    }
    
    if (!formData.sessionType) {
      newErrors.sessionType = t('booking.form.validation.required');
    }
    
    if (!formData.preferredDate.trim()) {
      newErrors.preferredDate = t('booking.form.validation.required');
    } else {
      const selectedDate = new Date(formData.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.preferredDate = t('booking.form.validation.futureDate');
      }
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
      const response = await bookingAPI.createBooking(formData);
      setSubmitStatus('success');
      setShowSuccessModal(true);
      setFormData({
        clientName: '',
        phone: '',
        email: '',
        sessionType: '',
        preferredDate: '',
        notes: '',
      });
      
      // Auto-hide modal after 3 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    } catch (error) {
      console.error('Booking Error:', error);
      setSubmitStatus('error');
      setErrors({
        submit: t('booking.form.error'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
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

  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', damping: 25, stiffness: 300 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <section id="booking" className="py-24 px-4 bg-mediumGray/30 relative">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center"
        >
          {/* Title */}
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6 text-center"
          >
            {t('booking.title')}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-center text-textLight mb-16 text-lg font-light max-w-2xl"
          >
            {t('booking.subtitle')}
          </motion.p>

          {/* Form */}
          <motion.div variants={itemVariants} className="w-full">
            <form onSubmit={handleSubmit} className="space-y-6 mx-auto max-w-2xl">
              {/* Client Name */}
              <motion.div variants={fieldVariants}>
                <label className="block text-lg font-semibold text-primary mb-2">
                  {t('booking.form.name')} *
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  placeholder={t('booking.form.placeholders.name')}
                  className={`w-full px-4 py-3 rounded-lg border-2 bg-mediumGray text-textLight focus:outline-none transition-colors ${
                    errors.clientName
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-primary focus:border-primary'
                  }`}
                />
                {errors.clientName && (
                  <p className="text-red-400 text-sm mt-2">{errors.clientName}</p>
                )}
              </motion.div>

              {/* Phone */}
              <motion.div variants={fieldVariants}>
                <label className="block text-lg font-semibold text-primary mb-2">
                  {t('booking.form.phone')} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('booking.form.placeholders.phone')}
                  className={`w-full px-4 py-3 rounded-lg border-2 bg-mediumGray text-textLight focus:outline-none transition-colors ${
                    errors.phone
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-primary focus:border-primary'
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-2">{errors.phone}</p>
                )}
              </motion.div>

              {/* Email */}
              <motion.div variants={fieldVariants}>
                <label className="block text-lg font-semibold text-primary mb-2">
                  {t('booking.form.email')} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('booking.form.placeholders.email')}
                  className={`w-full px-4 py-3 rounded-lg border-2 bg-mediumGray text-textLight focus:outline-none transition-colors ${
                    errors.email
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-primary focus:border-primary'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-2">{errors.email}</p>
                )}
              </motion.div>

              {/* Session Type */}
              <motion.div variants={fieldVariants}>
                <label className="block text-lg font-semibold text-primary mb-2">
                  {t('booking.form.sessionType')} *
                </label>
                <select
                  name="sessionType"
                  value={formData.sessionType}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 bg-mediumGray text-textLight focus:outline-none transition-colors cursor-pointer ${
                    errors.sessionType
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-primary focus:border-primary'
                  }`}
                >
                  <option value="">{t('booking.form.selectType')}</option>
                  <option value="newborn">{t('booking.sessionTypes.newborn')}</option>
                  <option value="toddler">{t('booking.sessionTypes.toddler')}</option>
                  <option value="kids">{t('booking.sessionTypes.kids')}</option>
                  <option value="family">{t('booking.sessionTypes.family')}</option>
                </select>
                {errors.sessionType && (
                  <p className="text-red-400 text-sm mt-2">{errors.sessionType}</p>
                )}
              </motion.div>

              {/* Preferred Date */}
              <motion.div variants={fieldVariants}>
                <label className="block text-lg font-semibold text-primary mb-2">
                  {t('booking.form.date')} *
                </label>
                <div className="relative">
                  <Calendar className="absolute right-4 top-4 w-5 h-5 text-primary pointer-events-none" />
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    min={getTodayDate()}
                    className={`w-full px-4 py-3 pr-12 rounded-lg border-2 bg-mediumGray text-textLight focus:outline-none transition-colors cursor-pointer ${
                      errors.preferredDate
                        ? 'border-red-400 focus:border-red-400'
                        : 'border-primary focus:border-primary'
                    }`}
                  />
                </div>
                {errors.preferredDate && (
                  <p className="text-red-400 text-sm mt-2">{errors.preferredDate}</p>
                )}
              </motion.div>

              {/* Notes */}
              <motion.div variants={fieldVariants}>
                <label className="block text-lg font-semibold text-primary mb-2">
                  {t('booking.form.notes')}
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder={t('booking.form.placeholders.notes')}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border-2 border-primary bg-mediumGray text-textLight focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </motion.div>

              {/* Submit Error */}
              {errors.submit && (
                <motion.div
                  variants={fieldVariants}
                  className="p-4 rounded-lg bg-red-400/10 border border-red-400/30"
                >
                  <p className="text-red-400 text-center">{errors.submit}</p>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.div variants={fieldVariants} className="pt-6">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                  className={`w-full py-4 rounded-lg font-semibold text-xl transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-600 text-textDark cursor-not-allowed'
                      : 'bg-primary text-background hover:bg-accent'
                  }`}
                >
                  {isSubmitting ? t('booking.form.sending') : t('booking.form.submit')}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/60 z-40"
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
            >
              <div className="bg-mediumGray rounded-xl p-8 border border-primary/30 shadow-2xl">
                {/* Close Button */}
                <motion.button
                  onClick={handleCloseModal}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 text-textLight hover:text-primary transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </motion.button>

                {/* Success Content */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-center"
                >
                  <motion.div
                    variants={itemVariants}
                    className="mb-6"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                      <div className="text-3xl">✓</div>
                    </div>
                  </motion.div>

                  <motion.h3
                    variants={itemVariants}
                    className="text-3xl font-heading font-bold text-primary mb-4"
                  >
                    {t('booking.form.success')}
                  </motion.h3>

                  <motion.div variants={itemVariants} className="space-y-3 text-textLight mb-6">
                    <p className="text-lg">
                      <span className="font-semibold text-primary">{t('booking.form.name')}:</span> {formData.clientName}
                    </p>
                    <p className="text-lg">
                      <span className="font-semibold text-primary">{t('booking.form.sessionType')}:</span>{' '}
                      {t(`booking.sessionTypes.${formData.sessionType}`)}
                    </p>
                    <p className="text-lg">
                      <span className="font-semibold text-primary">{t('booking.form.date')}:</span> {formData.preferredDate}
                    </p>
                  </motion.div>

                  <motion.p
                    variants={itemVariants}
                    className="text-textDark text-base mb-6"
                  >
                    {t('booking.modal.contactSoon')}
                  </motion.p>

                  <motion.button
                    variants={itemVariants}
                    onClick={handleCloseModal}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-primary text-background font-semibold rounded-lg hover:bg-accent transition-colors"
                  >
                    {t('booking.modal.close')}
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Booking;
