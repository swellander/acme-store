import axios from 'axios';

//ACTION TYPES
const LOAD_PRODUCTS = 'LOAD_PRODUCTS';

//ACTION CREATORS
const loadProducts = products => ({
  type: LOAD_PRODUCTS,
  products
});

//THUNK CREATORS
export const _loadProducts = () => dispatch => (
  axios.get('/api/products')
    .then(response => response.data)
    .then(products => {
      const action = loadProducts(products);
      dispatch(action);
    })
    .catch(err => {
      throw err;
    })
)

const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return action.products.reduce((memo, product) => {
        memo[product.id] = product;
        return memo;
      }, {})
    default:
      return state;
  }
}

export default reducer;