import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import classes from "./Course.module.css";
import Card from "../UI/Card";
import { CourseItem } from "./CourseItem";
import fetchUserCourses from "../../assets/functions/fetch";

export default function Course(props) {
  const { email, token } = props;
  const { t } = useTranslation();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if ("parentIFrame" in window) {
      window.parentIFrame.sendMessage(JSON.stringify({ type: "BACK" }));
    }

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

  return (
    <section className={classes.course}>
      <h1>{t("courses.courses")}</h1>
      <Card>
        <ul>
          {courses.map((item) => (
            <CourseItem
              key={item._id}
              course={item.course}
              abbreviation={item.abbreviation}
              professor={item.professor}
              currentPeople={item.currentPeople}
              maxPeople={item.maxPeople}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
}
