import React from "react";
import ItemImage from "./ItemImage";
import style from "./style.module.scss";

const ImagesProduct = ({ prefix }) => {
    return (
        <div className={style.inputField}>
            <div className={style.prefix}>{prefix}</div>
            <div className={style.input}>
                <ItemImage />
                <ItemImage />             
            </div>
        </div>
    );
};

export default ImagesProduct;
