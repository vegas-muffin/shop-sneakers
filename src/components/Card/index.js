import React from "react";
import ContentLoader from "react-content-loader";

import AppContext from "../../context";

import styles from "./Card.module.scss";

function Card({
  id,
  title,
  imageUrl,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);
  
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  console.log(title, isItemAdded(id));

  const onClickPlus = () => {
    onPlus({ id, title, imageUrl, price });
  };

  const onClickFavorite = () => {
    onFavorite({ id, title, imageUrl, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={265}
          viewBox="0 0 150 275"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="91" />
          <rect x="0" y="107" rx="3" ry="3" width="150" height="15" />
          <rect x="108" y="155" rx="8" ry="8" width="32" height="32" />
          <rect x="0" y="126" rx="0" ry="0" width="93" height="15" />
          <rect x="0" y="163" rx="8" ry="8" width="80" height="24" />
        </ContentLoader>
      ) : (
        <>
          <div className="favorite" onClick={onClickFavorite}>
            <img
              src={
                isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"
              }
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
              src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/add.svg"}
              alt="add"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
