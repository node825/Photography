import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import FloatingSquares from './FloatingSquares';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-lightPink to-secondary/20 relative overflow-hidden">
      {/* Floating animated squares */}
      <FloatingSquares />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-accent/5 rounded-full blur-3xl -top-48 -left-48"></div>
        <div className="absolute w-96 h-96 bg-secondary/10 rounded-full blur-3xl -bottom-48 -right-48"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0 }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1.0 }}
          className="text-5xl md:text-7xl font-heading font-semibold mb-6 text-primary"
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.0 }}
          className="text-xl md:text-2xl mb-10 text-textLight font-light"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.0 }}
          className="flex gap-5 justify-center flex-wrap"
        >
          <motion.a
            href="#gallery"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(232, 165, 152, 0.25)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-accent text-white px-10 py-4 rounded-xl font-medium shadow-md hover:bg-accentDark transition-all duration-300"
          >
            {t('hero.viewGallery')}
          </motion.a>

          <motion.a
            href="#booking"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(245, 213, 208, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-lightPink text-accent border-2 border-accent/30 px-10 py-4 rounded-xl font-medium shadow-md hover:bg-secondary hover:border-accent/50 transition-all duration-300"
          >
            {t('hero.bookSession')}
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
