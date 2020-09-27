import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startDeletingImage,
  startSelectingProduct,
} from "Disparchers/productImages";
import "./imageProduct.scss";

const ImagesProduct = ({ id, estado }) => {
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
    <div>
      <div className="ip__container">
        {productImages &&
          productImages.map(({ id, url }) => (
            <div key={id} className="ip__image-container">
              {estado.update && (
                <button
                  onClick={() => {
                    handleDeleteImage(id);
                  }}
                  className="ip__delete"
                >
                  x
                </button>
              )}
              <img className="ip__image" src={url} alt={id} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImagesProduct;
