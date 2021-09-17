import { useRouter } from "next/dist/client/router";

import Bib from "../components/Bib/Bib";

export default function HomePage() {
  const router = useRouter();
  const { token } = router.query;

  if (typeof token === "undefined") {
    return null;
  }

  return <Bib token={token} />;
}
