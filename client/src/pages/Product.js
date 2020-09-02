import React from "react";
import style from "./Product.module.scss";

const Product = () => {
  const [count, setCount] = React.useState(1);
  const [stock, setStock] = React.useState(20);

  const handleClick_suma = () => {
    setCount(count + 1);
  };

  const handleClick_resta = () => {
    if (count <= 1) {
      return 1;
    }

    setCount(count - 1);
  };
  return (
    <div>
      <img
        src="https://laslandas.com/wp-content/uploads/2019/11/abbaye-cluny1.jpg"
        alt="FotoPlanta"
        width="200"
        height="200"
      ></img>
      <h1>Abbaye de Cluny</h1>
      <p>$450</p>
      <p>Descripcion</p>
      <p>Tipo:Híbrida de té</p>

      {stock > 0 ? (
        <>
          <button>
            <i
              className={["fas", "fa-shopping-cart", style.icon].join(" ")}
            ></i>
            Añadir al Carro
          </button>
          <input value={count} readOnly></input>
          <button onClick={handleClick_suma} disabled={count === stock}>
            <i className={["fas", "fa-angle-up", style.icon].join(" ")}></i>
          </button>
          <button onClick={handleClick_resta} disabled={count === 1}>
            <i className={["fas", "fa-angle-down", style.icon].join(" ")}></i>
          </button>{" "}
        </>
      ) : (
        <h1>No contamos con stock</h1>
      )}
    </div>
  );
};

export default Product;
