import ImagesContainer from "components/ImagesContainer";
import React from "react";
import style from "./style.module.scss";

const ImagesProduct = ({ prefix, id, estado, setFieldValue, values }) => {
    return (
        <div className={style.inputField}>
            <div className={style.prefix}>{prefix}</div>
            <ImagesContainer
                id={id}
                estado={estado}
                setFieldValue={setFieldValue}
                values={values}
            />
        </div>
    );
};

export default ImagesProduct;
