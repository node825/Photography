import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, Loader2 } from 'lucide-react';
import { newsletterAPI } from '../utils/api';

const Newsletter = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({ email: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = t('newsletter.validation.required');
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t('newsletter.validation.invalidEmail');
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
      await newsletterAPI.subscribe(formData.email.trim());
      setSubmitStatus('success');
      setFormData({ email: '' });
    } catch (error) {
      console.error('Newsletter subscription error:', error);
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
    <section id="newsletter" className="py-24 px-4 bg-mediumGray/30 relative">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <Mail className="w-12 h-12 text-primary" />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4"
          >
            {t('newsletter.title')}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-textLight mb-10 text-lg font-light max-w-xl"
          >
            {t('newsletter.subtitle')}
          </motion.p>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="w-full max-w-md"
          >
            <div className="flex flex-col sm:flex-row gap-3 items-stretch">
              <div className="flex-1">
                <label htmlFor="newsletter-email" className="sr-only">
                  {t('newsletter.emailLabel')}
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('newsletter.placeholder')}
                  aria-label={t('newsletter.emailLabel')}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? 'border-red-400' : 'border-primary/30'
                  } bg-white text-textDark text-base focus:outline-none focus:ring-2 focus:ring-primary/60`}
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className={`py-3 px-8 rounded-lg font-bold text-lg ${
                  isSubmitting ? 'bg-primary/60 cursor-not-allowed' : 'bg-primary hover:bg-accent'
                } text-black transition-colors flex items-center justify-center gap-2 btn-shimmer metallic-blur shadow-lg`}
              >
                {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
                {isSubmitting ? t('newsletter.sending') : t('newsletter.submit')}
              </motion.button>
            </div>

            {errors.email && (
              <p className="text-red-400 text-sm mt-2 text-start">{errors.email}</p>
            )}

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center text-sm"
              >
                {t('newsletter.success')}
              </motion.div>
            )}
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center text-sm"
              >
                {t('newsletter.error')}
              </motion.div>
            )}
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
