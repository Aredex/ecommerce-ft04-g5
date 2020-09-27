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
    const [firstTime, setFirstTime] = useState(true);

    useEffect(() => {
        if (isAdded) setAdded(true);
        else setAdded(false);
    }, [isAdded]);

    const handleOnAdd = () => {
        onAdd();
        setFirstTime(false);
    };

    const handleOnSubstract = () => {
        onSubstract();
        setFirstTime(false);
    };

    const levelToShow = () => {
        if (added) {
            if (firstTime) {
                return "Tienes en el carro";
            }
            return "Modifica el carro";
        }

        return "Añade al carro";
    };

    return (
        <div className={style.inputNumber}>
            <>
                <input value={value} readOnly></input>
                <section>
                    <button onClick={handleOnAdd} disabled={disableAdd}>
                        <i className={["fas", "fa-angle-up"].join(" ")}></i>
                    </button>
                    <button
                        onClick={handleOnSubstract}
                        disabled={disableSubstract}
                    >
                        <i className={["fas", "fa-angle-down"].join(" ")}></i>
                    </button>
                </section>
            </>

            <button
                type="submit"
                className={style.submit}
                onClick={() => {
                    // if (!added) {
                        onSubmit();
                        setAdded(true);
                        setFirstTime(true);
                    // }
                }}
            >
                <>
                    <i className={["fas", "fa-shopping-cart"].join(" ")}></i>
                    {levelToShow()}
                </>
            </button>
        </div>
    );
};

export default AddToCart;
