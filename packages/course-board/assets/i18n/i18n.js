import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      courses: {
        course: "Course",
        courses: "Courses",
        enrolled: "Enrolled",
        error: "Error",
        lecturer: "Lecturer",
        not_found: "not found",
        people: "People",
        send_mail: "Send mail",
        send_mail_error: "Emails can only be sent in the main application.",
      },
      dashboard: {
        courses: "Courses",
      },
    },
  },
  de: {
    translation: {
      courses: {
        course: "Kurs",
        courses: "Kurse",
        enrolled: "Eingeschrieben",
        error: "Fehler",
        lecturer: "Dozent",
        not_found: "nicht gefunden",
        people: "Personen",
        send_mail: "Email senden",
        send_mail_error:
          "Emails können nur in der Hauptanwendung versendet werden.",
      },
      dashboard: {
        courses: "Kurse",
      },
      header: {
        news: "Neuigkeiten",
        bib: "Bibliothek",
        email: "Email",
        courses: "Kurse",
        logout: "Abmelden",
        login: "Anmelden",
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
