import React from "react";
import style from "./index.module.scss";
import noImage from "noImage.svg";

const ProductCard = ({ img, title, price, onClick, stock }) => {
  return (
    <div className={style.card} onClick={onClick}>
      {img ? (
        <img src={img} alt={title} />
      ) : (
        <img className={style.noImage} src={noImage} alt={title} />
      )}
      {stock === 0 && <div className={style.noStock}>sin stock</div>}
      <section>
        <span className={style.price}>
          {"$ "}
          {price}
        </span>
        <span className={style.name}>{title}</span>
      
      </section>
      <span className={style.overlay}>Ver Más</span>
    </div>
  );
};

export default ProductCard;
