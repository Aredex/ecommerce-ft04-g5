import React, { useState, useEffect } from "react";
import style from "./index.module.scss";

function ShoppingCart() {
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    setShowCart(false);
  }, []);
  return (
    <div className={style.menu}>
      <button
        className={style.buttonMenu}
        onClick={() => setShowCart(!showCart)}
      >
        <i className="fas fa-shopping-basket"></i>
        <span className={style.badge}>1</span>
      </button>
      <aside className={showCart ? style.showCart : ""}>
        <section>
          <header>
            <button
              className={style.buttonMenu}
              onClick={() => setShowCart(!showCart)}
            >
              <i className="fas fa-times"></i>
            </button>
          </header>
          <div className={style.productCard}>
            <h3 className={style.productName}>
              Palmera Pindó
              <i
                className={["far fa-times-circle", style.removeButton].join(
                  " "
                )}
                onClick={() => null}
              />
            </h3>
            <div className={style.data}>
              <div className={style.dataItem}>
                <label>Precio:</label>
                <span>$ 1.200</span>
              </div>
              <div className={style.dataItem}>
                <label>Cantidad:</label>
                <span>
                  <div style={{ paddingLeft: "2rem" }}>1</div>
                  <section>
                    <button onClick={() => null} disabled={false}>
                      <i className={["fas", "fa-angle-up"].join(" ")}></i>
                    </button>
                    <button onClick={() => null} disabled={false}>
                      <i className={["fas", "fa-angle-down"].join(" ")}></i>
                    </button>
                  </section>
                </span>
              </div>
            </div>
          </div>
        </section>
        <section>
          <button className={style.checkOut}>Finalizar orden</button>
        </section>
      </aside>
    </div>
  );
}

export default ShoppingCart;
