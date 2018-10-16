import axios from 'axios';

// const sortOrders = orders => {
//   console.log('yooo')
//   const sorted = orders.sort((a, b) => {
//     const aDate = new Date(a.updatedAt);
//     const bDate = new Date(b.updatedAt);
//     console.log(aDate);
//     return aDate - bDate;
//   })
//   console.log(sorted);
//   return sorted;
// }

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
);
export const _createLineItem = (orderId, productId) => dispatch => (
  axios.post(`/api/orders/${orderId}/lineItems`, { productId })
    .then(() => dispatch(_loadOrders()))
    .catch(err => {
      throw err;
    })
);
export const _removeLineItem = (id, orderId) => dispatch => (
  axios.delete(`/api/orders/${orderId}/lineItems/${id}`)
    .then(() => {
      dispatch(_loadOrders())
    })
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
export const _reset = () => dispatch => (
  axios.delete('/api')
    .then(() => {
      dispatch(_loadOrders());
    })
    .catch(err => {
      throw err;
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