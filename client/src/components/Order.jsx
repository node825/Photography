import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShoppingBag, Calendar, User, Phone, Mail, Camera, Loader2, CheckCircle } from 'lucide-react';
import GoldenGlitter from './GoldenGlitter';

const Order = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    sessionType: '',
    preferredDate: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [glitterCoords, setGlitterCoords] = useState({ x: 0, y: 0 });
  const [showGlitter, setShowGlitter] = useState(false);

  const sessionTypes = [
    { value: 'newborn', label: t('order.sessionTypes.newborn') },
    { value: 'toddler', label: t('order.sessionTypes.toddler') },
    { value: 'kids', label: t('order.sessionTypes.kids') },
    { value: 'family', label: t('order.sessionTypes.family') },
  ];

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
    if (!formData.name.trim()) newErrors.name = t('order.form.validation.required');
    if (!formData.phone.trim()) newErrors.phone = t('order.form.validation.required');
    if (!formData.email.trim()) {
      newErrors.email = t('order.form.validation.required');
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t('order.form.validation.invalidEmail');
    }
    if (!formData.sessionType) newErrors.sessionType = t('order.form.validation.required');
    if (!formData.preferredDate) newErrors.preferredDate = t('order.form.validation.required');
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
      // API call to submit order
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: formData.name,
          phone: formData.phone,
          email: formData.email,
          sessionType: formData.sessionType,
          preferredDate: formData.preferredDate,
          notes: formData.notes,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          phone: '',
          email: '',
          sessionType: '',
          preferredDate: '',
          notes: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Order submission error:', error);
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
    <section id="order" className="py-24 px-4 bg-background relative">
      {showGlitter && <GoldenGlitter x={glitterCoords.x} y={glitterCoords.y} count={10} />}
      <div className="container mx-auto max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <ShoppingBag className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
              {t('order.title')}
            </h2>
            <p className="text-textLight text-lg max-w-2xl mx-auto">
              {t('order.subtitle')}
            </p>
          </motion.div>

          {/* Order Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="w-full max-w-2xl bg-lightPink rounded-2xl p-8 shadow-lg border border-primary/20"
          >
            {/* Success Message */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-primary/20 rounded-lg flex items-center gap-3"
              >
                <CheckCircle className="w-6 h-6 text-primary" />
                <p className="text-primary font-medium">{t('order.form.success')}</p>
              </motion.div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-red-500/20 rounded-lg"
              >
                <p className="text-red-400 font-medium">{t('order.form.error')}</p>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="relative">
                <label className="block text-textDark font-medium mb-2">
                  <User className="w-4 h-4 inline-block mr-2 text-primary" />
                  {t('order.form.name')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name ? 'border-red-400' : 'border-primary/30'
                  } bg-background text-textDark text-base focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all`}
                  placeholder={t('order.form.placeholders.name')}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Phone Field */}
              <div className="relative">
                <label className="block text-textDark font-medium mb-2">
                  <Phone className="w-4 h-4 inline-block mr-2 text-primary" />
                  {t('order.form.phone')}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.phone ? 'border-red-400' : 'border-primary/30'
                  } bg-background text-textDark text-base focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all`}
                  placeholder={t('order.form.placeholders.phone')}
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="relative md:col-span-2">
                <label className="block text-textDark font-medium mb-2">
                  <Mail className="w-4 h-4 inline-block mr-2 text-primary" />
                  {t('order.form.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? 'border-red-400' : 'border-primary/30'
                  } bg-background text-textDark text-base focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all`}
                  placeholder={t('order.form.placeholders.email')}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Session Type Field */}
              <div className="relative">
                <label className="block text-textDark font-medium mb-2">
                  <Camera className="w-4 h-4 inline-block mr-2 text-primary" />
                  {t('order.form.sessionType')}
                </label>
                <select
                  name="sessionType"
                  value={formData.sessionType}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.sessionType ? 'border-red-400' : 'border-primary/30'
                  } bg-background text-textDark text-base focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all`}
                >
                  <option value="">{t('order.form.selectType')}</option>
                  {sessionTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.sessionType && (
                  <p className="text-red-400 text-sm mt-1">{errors.sessionType}</p>
                )}
              </div>

              {/* Preferred Date Field */}
              <div className="relative">
                <label className="block text-textDark font-medium mb-2">
                  <Calendar className="w-4 h-4 inline-block mr-2 text-primary" />
                  {t('order.form.preferredDate')}
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.preferredDate ? 'border-red-400' : 'border-primary/30'
                  } bg-background text-textDark text-base focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all`}
                />
                {errors.preferredDate && (
                  <p className="text-red-400 text-sm mt-1">{errors.preferredDate}</p>
                )}
              </div>

              {/* Notes Field */}
              <div className="relative md:col-span-2">
                <label className="block text-textDark font-medium mb-2">
                  {t('order.form.notes')}
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-primary/30 bg-background text-textDark text-base focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all resize-none"
                  placeholder={t('order.form.placeholders.notes')}
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              onMouseEnter={handleButtonHover}
              onMouseLeave={() => setShowGlitter(false)}
              whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(212, 175, 55, 0.35)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-8 bg-primary text-background px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-accent transition-all duration-300 btn-shimmer metallic-blur disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t('order.form.submitting')}
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  {t('order.form.submit')}
                </>
              )}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default Order;
