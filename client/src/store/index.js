// la store de redux
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./Reducer/Reducer.js";
import thunk from "redux-thunk";
//import { myMiddleware } from './middle.js';
//var midle = [thunk, myMiddleware]

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
export default store;