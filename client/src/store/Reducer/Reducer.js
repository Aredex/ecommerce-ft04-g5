const initialState = {
  productCards: [{
    img: "https://laslandas.com/wp-content/uploads/2019/11/abbaye-cluny1.jpg",
    title: "Planta 1",
    price: 450,
    id: 1
  }, {
    img: "https://laslandas.com/wp-content/uploads/2019/11/abbaye-cluny1.jpg",
    title: "Planta 2",
    price: 150,
    id: 2
  }, {
    img: "https://laslandas.com/wp-content/uploads/2019/11/abbaye-cluny1.jpg",
    title: "Planta 3",
    price: 12450,
    id: 3
  }],
  productDetail: {}
};

function rootReducer(state = initialState, action) {
  if (action.type === "ADD_PRODUCT") {
    return {
      ...state,
      productCards: state.productCards.concat(action.payload)
    }
  }
  if (action.type === "GET_PRODUCTS") {
    return state

  }
  if (action.type === "GET_PRODUCT_DETAIL") {
    return {
      ...state,
      productDetail: state.productCards.filter((e) => e.id == action.payload ? true : false)[0]
    }
  }

  return state;
}

export default rootReducer;  