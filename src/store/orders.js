import axios from 'axios';

//ACTION TYPES
const LOAD_ORDERS = 'LOAD_ORDERS';

//ACTION CREATORS
const loadOrders = orders => ({
  type: LOAD_ORDERS,
  orders
});

//THUNK CREATORS
export const _loadOrders = () => dispatch => (
  axios.get('/api/orders')
    .then(response => response.data)
    .then(orders => {
      const action = loadOrders(orders);
      dispatch(action);
    })
    .catch(err => {
      throw err;
    })
)

const reducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_ORDERS:
      console.log(action.orders);
      return action.orders;
    default:
      return state;
  }
}

export default reducer;