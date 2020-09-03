import React, { useState, useEffect } from "react";
import getById from "services/products/getById";
import { useParams } from "react-router";
import AddToCart from "components/AddToCart";
import style from "./index.module.scss";

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
      <div className={style.page}>
        <div className={style.carusel}>
          <img
            width="200"
            height="200"
            src="https://laslandas.com/wp-content/uploads/2019/11/abbaye-cluny1.jpg"
          />
        </div>
        <div className={style.name}>
          <h1>{product.name}</h1>
        </div>
        <div className={style.price}>
          <label>$</label>
          <p>{product.price}</p>
        </div>
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
        <div className={style.category}>
          <div className={style.separator}>Categorias</div>
          <section>
            {product.categories.map((category, key) => (
              <span key={key}>{category.name}</span>
            ))}
          </section>
        </div>
        <div className={style.description}>
          <div className={style.separator}>
            <span>Descripción</span>
          </div>
          {product.description}
        </div>
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
