import orders from './orders';
import products from './products';
import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';

const reducer = combineReducers({
  orders,
  products
});

export default createStore(reducer, applyMiddleware(thunk))
