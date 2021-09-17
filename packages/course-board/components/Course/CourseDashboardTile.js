import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import classes from "./CourseDashboardTile.module.css";
import fetchUserCourses from "../../assets/functions/fetch";

export default function CourseDashboardTile(props) {
  const { t } = useTranslation();
  const { email, token } = props;
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const f = async () => {
      if (email) {
        const data = await fetchUserCourses(email, token);
        if (data) {
          setCourses(data.courses);
        }
      }
    };
    f();
  }, [email]);

  const linkHandler = (data) => {
    if ("parentIFrame" in window) {
      const json = { type: "REDIRECT", page: `course/${data ? data : ""}` };
      window.parentIFrame.sendMessage(JSON.stringify(json));
    }
  };

  return (
    <div className={classes.dashboard}>
      <h2 onClick={() => linkHandler("")}>{t("dashboard.courses")}</h2>
      <ul className={classes["dashboard-items"]}>
        {courses.map((item) => (
          <li key={item._id} onClick={() => linkHandler(item.abbreviation)}>
            {item.course}
          </li>
        ))}
      </ul>
    </div>
  );
}
