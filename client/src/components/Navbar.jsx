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
    <nav className="bg-background text-textDark sticky top-0 z-50 shadow-lg backdrop-blur-md border-b border-primary/30" style={{ height: '32px' }}>
      {showGlitter && <GoldenGlitter x={glitterCoords.x} y={glitterCoords.y} count={8} />}
      <div className="flex justify-between items-center h-full px-3" style={{ gap: '8px' }}>
        {/* Left - Navigation Links */}
        <div className="flex items-center" style={{ gap: '12px' }}>
          <a href="#home" className="text-textDark hover:text-primary transition-colors duration-300 font-medium" style={{ fontSize: '11px' }}>
            {t('nav.home')}
          </a>
          <a href="#gallery" className="text-textDark hover:text-primary transition-colors duration-300 font-medium" style={{ fontSize: '11px' }}>
            {t('nav.examples')}
          </a>
          <a href="#booking" className="text-textDark hover:text-primary transition-colors duration-300 font-medium" style={{ fontSize: '11px' }}>
            {t('nav.booking')}
          </a>
          <a href="#contact" className="text-textDark hover:text-primary transition-colors duration-300 font-medium" style={{ fontSize: '11px' }}>
            {t('nav.contact')}
          </a>
        </div>

        {/* Center - Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="bg-primary text-background rounded-md hover:bg-accent transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
          style={{
            fontSize: '10px',
            padding: '2px 6px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {i18n.language === 'en' ? 'עב' : 'EN'}
        </button>

        {/* Right - Logo */}
        <motion.div
          className="flex items-center cursor-pointer flex-shrink-0"
          whileHover={{ scale: 1.1 }}
          onMouseEnter={handleLogoHover}
        >
          <img
            src={logo}
            alt="Kids Photography Logo"
            style={{
              height: '18px',
              width: '18px',
              filter: 'invert(1) drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))',
              transition: 'all 0.3s',
            }}
          />
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
