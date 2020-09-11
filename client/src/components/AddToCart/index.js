import React from "react";
import style from "./index.module.scss";

const AddToCart = ({
  onAdd,
  onSubstract,
  onSubmit,
  value,
  disableAdd,
  disableSubstract,
}) => {
  return (
    <div className={style.inputNumber}>
      <input value={value} readOnly></input>
      <section>
        <button onClick={onAdd} disabled={disableAdd}>
          <i className={["fas", "fa-angle-up"].join(" ")}></i>
        </button>
        <button onClick={onSubstract} disabled={disableSubstract}>
          <i className={["fas", "fa-angle-down"].join(" ")}></i>
        </button>
      </section>
      <button type="submit" className={style.submit} onClick={onSubmit}>
        <i className={["fas", "fa-shopping-cart"].join(" ")}></i>
        Añadir al Carro
      </button>
    </div>
  );
};

export default AddToCart;
