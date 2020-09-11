// la store de redux
import { createStore, applyMiddleware } from "redux";
import combineReducers from "./Reducer/Reducer.js";
import thunk from "redux-thunk";
//import { myMiddleware } from './middle.js';
//var midle = [thunk, myMiddleware]
import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(
  combineReducers, {},
  composeWithDevTools(
    applyMiddleware(
      thunk
    )
  )
);
export default store;
