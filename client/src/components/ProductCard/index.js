import React from "react";
import style from "./index.module.scss";
import noImage from "noImage.svg";

const ProductCard = ({ img, title, price, onClick }) => {
  return (
    <div className={style.card} onClick={onClick}>
      {img ? (
        <img src={img} alt={title} />
      ) : (
        <img className={style.noImage} src={noImage} alt={title} />
      )}
      <section>
        <span className={style.price}>
          {"$ "}
          {price}
        </span>
        <span className={style.name}>{title}</span>
      </section>
    </div>
  );
};

export default ProductCard;
