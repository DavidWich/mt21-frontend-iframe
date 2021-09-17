import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import classes from "./BibDashboardTile.module.css";

export default function BibDashboardTile(props) {
  const { token } = props;
  const { t } = useTranslation();
  const [books, setBooks] = useState([]);

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

  const onClickHandler = (event) => {
    event.preventDefault();
    if ("parentIFrame" in window) {
      window.parentIFrame.sendMessage(
        JSON.stringify({ type: "REDIRECT", page: "bib" })
      );
    }
  };

  return (
    <div className={classes.dashboard}>
      <h2 onClick={onClickHandler}>{t("dashboard.bib")}</h2>
      <ul className={classes["dashboard-items"]}>
        {books.map((item) => (
          <li key={item._id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
