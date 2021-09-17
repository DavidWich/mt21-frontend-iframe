import { useTranslation } from "react-i18next";

import classes from "./CourseDetail.module.css";

export default function CourseDetail(props) {
  const { t } = useTranslation();

  const sendMailHandler = (event) => {
    event.preventDefault();
    if ("parentIFrame" in window) {
      window.parentIFrame.sendMessage(
        JSON.stringify({
          type: "MAILTO",
          recipient: `${props.courseData.abbreviation}@my-university.de`,
        })
      );
    } else {
      alert(t("courses.send_mail_error"));
    }
  };

  return (
    <div className={classes["course-detail"]}>
      <div className={classes.inline}>
        <h1>
          {props.courseData.course} ({props.courseData.abbreviation})
        </h1>
        <button onClick={sendMailHandler}>{t("courses.send_mail")}</button>
      </div>
      <h3>
        {t("courses.lecturer")}: {props.courseData.professor}
      </h3>
      <p>
        {t("courses.enrolled")}: {props.courseData.currentPeople}/
        {props.courseData.maxPeople}
      </p>
    </div>
  );
}
