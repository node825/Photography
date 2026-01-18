import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useState } from 'react';
import FloatingSquares from './FloatingSquares';
import GoldenGlitter from './GoldenGlitter';

const Hero = () => {
  const { t } = useTranslation();
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

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-mediumGray to-lightGray relative">
      {showGlitter && <GoldenGlitter x={glitterCoords.x} y={glitterCoords.y} count={12} />}
      {/* Floating animated squares */}
      <FloatingSquares />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl -top-48 -left-48"></div>
        <div className="absolute w-96 h-96 bg-secondary/5 rounded-full blur-3xl -bottom-48 -right-48"></div>
      </div>

      {/* Scattered decorative images */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top Left */}
        <motion.img
          src="/src/assets/gallery/גיל שנה/גיל שנה (1).jpg"
          alt="scattered"
          initial={{ opacity: 0, rotate: -15, y: 50 }}
          animate={{ opacity: 0.15, rotate: -15, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="absolute w-32 h-32 object-cover rounded-lg -top-10 -left-16 shadow-2xl"
        />

        {/* Top Right */}
        <motion.img
          src="/src/assets/gallery/סטודיו/סטודיו (3).jpg"
          alt="scattered"
          initial={{ opacity: 0, rotate: 20, y: 50 }}
          animate={{ opacity: 0.15, rotate: 20, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute w-28 h-28 object-cover rounded-lg -top-5 -right-12 shadow-2xl"
        />

        {/* Bottom Left */}
        <motion.img
          src="/src/assets/gallery/חאלקה/חאלקה (1).jpg"
          alt="scattered"
          initial={{ opacity: 0, rotate: 25, y: -50 }}
          animate={{ opacity: 0.15, rotate: 25, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="absolute w-36 h-36 object-cover rounded-lg -bottom-8 -left-20 shadow-2xl"
        />

        {/* Bottom Right */}
        <motion.img
          src="/src/assets/gallery/חוץ/חוץ (1).jpg"
          alt="scattered"
          initial={{ opacity: 0, rotate: -20, y: -50 }}
          animate={{ opacity: 0.15, rotate: -20, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="absolute w-32 h-32 object-cover rounded-lg -bottom-4 -right-16 shadow-2xl"
        />

        {/* Middle Left */}
        <motion.img
          src="/src/assets/gallery/מוצרים/מזון.jpg"
          alt="scattered"
          initial={{ opacity: 0, rotate: -10, x: -50 }}
          animate={{ opacity: 0.12, rotate: -10, x: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="absolute w-24 h-24 object-cover rounded-lg top-1/4 -left-10 shadow-2xl"
        />

        {/* Middle Right */}
        <motion.img
          src="/src/assets/gallery/גיל שנה/גיל שנה (12).jpg"
          alt="scattered"
          initial={{ opacity: 0, rotate: 15, x: 50 }}
          animate={{ opacity: 0.12, rotate: 15, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute w-28 h-28 object-cover rounded-lg bottom-1/3 -right-8 shadow-2xl"
        />
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
          className="text-5xl md:text-7xl font-heading font-bold mb-8 text-primary text-glow"
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.0 }}
          className="text-subtitle md:text-lg mb-12 text-textLight font-light max-w-2xl"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.0 }}
          className="flex gap-8 justify-center flex-wrap mt-8"
        >
          <motion.a
            href="#gallery"
            onMouseEnter={handleButtonHover}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(212, 175, 55, 0.35)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-background px-12 py-4 rounded-xl font-bold text-lg letter-spacing shadow-lg hover:bg-accent transition-all duration-300 btn-shimmer metallic-blur !text-black"
          >
            {t('hero.viewGallery')}
          </motion.a>

          <motion.a
            href="#booking"
            onMouseEnter={handleButtonHover}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(212, 175, 55, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-mediumGray text-primary border-2 border-primary px-12 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-lightGray hover:border-primary/80 transition-all duration-300 btn-shimmer metallic-blur"
          >
            {t('hero.bookSession')}
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
