import { useRouter } from "next/router";

import CourseDashboardTile from "../../components/Course/CourseDashboardTile";

export default function DashboardPage() {
  const router = useRouter();
  const { email, token } = router.query;

  if (typeof email === "undefinded" || typeof token === "undefined") {
    return null;
  }

  return <CourseDashboardTile email={email} token={token} />;
}
