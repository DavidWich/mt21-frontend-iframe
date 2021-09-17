import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import IframeLayout from "../../components/UI/IframeLayout";

export default function MailPage() {
  const router = useRouter();
  const email = useSelector((state) => state.auth.email);
  const token = useSelector((state) => state.auth.token);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (!rendered) {
      setRendered(true);
    } else if (!isAuth) {
      router.replace("/");
    }
  }, [rendered, isAuth]);

  if (!isAuth || typeof email === "undefined" || typeof token === "undefined") {
    return null;
  }

  const src = `${process.env.NEXT_PUBLIC_IFRAME_URL_MAIL}/?email=${email}&token=${token}`;

  return <IframeLayout src={src} />;
}
