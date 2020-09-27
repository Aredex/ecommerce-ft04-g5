import {
    startDeletingImage,
    startSelectingProduct,
} from "Disparchers/productImages";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./index.module.scss";

function ImagesContainer({ id, estado }) {
    const dispatch = useDispatch();
    const { productActive, productImages } = useSelector(
        (state) => state.imageProduct
    );

    const handleDeleteImage = (id) => {
        dispatch(startDeletingImage(id));
    };

    useEffect(() => {
        dispatch(startSelectingProduct(id));
    }, [id, dispatch]);

    return (
        <div className={style.imgcontainer}>
            {productImages.map(({ id, url }) => (
                <div key={id}>
                    {estado.update && (
                        <i
                            className={[
                                "far fa-times-circle",
                                style.removeButton,
                            ].join(" ")}
                            onClick={() => handleDeleteImage(id)}
                        />
                    )}

                    <img src={url} alt=""></img>
                </div>
            ))}
        </div>
    );
}
export default ImagesContainer;
