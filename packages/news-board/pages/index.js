import { useRouter } from "next/router";
import { MongoClient } from "mongodb";

import News from "../components/News/News";

export default function HomePage(props) {
  const router = useRouter();
  const { email, token } = router.query;

  return <News news={props.news} email={email} token={token} />;
}

export const getStaticProps = async () => {
  const client = await MongoClient.connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  const collection = db.collection("news");
  const news = await collection.find().toArray();
  client.close();

  return {
    props: {
      news: news.map((item) => ({
        id: item._id.toString(),
        title: item.title,
        description: item.description,
        date: item.date,
        author: item.author,
        course: item.course ? item.course : "",
        content: item.content,
      })),
    },
    revalidate: 1,
  };
};
