import i18n from "i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";
const trans = require("./locales/translations.json")
// the translations
// (tip move them in a JSON file and import them)


function t (_tstr) {
  // get locale

  if (trans[locale][_tstr] === undefined)
    {
      return _tstr;
    }
  else {
    return trans[locale][_tstr];
  }
  
}

export default t;