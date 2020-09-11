import React, { useState } from "react";
import style from "./index.module.scss";

const AddToCart = ({
  onAdd,
  onSubstract,
  onSubmit,
  value,
  disableAdd,
  disableSubstract,
}) => {
  const [added, setAdded] = useState(false);
  return (
    <div className={style.inputNumber}>
      {!added && (
        <>
          <input value={value} readOnly></input>
          <section>
            <button onClick={onAdd} disabled={disableAdd}>
              <i className={["fas", "fa-angle-up"].join(" ")}></i>
            </button>
            <button onClick={onSubstract} disabled={disableSubstract}>
              <i className={["fas", "fa-angle-down"].join(" ")}></i>
            </button>
          </section>
        </>
      )}
      <button
        type="submit"
        className={style.submit}
        onClick={() => {
          if (!added) {
            onSubmit();
            setAdded(true);
          }
        }}
      >
        {!added ? (
          <>
            <i className={["fas", "fa-shopping-cart"].join(" ")}></i>
            {"Añadir al Carro"}
          </>
        ) : (
          <>Gracias!</>
        )}
      </button>
    </div>
  );
};

export default AddToCart;
