import { MongoClient } from "mongodb";

import verifyToken from "../../assets/functions/verifyToken";

const handler = async (req, res) => {
  const { courseAbbreviation, token } = req.body;

  if (typeof token === "undefined") {
    return res
      .status(403)
      .json({ error: true, abbreviation: courseAbbreviation });
  }

  const code = await verifyToken(token);
  if (code != 200) {
    return res
      .status(code)
      .json({ error: true, abbreviation: courseAbbreviation });
  }

  const client = await MongoClient.connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const collection = client.db().collection("courses");
  const course = await collection.findOne({
    abbreviation: courseAbbreviation,
  });

  client.close();

  if (!course) {
    return res
      .status(code)
      .json({ error: true, abbreviation: courseAbbreviation });
  }

  return res.status(200).json({
    courseData: {
      id: course._id.toString(),
      course: course.course,
      abbreviation: course.abbreviation,
      professor: course.professor,
      currentPeople: course.currentPeople,
      maxPeople: course.maxPeople,
    },
  });
};

export default handler;
