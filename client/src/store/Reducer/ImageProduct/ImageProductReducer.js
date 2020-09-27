import types from "types/types";

const initialState = {
    productAtive: null,
    productImages: [],
};

const ImageProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.selectProduct:
            return {
                ...state,
                productAtive: action.payload.product,
                productImages: action.payload.images,
            };

        case types.deselectProduct:
            return initialState;

        case types.addImage:
            return {
                ...state,
                productImages: [...state.productImages, action.payload.image],
            };

        case types.removeImage:
            return {
                ...state,
                productImages: state.productImages.filter(
                    (image) => image.id !== action.payload.id
                ),
            };

        default:
            return state;
    }
};

export default ImageProductReducer;
