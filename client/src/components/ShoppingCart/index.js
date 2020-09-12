import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import { useRouteMatch } from "react-router";
import useOrders from "hooks/useOrders";
function ShoppingCart() {
  const [showCart, setShowCart] = useState(false);

  const { isExact: isHome } = useRouteMatch("/");

  useEffect(() => {
    setShowCart(false);
  }, []);

  const {
    shoppingCart,
    increseAmount,
    decreaseAmount,
    removeProduct,
  } = useOrders();

  return (
    <div className={style.menu}>
      <button
        className={style.buttonMenu}
        onClick={() => setShowCart(!showCart)}
      >
        <i className="fas fa-shopping-basket"></i>
        {shoppingCart &&
          shoppingCart.products &&
          Array.isArray(shoppingCart.products) && (
            <span className={style.badge}>{shoppingCart.products.length}</span>
          )}
      </button>
      <aside
        className={[
          showCart ? style.showCart : "",
          isHome ? style.inHome : "",
        ].join(" ")}
      >
        <header>
          <button
            className={style.buttonMenu}
            onClick={() => setShowCart(!showCart)}
          >
            <i className="fas fa-times"></i>
          </button>
        </header>
        <section>
          {shoppingCart &&
          shoppingCart.products &&
          Array.isArray(shoppingCart.products)
            ? shoppingCart.products.map((product) => (
                <div className={style.productCard} key={product.id}>
                  <h3 className={style.productName}>
                    {product.name}
                    <i
                      className={[
                        "far fa-times-circle",
                        style.removeButton,
                      ].join(" ")}
                      onClick={() => removeProduct(product.id)}
                    />
                  </h3>
                  <div className={style.data}>
                    <div className={style.dataItem}>
                      <label>Precio:</label>
                      <span className={style.money}>
                        {Number(product.price).toLocaleString("es", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className={style.dataItem}>
                      <label>Cantidad:</label>
                      <span>
                        <div style={{ paddingLeft: "2rem" }}>
                          {product.amount}
                        </div>
                        <section>
                          <button
                            onClick={() => increseAmount(product.id)}
                            disabled={false}
                          >
                            <i className={["fas", "fa-angle-up"].join(" ")}></i>
                          </button>
                          <button
                            onClick={() => decreaseAmount(product.id)}
                            disabled={false}
                          >
                            <i
                              className={["fas", "fa-angle-down"].join(" ")}
                            ></i>
                          </button>
                        </section>
                      </span>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </section>
        <section>
          {shoppingCart && (
            <>
              <div className={style.totalOrder}>
                <span>Total:</span>
                <span className={style.money}>
                  {Number(shoppingCart.total).toLocaleString("es", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <button className={style.checkOut}>Finalizar orden</button>
            </>
          )}
        </section>
      </aside>
    </div>
  );
}

export default ShoppingCart;
