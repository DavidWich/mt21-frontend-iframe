import Head from "next/head";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import Dashboard from "../components/Dashboard/Dashboard";
import Welcome from "../components/Welcome/Welcome";

export default function Home() {
  const { t } = useTranslation();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (isAuth) {
    return (
      <>
        <Head>
          <meta name="description" content={t("meta_description.dashboard")} />
        </Head>
        <Dashboard />
      </>
    );
  }

  return (
    <>
      <Head>
        <meta name="description" content={t("meta_description.home")} />
      </Head>
      <Welcome />
    </>
  );
}
