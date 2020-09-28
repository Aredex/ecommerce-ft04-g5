import React, { useState, useEffect } from "react";
import AddToCart from "components/AddToCart";
import Load from "components/Load";
import noImage from "assets/noImage.svg";
import style from "./index.module.scss";
import { getProductDetail } from "store/Actions/Products/ProductsActions";
import { useSelector, useDispatch } from "react-redux";
import ReviewButton from "components/ReviewButton";
import useOrders from "hooks/useOrders";
import { useHistory, useParams } from "react-router";

const Product = () => {
  const [count, setCount] = useState(1);

  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getProductDetail(id));
    return () => {
      dispatch(getProductDetail());
    };
  }, [dispatch, id]);
  const history = useHistory();
  const product = useSelector((x) => x.ProductsReducer.productDetail);
  const handleOnAdd = () => {
    setCount(count + 1);
  };

  var [index, setIndex] = useState(0)
  useEffect(() => {
    if (product) {
      if (product.images[0]) {
        const intervalo = setInterval(() => {
          if (index === (product.images.length - 1)) setIndex(0)
          else setIndex(index + 1);
        }, 5000);
        return () => {
          clearInterval(intervalo);
        }
      }
    }
  }, [index, product])

  const hableOnSubstract = () => {
    if (count <= 1) {
      return 1;
    }
    setCount(count - 1);
  };
  const handleImage = (type) => {
    if (type === "right") {
      if (index === (product.images.length - 1)) {
        setIndex(0)
      } else {
        setIndex(index + 1)
      }
    } else {
      if (index === 0) {
        setIndex(product.images.length - 1)
      } else {
        setIndex(index - 1)
      }
    }
  }
  const { addProduct } = useOrders();
  if (product) {
    const images = product.images[0] ? product.images : [{ url: noImage }]
    return (
      <div className={style.page}>
        <div className={style.carusel}>
          {product.images[0] &&
            <button onClick={() => handleImage("left")} className={style.leftd}>
              <i className={["fas fa-angle-left", style.left].join(" ")}></i>
            </button>
          }
          {images.map((e, i) => (
            <img key={i} className={index === i ? style.active : style.inactive} src={e.url} alt="" />
          ))}
          {product.images[0] &&
            <button onClick={() => handleImage("right")} className={style.rightd}>
              <i className={["fas fa-angle-right", style.right].join(" ")}></i>
            </button>
          }
        </div>
        <div className={style.info}>
          <div className={style.name}>
            <h1>{product.name}</h1>
          </div>
          <div className={style.price}>
            <label>$</label>
            <p>{product.price}</p>
          </div>
          <ReviewButton reviews={product.reviews} idProduct={product.id} />
          {product.stock > 0 ? (
            <AddToCart
              onAdd={handleOnAdd}
              onSubstract={hableOnSubstract}
              value={count}
              disableAdd={count === product.stock}
              disableSubstract={count === 1}
              onSubmit={() =>
                addProduct(
                  product.id,
                  product.name,
                  product.price,
                  count,
                  product.stock
                )
              }
            />
          ) : (
              <h1>No contamos con stock</h1>
            )}
          <div className={style.category}>
            <div className={style.separator}>Categorias</div>
            <section>
              {product.categories.map((category, key) => (
                <span
                  key={key}
                  onClick={() =>
                    history.push(`/products?category=${category.id}`)
                  }
                >
                  {category.name}
                </span>
              ))}
            </section>
          </div>
          <div className={style.description}>
            <div className={style.separator}>
              <span>Descripción</span>
            </div>
            {product.description}
          </div>
          <div className={style.description}>
            <div className={style.separator}>
              <span>Reviews</span>
            </div>
          </div>
        </div>
      </div>
    );
  } else return <Load></Load>;
};

export default Product;
