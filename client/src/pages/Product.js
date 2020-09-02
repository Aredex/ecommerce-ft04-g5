import React, { useState, useEffect } from "react";
import getById from "services/products/getById";
import style from "./Product.module.scss";
import { useParams } from "react-router";
const AddToCart = ({
  onAdd,
  onSubstract,
  value,
  disableAdd,
  disableSubstract,
}) => {
  return (
    <>
      <button>
        <i className={["fas", "fa-shopping-cart", style.icon].join(" ")}></i>
        Añadir al Carro
      </button>
      <input value={value} readOnly></input>
      <button onClick={onAdd} disabled={disableAdd}>
        <i className={["fas", "fa-angle-up", style.icon].join(" ")}></i>
      </button>
      <button onClick={onSubstract} disabled={disableSubstract}>
        <i className={["fas", "fa-angle-down", style.icon].join(" ")}></i>
      </button>{" "}
    </>
  );
};
const Product = () => {
  const [count, setCount] = useState(1);

  const [product, setProduct] = useState(null);

  let { id } = useParams();

  useEffect(() => {
    (async () => {
      const result = await getById(id);
      setProduct(result);
    })();
  }, [id]);

  const handleOnAdd = () => {
    setCount(count + 1);
  };

  const hableOnSubstract = () => {
    if (count <= 1) {
      return 1;
    }

    setCount(count - 1);
  };
  if (product) {
    return (
      <div>
        <img
          src="https://laslandas.com/wp-content/uploads/2019/11/abbaye-cluny1.jpg"
          alt="FotoPlanta"
          width="200"
          height="200"
        ></img>
        <h1>{product.name}</h1>
        <p>{product.price}</p>
        <p>{product.description}</p>
        {product.categories.map((category, key) => (
          <p key={key}>{category.name}</p>
        ))}

        {product.stock > 0 ? (
          <AddToCart
            onAdd={handleOnAdd}
            onSubstract={hableOnSubstract}
            value={count}
            disableAdd={count === product.stock}
            disableSubstract={count === 1}
          />
        ) : (
          <h1>No contamos con stock</h1>
        )}
      </div>
    );
  } else
    return (
      <div>
        <span>Cargando...</span>
      </div>
    );
};

export default Product;
