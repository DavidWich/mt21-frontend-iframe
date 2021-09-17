import { MongoClient } from "mongodb";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import CourseDetail from "../../components/Course/CourseDetail";
import CourseError from "../../components/Course/CourseError";

export default function CourseDetailPage() {
  const router = useRouter();
  const { courseAbbreviation, token } = router.query;
  const [course, setCourse] = useState({});

  useEffect(() => {
    const fetchCourseData = async (token) => {
      const res = await fetch("/api/courseDetail", {
        method: "POST",
        body: JSON.stringify({
          courseAbbreviation: courseAbbreviation,
          token: token,
        }),
        headers: { "CONTENT-TYPE": "application/json" },
      });
      const data = await res.json();
      setCourse(data);
    };
    if (typeof token !== "undefined") {
      fetchCourseData(token);
    }
  }, [courseAbbreviation, token]);

  if (typeof token === "undefined") {
    return null;
  }

  if (course.error) {
    return <CourseError abbreviation={course.abbreviation} />;
  } else if (course.courseData) {
    return <CourseDetail courseData={course.courseData} />;
  }

  return null;
}

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const collection = client.db().collection("courses");
  const courses = await collection.find({}, { abbreviation: 1 }).toArray();

  client.close();

  return {
    fallback: "blocking",
    paths: courses.map((course) => ({
      params: { courseAbbreviation: course.abbreviation },
    })),
  };
};

export const getStaticProps = async () => {
  return { props: {} };
};
