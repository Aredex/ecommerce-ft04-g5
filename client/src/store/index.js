// la store de redux
import { createStore, applyMiddleware } from "redux";
import combineReducers from "./Reducer/Reducer.js";
import thunk from "redux-thunk";
//import { myMiddleware } from './middle.js';
//var midle = [thunk, myMiddleware]

const store = createStore(
  combineReducers,
  applyMiddleware(thunk)
);
export default store;