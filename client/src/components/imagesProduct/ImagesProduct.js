import ImagesContainer from "components/ImagesContainer";
import React from "react";
import style from "./style.module.scss";

const ImagesProduct = ({ prefix, id, estado }) => {
    return (
        <div className={style.inputField}>
            <div className={style.prefix}>{prefix}</div>
            <ImagesContainer id={id} estado={estado} />
        </div>
    );
};

export default ImagesProduct;
