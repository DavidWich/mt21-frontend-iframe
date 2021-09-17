import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import classes from "./News.module.css";
import Card from "../UI/Card";
import Dropdown from "../UI/Dropdown";
import { NewsItem } from "./NewsItem";
import fetchUserCourses from "../../assets/functions/fetch";

export default function News(props) {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("ALL");
  const [courses, setCourses] = useState([]);
  const { email, token } = props;
  const filterChangeHandler = (value) => setFilter(value);

  useEffect(() => {
    const f = async () => {
      if (email) {
        const courses = await fetchUserCourses(email, token);
        setCourses(courses.courses);
      }
    };
    f();
  }, [email]);

  let filteredNews = [];
  switch (filter) {
    case "ALL":
      filteredNews = props.news.filter(
        (item) => item.course === "ALL" || courses.includes(item.course)
      );
      break;
    case "COURSE":
      filteredNews = props.news.filter(
        (item) => item.course !== "ALL" && courses.includes(item.course)
      );
      break;
    default:
      filteredNews = props.news.filter(
        (item) => item.course === filter && courses.includes(item.course)
      );
  }

  const filters = [
    { value: "ALL", text: t("news.all") },
    { value: "COURSE", text: t("news.course_news") },
  ].concat(courses.map((item) => ({ value: item, text: item })));

  const cardContent =
    filteredNews.length === 0 ? (
      <p>{t("news.not_found")}</p>
    ) : (
      <ul>
        {filteredNews.map((item) => (
          <NewsItem
            key={item.id}
            title={item.title}
            course={item.course}
            description={item.description}
            date={item.date}
            author={item.author}
          />
        ))}
      </ul>
    );

  return (
    <section className={classes.news}>
      <div className={classes.heading}>
        <h1>{t("news.news")}</h1>
        <Dropdown
          onChangeHandler={filterChangeHandler}
          styling={classes.filter}
          items={filters}
        />
      </div>
      <Card>{cardContent}</Card>
    </section>
  );
}
