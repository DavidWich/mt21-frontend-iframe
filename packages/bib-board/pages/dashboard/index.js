import { useRouter } from "next/dist/client/router";

import BibDashboardTile from "../../components/Bib/BibDashboardTile";

export default function BibPage() {
  const router = useRouter();
  const { token } = router.query;

  if (typeof token === "undefined") {
    return null;
  }

  return <BibDashboardTile token={token} />;
}
