import { useRouter } from "next/router";

import NewMail from "../../components/Mail/NewMail";

export default function DashboardPage() {
  const router = useRouter();
  const { sender, recipient, token } = router.query;

  if (typeof email === "undefinded" || typeof token === "undefined") {
    return null;
  }

  return <NewMail email={sender} recipient={recipient} token={token} />;
}
