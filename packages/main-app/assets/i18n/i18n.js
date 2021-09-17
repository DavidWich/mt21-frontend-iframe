import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      meta_description: {
        dashboard:
          "Have an overview of news, courses, mail stats and the library inventory of the Studi-App.",
        home: "Welcome to the Studi-App of your university.",
        news: "Here you can find the latest news for your university.",
      },
      auth: {
        email: "Email",
        password: "Password",
        login: "Login",
      },
      cart: {
        cart_is_empty: "Cart is empty",
      },
      dashboard: {
        bib: "Library",
        courses: "Courses",
        mails: "Emails",
        mail_count: "Number of emails",
        news: "News",
        title: "Dashboard",
      },
      header: {
        news: "News",
        bib: "Library",
        email: "Email",
        courses: "Courses",
        logout: "Logout",
        login: "Login",
      },
      welcome: { welcome: "Welcome", init: "Initialize data" },
    },
  },
  de: {
    translation: {
      meta_description: {
        dashboard:
          "Übersicht über Neuigkeiten, Kurse, Email-Statistiken und dem Bibliotheksbestand in einem Dashboard deiner Universität.",
        home: "Herzlich Willkommen zur Studi-App deiner Universität.",
        news: "Siehe die neusten Neuigkeiten zu deiner Universität.",
      },
      auth: {
        email: "Email",
        password: "Passwort",
        login: "Login",
      },
      cart: {
        cart_is_empty: "Warenkorb ist leer",
      },
      dashboard: {
        bib: "Bibliothek",
        courses: "Kurse",
        mails: "Emails",
        mail_count: "Anzahl Emails",
        news: "Neuigkeiten",
        title: "Dashboard",
      },
      header: {
        news: "Neuigkeiten",
        bib: "Bibliothek",
        email: "Email",
        courses: "Kurse",
        logout: "Abmelden",
        login: "Anmelden",
      },
      welcome: { welcome: "Willkommen", init: "Daten initialisieren" },
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
