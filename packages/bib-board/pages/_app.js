import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Script from "next/script";

import "../styles/globals.css";
import "../assets/i18n/i18n";

function MyApp({ Component, pageProps }) {
  const { i18n } = useTranslation();
  const [loaded, setLoaded] = useState(false);

  const parseMessage = useCallback(
    (event) => i18n.changeLanguage(event.detail.language),
    []
  );

  useEffect(() => {
    window.addEventListener("CHANGELANG", parseMessage);
    return () => {
      window.removeEventListener("CHANGELANG", parseMessage);
    };
  }, [parseMessage]);

  useEffect(() => {
    window.iFrameResizer = {
      targetOrigin: process.env.NEXT_PUBLIC_IFRAME_TARGET_ORIGIN,
    };
  }, []);

  useEffect(() => {
    setLoaded(true);
  }, [loaded]);

  return (
    <>
      <Component {...pageProps} />
      <Script>{(console.log = function () {})}</Script>
      <Script>{`var iFrameResizer = { onMessage: ${(msg) =>
        window.dispatchEvent(
          new CustomEvent(msg.type, { detail: msg.detail })
        )} }`}</Script>
      <Script src="iframeResizer.contentWindow.min.js"></Script>
    </>
  );
}

export default MyApp;
