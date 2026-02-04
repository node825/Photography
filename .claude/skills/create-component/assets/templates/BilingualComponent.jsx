import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

/**
 * BilingualComponentName - Full bilingual component with RTL/LTR support
 * Automatically adapts layout and text direction based on current language
 */
function BilingualComponentName() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'he';

  useEffect(() => {
    // Document direction is set by App.jsx, but you can override if needed
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [isRTL]);

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="container mx-auto px-4 py-8"
    >
      <h2 className="text-3xl font-bold mb-6">
        {t('component.title')}
      </h2>

      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          {t('component.description')}
        </p>

        {/* Use flex direction based on language */}
        <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-4`}>
          {/* Content with natural alignment */}
        </div>

        {/* Text alignment based on language */}
        <div className={isRTL ? 'text-right' : 'text-left'}>
          {t('component.content')}
        </div>
      </div>
    </div>
  );
}

export default BilingualComponentName;
