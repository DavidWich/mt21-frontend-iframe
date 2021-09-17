import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import IframeLayout from "../../components/UI/IframeLayout";

export default function CourseDetailPage() {
  const router = useRouter();
  const email = useSelector((state) => state.auth.email);
  const token = useSelector((state) => state.auth.token);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const { courseAbbreviation } = router.query;
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (!rendered) {
      setRendered(true);
    } else if (!isAuth) {
      router.replace("/");
    }
  }, [rendered, isAuth]);

  if (!isAuth) {
    return null;
  }

  if (typeof email === "undefined" || typeof token === "undefined") {
    return null;
  }

  const onMessageHandler = (data) => {
    switch (data.type) {
      case "BACK":
        router.push("/course");
        break;
      case "MAILTO":
        router.push({
          pathname: "/mail/new-mail",
          query: {
            sender: email,
            recipient: data.recipient,
          },
        });
        break;
    }
  };

  const src = `${process.env.NEXT_PUBLIC_IFRAME_URL_COURSE}/${courseAbbreviation}?email=${email}&token=${token}`;

  return <IframeLayout src={src} onMessage={onMessageHandler} />;
}
