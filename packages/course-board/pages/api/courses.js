import { MongoClient } from "mongodb";

import verifyToken from "../../assets/functions/verifyToken";

const handler = async (req, res) => {
  const { email, token } = req.body;

  if (typeof token === "undefined") {
    return res.status(403).json({});
  }

  const code = await verifyToken(token);
  if (code != 200) {
    return res.status(code).json({});
  }

  const client = await MongoClient.connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();

  const accountsColl = db.collection("accounts");
  const { courses } = await accountsColl.findOne({ id: email }, { courses: 1 });

  const courseColl = db.collection("courses");
  const courseContents = await courseColl
    .find({ abbreviation: { $in: courses } })
    .toArray();

  client.close();

  res.status(201).json({ courses: courseContents });
};

export default handler;
