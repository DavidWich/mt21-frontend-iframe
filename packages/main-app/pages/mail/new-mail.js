import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import IframeLayout from "../../components/UI/IframeLayout";

export default function NewMailPage() {
  const router = useRouter();
  const { recipient } = router.query;
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const sender = useSelector((state) => state.auth.email);
  const token = useSelector((state) => state.auth.token);
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

  const src =
    `${process.env.NEXT_PUBLIC_IFRAME_URL_MAIL}/new-mail?sender=${sender}&token=${token}` +
    (recipient ? `&recipient=${recipient}` : "");

  return <IframeLayout src={src} />;
}
