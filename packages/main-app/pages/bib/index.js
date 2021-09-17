import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import IframeLayout from "../../components/UI/IframeLayout";
import { cartActions } from "../../store/cart-slice";

export default function BibPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const token = useSelector((state) => state.auth.token);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (!rendered) {
      setRendered(true);
    } else if (!isAuth) {
      router.replace("/");
    }
  }, [rendered, isAuth]);

  const onMessageHandler = (data) => {
    if (data.type === "REMOVEITEM") {
      dispatch(cartActions.removeItem({ id: data.book }));
    } else if (data.type === "ADDITEM") {
      dispatch(cartActions.addItem({ id: data.book }));
    }
  };

  if (typeof token === "undefined") {
    return null;
  }

  const src = `${process.env.NEXT_PUBLIC_IFRAME_URL_BIB}/?token=${token}`;

  const data = { type: "CHANGECART", detail: { cart: cart } };

  return <IframeLayout src={src} onMessage={onMessageHandler} data={data} />;
}
