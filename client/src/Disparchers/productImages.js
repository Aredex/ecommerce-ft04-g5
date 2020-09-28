import axios from "axios";
import types from "types/types";
let conteo = 1;

const isUrl = (url) => {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return regexp.test(url);
};

export const startAddingImage = (productId, imageUrl) => {
    return async (dispatch) => {
        if (isUrl(imageUrl)) {
            if (productId) {
                await axios.put(
                    `${process.env.REACT_APP_API}/products/${productId}`,
                    {
                        imageUrl,
                    }
                );

                const { data } = await axios.post(
                    `${process.env.REACT_APP_API}/images/url/url`,
                    {
                        url: imageUrl,
                    }
                );

                if (data) {
                    dispatch(addImages(data));
                }
            } else {
                conteo++;
                const img = {
                    url: imageUrl,
                    id: conteo,
                };
                dispatch(addImages(img));
            }
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
        await axios.delete(`${process.env.REACT_APP_API}/images/${id}`);

        dispatch(deleteImage(id));
    };
};

export const startDeletingLocalImage = (id) => {
    return async (dispatch) => {
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
