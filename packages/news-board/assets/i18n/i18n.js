import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      meta_description: {
        news: "Here you can find the latest news for your university.",
      },
      dashboard: {
        news: "News",
      },
      news: {
        all: "All",
        course_news: "Course news",
        news: "News",
        not_found: "No news found!",
      },
    },
  },
  de: {
    translation: {
      meta_description: {
        news: "Siehe die neusten Neuigkeiten zu deiner Universität.",
      },
      dashboard: {
        news: "Neuigkeiten",
      },
      news: {
        all: "Alle",
        course_news: "Kursneuigkeiten",
        news: "Neuigkeiten",
        not_found: "Keine Neuigkeiten vorhanden!",
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
