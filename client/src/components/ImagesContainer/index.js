import {
    startDeletingImage,
    startDeletingLocalImage,
    startSelectingProduct,
} from "Disparchers/productImages";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./index.module.scss";

function ImagesContainer({ id, estado, setFieldValue, values }) {
    const dispatch = useDispatch();
    const { productImages } = useSelector((state) => state.imageProduct);

    const handleDeleteImage = (imageId, url) => {
        if (!id) {
            setFieldValue(
                "imageUrl",
                values.imageUrl.filter((img) => img != url)
            );
            dispatch(startDeletingLocalImage(imageId));
            // console.log(url);
        } else {
            dispatch(startDeletingImage(imageId));
        }
    };

    useEffect(() => {
        dispatch(startSelectingProduct(id));
    }, [id, dispatch]);

    return (
        <div className={style.imgcontainer}>
            {productImages.map(({ id, url }) => (
                <div key={id}>
                    {!estado.readOnly && (
                        <i
                            className={[
                                "far fa-times-circle",
                                style.removeButton,
                            ].join(" ")}
                            onClick={() => handleDeleteImage(id, url)}
                        />
                    )}

                    <img src={url} alt=""></img>
                </div>
            ))}
        </div>
    );
}
export default ImagesContainer;
