import React from "react";
import style from "./style.module.scss";

const ItemImage = () => {
    return (
        <div className={style.imagec}>
            <div className={style.imagecerrar}>x</div>
            <img
                src="https://cdn.shopify.com/s/files/1/1014/9297/products/cactuscoreanonaranjaplanogeneralcalyxplantasbogota-193911_590x.jpg?v=1599109373"
                alt="a"
            />
        </div>
    );
};

export default ItemImage;
