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
      console.log(orders);
      const action = loadOrders(orders);
      dispatch(action);
    })
    .catch(err => {
      throw err;
    })
);

export const _createLineItem = (orderId, productId) => dispatch => (
  axios.post(`/api/orders/${orderId}/lineItems`, { productId })
    .then(() => dispatch(_loadOrders()))
    .catch(err => {
      throw err;
    })
)
export const _updateLineItem = (lineItem, direction) => dispatch => {
  const update = { quantity: lineItem.quantity };
  if (direction == 'plus') update.quantity++;
  else update.quantity--;

  axios.put(`api/orders/${lineItem.orderId}/lineItems/${lineItem.id}`, update)
    .then(() => {
      dispatch(_loadOrders())
    })
    .catch(err => {
      throw err;
    })
}

export const _placeOrder = id => dispatch => (
  axios.put(`/api/orders/${id}`, { status: 'ORDER' })
    .then(() => {
      dispatch(_loadOrders())
    })
)

const reducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_ORDERS:
      return action.orders;
    default:
      return state;
  }
}

export default reducer;