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

    const history = useHistory();
    const product = useSelector((x) => x.ProductsReducer.productDetail);

    const dispatch = useDispatch();

    const { id } = useParams();

    const products = useSelector(
        (state) => state.orders?.shoppingCart?.products
    );

    const [isAdded, setIsAdded] = useState(false);

    const { addProduct } = useOrders();

    let TheProductOnCart = null;

    const linkProducts = () => {
        if (products && products?.length > 0 && id) {
            TheProductOnCart = products.find((p) => p.id === parseInt(id));
            if (TheProductOnCart) {
                setCount(TheProductOnCart.amount);
                setIsAdded(true);
            } else {
                setIsAdded(false);
                setCount(1);
            }
        } else {
            setCount(1);
            setIsAdded(false);
        }
    };

    useEffect(() => {

        linkProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps

        // TheProductOnCart = products.find((product) => product.id === id);
        // if (TheProductOnCart) {
        //     setCount(TheProductOnCart.amount);
        // }
        console.log(products);
    }, [products]);

    useEffect(() => {
        dispatch(getProductDetail(id));
        return () => {
            dispatch(getProductDetail());
        };
    }, [dispatch, id]);

    const handleOnAdd = () => {
        setCount(count + 1);
        // setIsAdded(false);
    };

    const hableOnSubstract = () => {
        if (count <= 1) {
            return 1;
        }

        setCount(count - 1);
        // setIsAdded(false);
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
                        reviews={product.reviews}
                        idProduct={product.id}
                    />
                    {product.stock > 0 ? (
                        <AddToCart
                            isAdded={isAdded}
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
                                        history.push(
                                            `/products?category=${category.id}`
                                        )
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
                </div>
            </div>
        );
    } else return <Load></Load>;
};

export default Product;
