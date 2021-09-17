import classes from "./BibItem.module.css";

export function BibItem(props) {
  const onAdd = (event) => {
    event.preventDefault();
    if ("parentIFrame" in window) {
      const type = props.added ? "REMOVEITEM" : "ADDITEM";
      window.parentIFrame.sendMessage(
        JSON.stringify({ type: type, book: props.id })
      );
    }
  };

  return (
    <li className={classes.single}>
      <div>
        <div className={classes.side}>
          <h3>
            {props.title} ({props.year})
          </h3>
          <button onClick={onAdd}>{props.added ? "✓" : "+"}</button>
        </div>
        <div className={classes.description}>{props.author}</div>
        <div className={classes.description}>{props.isbn}</div>
      </div>
    </li>
  );
}
