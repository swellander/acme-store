import orders from './orders';
import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';


const reducer = combineReducers({
  orders
});

export default createStore(reducer, applyMiddleware(thunk))
