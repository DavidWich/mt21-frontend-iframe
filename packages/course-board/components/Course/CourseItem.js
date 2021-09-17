import { useTranslation } from "react-i18next";

import classes from "./CourseItem.module.css";

export function CourseItem(props) {
  const { t } = useTranslation();

  const onClickHandler = (event) => {
    event.preventDefault();
    if ("parentIFrame" in window) {
      window.parentIFrame.sendMessage(
        JSON.stringify({
          type: "REDIRECT-COURSE",
          abbreviation: props.abbreviation,
        })
      );
    }
  };

  return (
    <li className={classes.single}>
      <div>
        <h3 id={`course_${props.abbreviation}`} onClick={onClickHandler}>
          {`${props.course} (${props.abbreviation})`}
        </h3>
        <div className={classes.description}>{props.professor}</div>
        <div className={classes.description}>
          {props.currentPeople}/{props.maxPeople} {t("courses.people")}
        </div>
      </div>
    </li>
  );
}
