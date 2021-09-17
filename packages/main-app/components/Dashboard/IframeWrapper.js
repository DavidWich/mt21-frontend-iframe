import IframeResizer from "iframe-resizer-react";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function IframeWrapper(props) {
  const { i18n } = useTranslation();
  const router = useRouter();
  const iframeRef = useRef(null);
  const { data } = props;
  const { language } = i18n;

  useEffect(() => {
    if (data) {
      iframeRef.current.sendMessage(data);
    }
  }, [data]);

  useEffect(() => {
    iframeRef.current.sendMessage({
      type: "CHANGELANG",
      detail: { language: language },
    });
  }, [language]);

  const onMessageHandler = (data) => {
    const json = JSON.parse(data.message);
    switch (json.type) {
      case "REDIRECT":
        router.push({ pathname: `/${json.page}`, query: { ...json.query } });
        break;
      default:
        props.onMessage(json);
    }
  };

  const onLoadHandler = () => {
    iframeRef.current.sendMessage({
      type: "CHANGELANG",
      detail: { language: language },
    });
  };

  return (
    <IframeResizer
      forwardRef={iframeRef}
      src={props.src}
      inPageLinks="true"
      style={{
        width: "1px",
        minWidth: "100%",
        maxHeight: "100%",
      }}
      scrolling="yes"
      frameBorder="0"
      onMessage={onMessageHandler}
      onLoad={onLoadHandler}
    />
  );
}
