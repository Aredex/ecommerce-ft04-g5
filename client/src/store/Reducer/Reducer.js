import { combineReducers } from "redux";
import ProductsReducer from "./Products/ProductsReducer.js";
import UsersReducer from "./Users/UsersReducer.js";
import CategoriesReducer from "./Categories/CategoriesReducer.js";
import orders from "./Orders";
import orders_reducer from "./Orders/ordersReducers";
import ImageProductReducer from "./ImageProduct/ImageProductReducer.js";

export default combineReducers({
  ProductsReducer,
  UsersReducer,
  CategoriesReducer,
  orders,
  orders_reducer,
  imageProduct: ImageProductReducer,
});
