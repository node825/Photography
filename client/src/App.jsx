import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n/i18n';
import Home from './pages/Home';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set initial direction based on language
    document.documentElement.dir = i18n.language === 'he' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return <Home />;
}

export default App;
