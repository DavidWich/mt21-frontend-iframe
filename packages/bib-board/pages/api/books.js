import { MongoClient } from "mongodb";

import verifyToken from "../../assets/functions/verifyToken";

const handler = async (req, res) => {
  const { token } = req.body;

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
  const coll = db.collection("books");
  const books = await coll.find().toArray();

  client.close();
  return res.status(200).json({ books });
};

export default handler;
