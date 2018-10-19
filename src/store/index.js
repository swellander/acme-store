import orders from './orders';
import products from './products';
import auth from './auth';
import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';

const reducer = combineReducers({
  auth,
  orders,
  products
});

export default createStore(reducer, applyMiddleware(thunk))
