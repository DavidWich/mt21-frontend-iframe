import { useRouter } from "next/router";

import Mail from "../components/Mail/Mail";

export default function HomePage() {
  const router = useRouter();
  const { email, token } = router.query;

  if (typeof email === "undefinded" || typeof token === "undefined") {
    return null;
  }

  return <Mail email={email} token={token} />;
}
