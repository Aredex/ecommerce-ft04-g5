import axios from "axios";
import types from "types/types";

export const startAddingImage = (productId, imageUrl) => {
  return async (dispatch) => {
    await axios.put(`http://localhost:3001/products/${productId}`, {
      imageUrl,
    });

    const image = await axios.get(
      `http://localhost:3001/images/url/${imageUrl}`
    );

    dispatch(addImages(image));
  };
};

export const startSelectingProduct = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`http://localhost:3001/products/${id}`);
    const { images } = data;
    dispatch(selectProduct(data, images));
  };
};

export const startDeletingImage = (id) => {
  return async (dispatch) => {
    await axios.delete(`http://localhost:3001/images/${id}`);

    dispatch(deleteImage(id));
  };
};

// Actions

export const selectProduct = (product, images) => ({
  type: types.selectProduct,
  payload: {
    product,
    images,
  },
});

export const addImages = (image) => ({
  type: types.addImage,
  payload: {
    image,
  },
});

export const deleteImage = (id) => ({
  type: types.removeImage,
  payload: {
    id,
  },
});
