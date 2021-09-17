import classes from "./NewsItem.module.css";

export function NewsItem(props) {
  const onClickHandler = (event) => {
    event.preventDefault();
    if ("parentIFrame" in window) {
      const json = { type: "REDIRECT", page: "course" };
      if (props.course !== "ALL" && props.course.length > 0) {
        json.page = json.page + `/${props.course}`;
      }
      window.parentIFrame.sendMessage(JSON.stringify(json));
    }
  };

  const parseCourse = (course) =>
    course === "ALL" || course.length === 0 ? (
      ""
    ) : (
      <div
        className={classes.course}
        onClick={onClickHandler}
      >{`[${course}]`}</div>
    );

  return (
    <li className={classes.single}>
      <div>
        <div className={classes.headline}>
          <h3>{props.title}</h3>
          {parseCourse(props.course)}
        </div>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.author}>
          - {props.author} ({props.date})
        </div>
      </div>
    </li>
  );
}
