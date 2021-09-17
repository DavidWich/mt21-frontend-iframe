import { MongoClient } from "mongodb";

import verifyToken from "../../assets/functions/verifyToken";

const handler = async (req, res) => {
  const { email, token } = req.body;

  if (typeof email === "undefined" || typeof token === "undefined") {
    return { props: { books: [] } };
  }

  const code = await verifyToken(token);
  if (code !== 200) {
    return { props: { mails: [] } };
  }

  const client = await MongoClient.connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  const collection = db.collection("mails");
  const emails = await collection.find({ recipient: email }).toArray();
  client.close();

  res.status(201).json({ emails: emails });
};

export default handler;
