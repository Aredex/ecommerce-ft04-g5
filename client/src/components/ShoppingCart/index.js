import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import { useRouteMatch, useHistory } from "react-router";
import useOrders from "hooks/useOrders";
import ItemCard from "components/ItemCard";

function ShoppingCart() {
  const [showCart, setShowCart] = useState(false);

  const { isExact: isHome } = useRouteMatch("/");
  const history = useHistory();

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
          {shoppingCart &&
            shoppingCart.products &&
            Array.isArray(shoppingCart.products) && (
              <span>Artículos ({shoppingCart.products.length})</span>
            )}
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
            ? shoppingCart.products.map((product) => <ItemCard
              key={product.id}
              product={product}
              removeProduct={removeProduct}
              increseAmount={increseAmount}
              decreaseAmount={decreaseAmount}
              showPrice
              showQuantity
            />
            )
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
              <button
                className={style.checkOut}
                onClick={() => {
                  setShowCart(false);
                  history.push("/checkout");
                }}
              >
                Finalizar orden
              </button>
            </>
          )}
        </section>
      </aside>
    </div>
  );
}

export default ShoppingCart;
