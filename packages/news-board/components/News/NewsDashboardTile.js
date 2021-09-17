import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import classes from "./NewsDashboardTile.module.css";
import fetchUserCourses from "../../assets/functions/fetch";

export default function NewsDashboardTile(props) {
  const { t } = useTranslation();
  const [courses, setCourses] = useState([]);
  const { email, token } = props;

  const filteredNews = props.news.filter(
    (item) => item.course === "ALL" || courses.includes(item.course)
  );

  useEffect(() => {
    const f = async () => {
      if (email) {
        const courses = await fetchUserCourses(email, token);
        setCourses(courses.courses);
      }
    };
    f();
  }, [email]);

  const linkHandler = (event) => {
    event.preventDefault();
    if ("parentIFrame" in window) {
      window.parentIFrame.sendMessage(
        JSON.stringify({ type: "REDIRECT", page: "news" })
      );
    }
  };

  return (
    <div className={classes.dashboard}>
      <h2 onClick={linkHandler}>{t("dashboard.news")}</h2>
      <ul className={classes["dashboard-items"]}>
        {filteredNews.map((item) => (
          <li key={item.id}>
            <div className={classes.link} onClick={linkHandler}>
              {item.title}
            </div>
            <div className={classes["item-date"]}>{item.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
