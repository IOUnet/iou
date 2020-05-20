import i18n from "i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";
const ruTrans = require("./locales/ru_iou.json")
// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next"
    }
  },
  ru:{
    translation: ruTrans
  }
};

i18n
    // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)

  .use(initReactI18next) // passes i18n down to react-i18next
  
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
  //  lng: "en", 
    fallbackLng: 'en',
    debug: true,
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    react: {
        useSuspense: false
    }
  });

  export default i18n;