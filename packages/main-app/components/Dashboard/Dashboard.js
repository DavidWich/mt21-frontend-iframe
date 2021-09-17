import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import classes from "./Dashboard.module.css";
import Card from "../UI/Card";
import IframeWrapper from "./IframeWrapper";

export default function Dashboard() {
  const { t } = useTranslation();
  const email = useSelector((state) => state.auth.email);
  const token = useSelector((state) => state.auth.token);

  if (typeof email === "undefined" || typeof token === "undefined") {
    return null;
  }

  const newsSrc = `${process.env.NEXT_PUBLIC_IFRAME_URL_NEWS}/dashboard?email=${email}&token=${token}`;

  const mailSrc = `${process.env.NEXT_PUBLIC_IFRAME_URL_MAIL}/dashboard?email=${email}&token=${token}`;

  const courseSrc = `${process.env.NEXT_PUBLIC_IFRAME_URL_COURSE}/dashboard?email=${email}&token=${token}`;

  const bibSrc = `${process.env.NEXT_PUBLIC_IFRAME_URL_BIB}/dashboard?token=${token}`;

  return (
    <div className={classes.dashboard}>
      <h1>{t("dashboard.title")}</h1>
      <div className={classes.side}>
        <Card styles={classes.single}>
          <IframeWrapper src={newsSrc} />
        </Card>
        <Card styles={classes.single}>
          <IframeWrapper src={courseSrc} />
        </Card>
      </div>
      <div className={classes.side}>
        <Card styles={classes.single}>
          <IframeWrapper src={mailSrc} />
        </Card>
        <Card styles={classes.single}>
          <IframeWrapper src={bibSrc} />
        </Card>
      </div>
    </div>
  );
}
