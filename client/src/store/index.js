// la store de redux
import { createStore, applyMiddleware } from "redux";
import combineReducers from "./Reducer/Reducer.js";
import thunk from "redux-thunk";
//import { myMiddleware } from './middle.js';
//var midle = [thunk, myMiddleware]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const store = createStore(
  combineReducers,
  composeEnhancers(applyMiddleware(thunk))
);
export default store;
