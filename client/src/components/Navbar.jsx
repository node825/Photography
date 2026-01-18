import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'he' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'he' ? 'rtl' : 'ltr';
  };

  return (
    <nav className="bg-white/90 text-textDark py-5 px-6 sticky top-0 z-50 shadow-md backdrop-blur-md border-b border-accent/20">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-heading font-semibold text-accent">
          Kids Photography
        </div>

        <div className="flex items-center gap-8">
          <a href="#home" className="text-textDark hover:text-accent transition-colors duration-300 font-medium">
            {t('nav.home')}
          </a>
          <a href="#gallery" className="text-textDark hover:text-accent transition-colors duration-300 font-medium">
            {t('nav.examples')}
          </a>
          <a href="#booking" className="text-textDark hover:text-accent transition-colors duration-300 font-medium">
            {t('nav.booking')}
          </a>
          <a href="#contact" className="text-textDark hover:text-accent transition-colors duration-300 font-medium">
            {t('nav.contact')}
          </a>

          <button
            onClick={toggleLanguage}
            className="bg-accent text-white px-5 py-2 rounded-lg hover:bg-accentDark transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
          >
            {i18n.language === 'en' ? 'עב' : 'EN'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
