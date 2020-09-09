import React, { useState, useEffect } from "react";
import getById from "services/products/getById";
import { useParams, useHistory } from "react-router";
import AddToCart from "components/AddToCart";
import noImage from "noImage.svg";
import style from "./index.module.scss";
import { getProductDetail } from "store/Actions/Products/ProductsActions";
import { useDispatch, useSelector } from "react-redux";
import ReviewButton from "components/ReviewButton";

const Product = (props) => {
  const [count, setCount] = useState(1);

  let { id } = useParams();

  const dispatch = useDispatch();

  const product = useSelector((x) => x.ProductsReducer.productDetail);

  useEffect(() => {
    (async () => {
      dispatch(await getProductDetail(id));
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
    const imageURL = product.images[0]?.url || noImage;
    return (
      <div className={style.page}>
        <div className={style.carusel}>
          <img width="200" height="200" src={imageURL} alt="" />
        </div>
        <div className={style.info}>
          <div className={style.name}>
            <h1>{product.name}</h1>
          </div>
          <div className={style.price}>
            <label>$</label>
            <p>{product.price}</p>
          </div>
          <ReviewButton
            rating={2.3}
            reviews={[
              {
                id: 1,
                rating: 2,
                message: "Porque tenemos que pelear con redux?🤬",
              },
            ]}
          />
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
          </div>
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
