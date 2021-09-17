import { useRouter } from "next/router";

import MailDashboardTile from "../../components/Mail/MailDashboardTile";

export default function DashboardPage() {
  const router = useRouter();
  const { email, token } = router.query;

  if (typeof email === "undefinded" || typeof token === "undefined") {
    return null;
  }

  return <MailDashboardTile email={email} token={token} />;
}
