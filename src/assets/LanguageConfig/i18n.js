import i18n from 'i18next';
import en from './Langs/en';
import pl from './Langs/pl';

i18n.init({
  resources: {
    en: {
      translations: { ...en },
    },
    pl: {
      translations: { ...pl },
    },
  },
  fallbackLng: 'en',
  debug: false,

  ns: ['translations'],
  defaultNS: 'translations',
  keySeparator: false,

  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
  react: {
    wait: true,
  },
});
export default i18n;
