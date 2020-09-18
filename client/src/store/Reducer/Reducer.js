import { combineReducers } from "redux";
import ProductsReducer from "./Products/ProductsReducer.js";
import UsersReducer from "./Users/UsersReducer.js";
import CategoriesReducer from "./Categories/CategoriesReducer.js";
import orders from "./Orders";
import orders_reducer from "./Orders/ordersReducers";


export default combineReducers({
  ProductsReducer,
  UsersReducer,
  CategoriesReducer,
  orders,
  orders_reducer,
});
