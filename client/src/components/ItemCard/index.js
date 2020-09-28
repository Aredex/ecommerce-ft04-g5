import Card from "components/Card";
import React from "react";
import style from "./index.module.scss";

function ItemCard({
    product,
    removeProduct,
    increseAmount,
    decreaseAmount,
    showPrice,
    showQuantity,
    showAmount,
}) {
    return (
        <Card className={style.itemCard}>
            <div className={style.productName}>
                <h3>{product.name}</h3>
                <i
                    className={["far fa-times-circle", style.removeButton].join(
                        " "
                    )}
                    onClick={() => removeProduct(product.id)}
                />
            </div>
            <div className={style.data}>
                {showPrice && (
                    <div className={style.dataItem}>
                        <label>Precio:</label>
                        <span className={style.money}>
                            ${" "}
                            {Number(product.price).toLocaleString("es", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </span>
                    </div>
                )}
                {showQuantity && (
                    <div className={style.dataItem}>
                        <label>Cantidad:</label>
                        <span>
                            <div style={{ paddingLeft: "2rem" }}>
                                {product.amount}
                            </div>
                            <section>
                                <button
                                    onClick={() => increseAmount(product.id)}
                                    disabled={product.amount === product.stock}
                                >
                                    <i
                                        className={["fas", "fa-angle-up"].join(
                                            " "
                                        )}
                                    ></i>
                                </button>
                                <button
                                    onClick={() => decreaseAmount(product.id)}
                                    disabled={product.amount === 1}
                                >
                                    <i
                                        className={[
                                            "fas",
                                            "fa-angle-down",
                                        ].join(" ")}
                                    ></i>
                                </button>
                            </section>
                        </span>
                    </div>
                )}
                {showAmount && (
                    <div className={style.dataItem}>
                        <label>Importe:</label>
                        <span className={style.money}>
                            ${" "}
                            {Number(
                                product.price * product.amount
                            ).toLocaleString("es", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </span>
                    </div>
                )}
            </div>
        </Card>
    );
}

export default ItemCard;
