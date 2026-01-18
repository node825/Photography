import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import logo from '../assets/Black And White Camera Store Logo - black.png';

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'he' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'he' ? 'rtl' : 'ltr';
  };

  return (
    <nav className="bg-background/95 text-textDark py-4 px-6 sticky top-0 z-50 shadow-lg backdrop-blur-md border-b border-primary/30">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left - Navigation Links */}
        <div className="flex items-center gap-8">
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
          className="bg-primary text-background px-5 py-2 rounded-lg hover:bg-accent transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          {i18n.language === 'en' ? 'עב' : 'EN'}
        </button>

        {/* Right - Logo */}
        <motion.div
          className="flex items-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          whileHover={{ scale: 1.1, rotate: 360 }}
        >
          <img
            src={logo}
            alt="Kids Photography Logo"
            className="h-12 w-12 drop-shadow-lg hover:drop-shadow-xl transition-all duration-300"
          />
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
