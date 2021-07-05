import React from "react";
import styles from "./Card.module.scss";

function Card({
  id,
  title,
  imageUrl,
  price,
  onFavorite,
  delFavorites,
  onPlus,
  favorited = false,
}) {
  console.log(favorited);
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus({ title, imageUrl, price });
    setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    onFavorite({ id, title, imageUrl, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      <div className="favorite" onClick={onClickFavorite}>
        <img
          src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"}
          alt="unliked"
        />
      </div>

      <img width="133" height="112" src={imageUrl} alt="sneakers" />
      <p className="opacity-5">{title}</p>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price}</b>
        </div>
        <img
          onClick={onClickPlus}
          src={isAdded ? "/img/btn-checked.svg" : "/img/add.svg"}
          alt="add"
        />
      </div>
    </div>
  );
}

export default Card;
