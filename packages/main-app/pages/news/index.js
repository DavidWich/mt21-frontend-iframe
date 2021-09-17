import { useSelector } from "react-redux";

import IframeLayout from "../../components/UI/IframeLayout";

export default function NewsPage() {
  const email = useSelector((state) => state.auth.email);
  const token = useSelector((state) => state.auth.token);

  const src =
    typeof token !== "undefined" && typeof email !== "undefined"
      ? `${process.env.NEXT_PUBLIC_IFRAME_URL_NEWS}/?email=${email}&token=${token}`
      : `${process.env.NEXT_PUBLIC_IFRAME_URL_NEWS}`;

  return <IframeLayout src={src} />;
}
