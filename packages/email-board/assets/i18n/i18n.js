import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      dashboard: {
        mails: "Emails",
        mail_count: "Number of emails",
      },
      mail: {
        back: "Back",
        content: "Content",
        email: "Emails",
        new_email: "New Email",
        recipient: "Recipient",
        send: "Send",
        subject: "Subject",
      },
    },
  },
  de: {
    translation: {
      dashboard: {
        mails: "Emails",
        mail_count: "Anzahl Emails",
      },
      mail: {
        back: "Zurück",
        content: "Inhalt",
        email: "Emails",
        new_email: "Neue Email",
        recipient: "Empfänger",
        send: "Versenden",
        subject: "Betreff",
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
