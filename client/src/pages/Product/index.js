import React, { useState, useEffect } from "react";
import AddToCart from "components/AddToCart";
import noImage from "noImage.svg";
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


  var [selection, setSelection] = useState(1)
   var [index, setIndex] = useState(0)
   useEffect(()=>{

    const intervalo = setInterval(() => {
        console.log("Intervalo..." + index)
        if(index == (images.length-1)) setIndex(0)
        else setIndex(index + 1);
      }, 5000); 
      return ()=>{
        clearInterval(intervalo);
      }
   },[index])
 

var images =["https://www.acceseo.com/wp-content/uploads/2020/09/guillermo-villanueva-bonealive.jpg",
"https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg",
"https://www.w3schools.com/css/paris.jpg",
"https://www.w3schools.com/css/rock600x400.jpg",
"https://static.vecteezy.com/system/resources/previews/001/189/527/non_2x/palm-tree-png.png",
"https://www.jardineriaon.com/wp-content/uploads/2018/10/jubaea-chilensis-palmera-1024x683.jpg",
"https://images-na.ssl-images-amazon.com/images/I/61DHLYtetoL._AC_SY400_.jpg",
"https://revista-ambiente.com.ar/wp-content/uploads/2020/02/Caracter%C3%ADsticas-de-las-palmeras-777x437.jpg",
]

  const hableOnSubstract = () => {
    if (count <= 1) {
      return 1;
    }
    setCount(count - 1);
  };

  const handleImage = (type)=>{
    if(type == "right"){
      if(index == (images.length-1)){
        setIndex(0)
      }else{
        setIndex(index+1)
      }
    }else{
      if(index == 0){
        setIndex(images.length-1)
      }else{
        setIndex(index-1)
      }
    }
  }

  const { addProduct } = useOrders();

  if (product) {
    const imageURL = product.images[0]?.url || noImage;
    return (
      <div className={style.page}>
        <div className={style.carusel}>
          <button onClick={()=>handleImage("left")} className={style.leftd}>
          <i  className={["fas fa-angle-left", style.left].join(" ")}></i>
          </button>
          {images.map((e, i)=>(
            <img className ={index == i ?style.active:style.inactive}src={e} alt="" />
          ))}
          <button  onClick={()=>handleImage("right")}  className={style.rightd}>
          <i className={["fas fa-angle-right", style.right].join(" ")}></i>
          </button>
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
  } else
    return (
      <div>
        <span>Cargando...</span>
      </div>
    );
};

export default Product;
