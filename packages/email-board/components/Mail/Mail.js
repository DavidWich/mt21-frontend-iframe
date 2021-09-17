import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import classes from "./Mail.module.css";
import Card from "../UI/Card";
import { MailItem } from "./MailItem";
import fetchUserEmails from "../../assets/functions/fetch";

export default function Mail(props) {
  const { t } = useTranslation();
  const { email, token } = props;
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const f = async () => {
      if (email) {
        const emails = await fetchUserEmails(email, token);
        setEmails(emails.emails);
      }
    };
    f();
  }, [email]);

  const newEmailHandler = (event) => {
    event.preventDefault();
    if ("parentIFrame" in window) {
      window.parentIFrame.sendMessage(
        JSON.stringify({ type: "REDIRECT", page: "mail/new-mail" })
      );
    }
  };

  return (
    <section className={classes.mail}>
      <div className={classes.heading}>
        <h1>{t("mail.email")}</h1>
        <button id="mail_new" onClick={newEmailHandler}>
          {t("mail.new_email")}
        </button>
      </div>
      <Card>
        <ul>
          {emails.map((item) => (
            <MailItem
              key={item._id}
              sender={item.sender}
              recipient={item.recipient}
              subject={item.subject}
              content={item.content}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
}
