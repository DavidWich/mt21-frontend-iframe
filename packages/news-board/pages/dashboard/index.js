import { MongoClient } from "mongodb";
import { useRouter } from "next/router";

import NewsDashboardTile from "../../components/News/NewsDashboardTile";

export default function DashboardPage(props) {
  const router = useRouter();
  const { email, token } = router.query;

  return (
    <NewsDashboardTile
      news={props.news}
      message={props.message}
      email={email}
      token={token}
    />
  );
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
