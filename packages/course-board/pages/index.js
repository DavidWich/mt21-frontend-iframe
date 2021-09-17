import { useRouter } from "next/router";

import Course from "../components/Course/Course";

export default function HomePage() {
  const router = useRouter();
  const { email, token } = router.query;

  if (typeof email === "undefinded" || typeof token === "undefined") {
    return null;
  }

  return <Course email={email} token={token} />;
}
