import axios from "axios";
import types from "types/types";

export const startAddingImage = (productId, imageUrl) => {
    return async (dispatch) => {
        await axios.put(`${process.env.REACT_APP_API}/products/${productId}`, {
            imageUrl,
        });

        const { data } = await axios.post(
            `${process.env.REACT_APP_API}/images/url/url`,
            {
                url: imageUrl,
            }
        );

        if (data) {
            dispatch(addImages(data));
        }
    };
};

export const startSelectingProduct = (id) => {
    return async (dispatch) => {
        if (id) {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/products/${id}`
            );
            const { images } = data;
            dispatch(selectProduct(data, images));
        } else {
            dispatch(deselectProduct());
        }
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

export const deselectProduct = () => ({
    type: types.deselectProduct,
});
