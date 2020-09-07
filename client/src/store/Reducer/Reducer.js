import { combineReducers } from 'redux'
import ProductsReducer from './Products/ProductsReducer.js'
import UsersReducer from './Users/UsersReducer.js'

export default combineReducers({
  ProductsReducer,
  UsersReducer
})