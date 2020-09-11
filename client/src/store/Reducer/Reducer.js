import { combineReducers } from "redux";
import ProductsReducer from "./Products/ProductsReducer.js";
import UsersReducer from "./Users/UsersReducer.js";
import CategoriesReducer from "./Categories/CategoriesReducer.js";
import orders from "./Orders";

export default combineReducers({
  ProductsReducer,
  UsersReducer,
  CategoriesReducer,
  orders,
});
