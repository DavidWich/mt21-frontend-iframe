import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import classes from "./MailDashboardTile.module.css";
import fetchUserEmails from "../../assets/functions/fetch";

export default function MailDashboardTile(props) {
  const { t } = useTranslation();
  const { email, token } = props;
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const f = async () => {
      if (email) {
        const data = await fetchUserEmails(email, token);
        if (data) {
          setEmails(data.emails);
        }
      }
    };
    f();
  }, [email]);

  const linkHandler = (event) => {
    event.preventDefault();
    if ("parentIFrame" in window) {
      window.parentIFrame.sendMessage(
        JSON.stringify({ type: "REDIRECT", page: "mail" })
      );
    }
  };

  return (
    <div className={classes.dashboard}>
      <h2 onClick={linkHandler}>{t("dashboard.mails")}</h2>
      {`${t("dashboard.mail_count")}: ${emails.length}`}
    </div>
  );
}
