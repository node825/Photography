import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, Loader2 } from 'lucide-react';
import { newsletterAPI } from '../utils/api';

const Newsletter = () => {
  const [formData, setFormData] = useState({ email: '' });
  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

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
      console.error('Newsletter Error:', error);
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
    <section id="newsletter" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20">
              <Mail className="w-8 h-8 text-primary" />
            </div>
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
            className="w-full max-w-md flex flex-col gap-4"
          >
            <div className="text-start">
              <label htmlFor="newsletter-email" className="block text-lg font-semibold text-primary mb-2">
                {t('newsletter.email')}
              </label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('newsletter.placeholder')}
                className={`w-full px-4 py-3 rounded-lg border-2 bg-mediumGray text-textLight focus:outline-none transition-colors ${
                  errors.email
                    ? 'border-red-400 focus:border-red-400'
                    : 'border-primary focus:border-primary'
                }`}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-2">{errors.email}</p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.05 } : {}}
              whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              className={`w-full py-3 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                isSubmitting
                  ? 'bg-gray-600 text-textDark cursor-not-allowed'
                  : 'bg-primary text-background hover:bg-accent'
              }`}
            >
              {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
              {isSubmitting ? t('newsletter.sending') : t('newsletter.submit')}
            </motion.button>

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center text-sm"
              >
                {t('newsletter.success')}
              </motion.div>
            )}
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center text-sm"
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
