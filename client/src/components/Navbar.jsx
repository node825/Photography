import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useState } from 'react';
import logo from '../assets/Black And White Camera Store Logo - black.png';
import GoldenGlitter from './GoldenGlitter';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [glitterCoords, setGlitterCoords] = useState({ x: 0, y: 0 });
  const [showGlitter, setShowGlitter] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'he' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'he' ? 'rtl' : 'ltr';
  };

  const handleLogoHover = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlitterCoords({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    setShowGlitter(true);
  };

  return (
    <nav className="bg-background/95 text-textDark py-0 px-6 sticky top-0 z-50 shadow-lg backdrop-blur-md border-b border-primary/30 h-10">
      {showGlitter && <GoldenGlitter x={glitterCoords.x} y={glitterCoords.y} count={8} />}
      <div className="container mx-auto flex justify-between items-center h-full gap-4">
        {/* Left - Navigation Links */}
        <div className="flex items-center gap-6 text-sm">
          <a href="#home" className="text-textDark hover:text-primary transition-colors duration-300 font-medium">
            {t('nav.home')}
          </a>
          <a href="#gallery" className="text-textDark hover:text-primary transition-colors duration-300 font-medium">
            {t('nav.examples')}
          </a>
          <a href="#booking" className="text-textDark hover:text-primary transition-colors duration-300 font-medium">
            {t('nav.booking')}
          </a>
          <a href="#contact" className="text-textDark hover:text-primary transition-colors duration-300 font-medium">
            {t('nav.contact')}
          </a>
        </div>

        {/* Center - Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="bg-primary text-background px-3 py-1 rounded-md hover:bg-accent transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 text-xs"
        >
          {i18n.language === 'en' ? 'עב' : 'EN'}
        </button>

        {/* Right - Logo (Fixed position on right/left based on RTL) */}
        <motion.div
          className="flex items-center cursor-pointer flex-shrink-0"
          whileHover={{ scale: 1.1 }}
          onMouseEnter={handleLogoHover}
        >
          <img
            src={logo}
            alt="Kids Photography Logo"
            className="h-8 w-8 invert transition-all duration-300"
            style={{
              filter: 'invert(1) drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))',
            }}
          />
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
