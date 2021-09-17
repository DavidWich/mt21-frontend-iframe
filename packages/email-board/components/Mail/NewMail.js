import { useRef } from "react";
import { useTranslation } from "react-i18next";

import classes from "./NewMail.module.css";

export default function NewMail(props) {
  const { t } = useTranslation();
  const recipientRef = useRef();
  const subjectRef = useRef();
  const contentRef = useRef();
  const { email, recipient, token } = props;

  const redirect = () => {
    if ("parentIFrame" in window) {
      window.parentIFrame.sendMessage(
        JSON.stringify({ type: "REDIRECT", page: "mail" })
      );
    }
  };

  const backHandler = (event) => {
    event.preventDefault();
    redirect();
  };

  const newEmailHandler = async (event) => {
    event.preventDefault();

    await fetch("/api/new-email", {
      method: "POST",
      body: JSON.stringify({
        sender: email,
        recipient: recipientRef.current.value,
        subject: subjectRef.current.value,
        content: contentRef.current.value,
        token: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    redirect();
  };

  return (
    <>
      <form className={classes["new-mail"]} onSubmit={newEmailHandler}>
        <div className={classes.side}>
          <button onClick={backHandler}>{t("mail.back")}</button>
          <button>{t("mail.send")}</button>
        </div>
        <div className={classes.control}>
          <label htmlFor="recipient">{t("mail.recipient")}</label>
          <input
            type="email"
            id="recipient"
            ref={recipientRef}
            defaultValue={recipient}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="subject">{t("mail.subject")}</label>
          <input type="text" id="subject" ref={subjectRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="content">{t("mail.content")}</label>
          <textarea rows="20" id="content" ref={contentRef} />
        </div>
      </form>
    </>
  );
}
