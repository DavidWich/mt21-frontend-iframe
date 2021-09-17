import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      dashboard: {
        bib: "Library",
      },
      bib: {
        library: "Library",
      },
    },
  },
  de: {
    translation: {
      dashboard: {
        bib: "Bibliothek",
      },
      bib: {
        library: "Bibliothek",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "de",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
