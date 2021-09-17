import { MongoClient } from "mongodb";

import verifyToken from "../../assets/functions/verifyToken";

const handler = async (req, res) => {
  const { sender, recipient, subject, content, token } = req.body;

  const code = await verifyToken(token);
  if (code !== 200) {
    return res.status(403).json({ message: "Not authenticated" });
  }

  const client = await MongoClient.connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  const coll = db.collection("mails");

  await coll.insertOne({
    sender,
    recipient,
    subject,
    content,
  });

  client.close();

  res.status(201).json({ message: "Sent" });
};

export default handler;
