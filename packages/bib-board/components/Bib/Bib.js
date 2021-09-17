import { useTranslation } from "react-i18next";

import classes from "./Bib.module.css";
import Card from "../UI/Card";
import { BibItem } from "./BibItem";
import { useCallback, useEffect, useState } from "react";

export default function Bib(props) {
  const { token } = props;
  const { t } = useTranslation();
  const [cart, setCart] = useState([]);
  const [books, setBooks] = useState([]);

  const parseMessage = useCallback((event) => setCart(event.detail.cart));

  useEffect(() => {
    window.addEventListener("CHANGECART", parseMessage);
    return () => {
      window.removeEventListener("CHANGECART", parseMessage);
    };
  }, [parseMessage]);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch("/api/books", {
        method: "POST",
        body: JSON.stringify({ token: token }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setBooks([...data.books]);
    };
    fetchItems();
  }, []);

  return (
    <section className={classes.bib}>
      <h1>{t("bib.library")}</h1>
      <Card>
        <ul>
          {books.map((item) => (
            <BibItem
              key={item._id}
              id={item._id}
              title={item.title}
              author={item.author}
              year={item.year}
              isbn={item.isbn}
              added={cart.includes(item._id)}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
}
