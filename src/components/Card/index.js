import styles from "./Card.module.scss";

function Card(props) {
  return (
    <div className={styles.card}>
      <div className="favorite">
        <img src="/img/heart-unliked.svg" alt="unliked" />
      </div>

      <img width="133" height="112" src={props.imageUrl} alt="sneakers" />
      <p className="opacity-5">{props.title}</p>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{props.price}</b>
        </div>
        <button className={styles.button} onClick={props.onClick}>
          <img src="\img\add.svg" alt="add" />
        </button>
      </div>
    </div>
  );
}

export default Card;
