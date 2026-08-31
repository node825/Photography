import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'site-background';

const backgroundOptions = [
  { id: 'default', value: 'linear-gradient(135deg, #0F0F0F 0%, #1a1a1a 100%)', swatch: '#0F0F0F' },
  { id: 'charcoal', value: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)', swatch: '#2a2a2a' },
  { id: 'navy', value: 'linear-gradient(135deg, #0a0f1f 0%, #12203a 100%)', swatch: '#12203a' },
  { id: 'plum', value: 'linear-gradient(135deg, #1a0f1a 0%, #2a1a2a 100%)', swatch: '#2a1a2a' },
  { id: 'forest', value: 'linear-gradient(135deg, #0a140f 0%, #12241a 100%)', swatch: '#12241a' },
];

const applyBackground = (value) => {
  document.body.style.background = value;
};

const BackgroundColorPicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('default');
  const { t } = useTranslation();

  useEffect(() => {
    const storedId = localStorage.getItem(STORAGE_KEY);
    const option = backgroundOptions.find((item) => item.id === storedId);
    if (option) {
      setSelected(option.id);
      applyBackground(option.value);
    }
  }, []);

  const handleSelect = (option) => {
    setSelected(option.id);
    applyBackground(option.value);
    localStorage.setItem(STORAGE_KEY, option.id);
  };

  const panelVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <div className="fixed bottom-4 end-4 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.25 }}
            className="bg-background/95 border border-blue/30 rounded-xl shadow-xl backdrop-blur-md p-4"
          >
            <p className="text-textDark text-sm font-medium mb-3 text-center">
              {t('theme.title')}
            </p>
            <div className="flex items-center gap-2">
              {backgroundOptions.map((option) => (
                <motion.button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelect(option)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={t(`theme.options.${option.id}`)}
                  aria-pressed={selected === option.id}
                  title={t(`theme.options.${option.id}`)}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                    selected === option.id ? 'border-primary' : 'border-mediumGray'
                  }`}
                  style={{ background: option.value }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={t('theme.toggle')}
        aria-expanded={isOpen}
        title={t('theme.toggle')}
        className="bg-blue text-background w-12 h-12 rounded-full shadow-lg hover:bg-blueDark transition-colors duration-300 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
          aria-hidden="true"
        >
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </svg>
      </motion.button>
    </div>
  );
};

export default BackgroundColorPicker;
