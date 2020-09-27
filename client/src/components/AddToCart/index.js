import React, { useEffect, useState } from "react";
import style from "./index.module.scss";

const AddToCart = ({
    onAdd,
    onSubstract,
    onSubmit,
    value,
    disableAdd,
    disableSubstract,
    isAdded,
}) => {
    const [added, setAdded] = useState(false);

    useEffect(() => {
        if (isAdded) setAdded(true);
    }, [isAdded]);

    return (
        <div className={style.inputNumber}>
            <>
                <input value={value} readOnly></input>
                <section>
                    <button onClick={onAdd} disabled={disableAdd}>
                        <i className={["fas", "fa-angle-up"].join(" ")}></i>
                    </button>
                    <button onClick={onSubstract} disabled={disableSubstract}>
                        <i className={["fas", "fa-angle-down"].join(" ")}></i>
                    </button>
                </section>
            </>

            <button
                type="submit"
                className={style.submit}
                onClick={() => {
                    if (!added) {
                        onSubmit();
                        setAdded(true);
                    }
                }}
            >
                <>
                    <i className={["fas", "fa-shopping-cart"].join(" ")}></i>
                    {!added ? "Añadir al Carro" : "Tienes en el carro"}
                </>
            </button>
        </div>
    );
};

export default AddToCart;
