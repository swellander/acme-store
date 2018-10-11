import React, { Component } from 'react';
import { connect } from 'react-redux';
import Product from './Product';
import { _placeOrder } from '../store/orders';

class CartView extends Component {
  handleClick = () => {
    const { placeOrder, order } = this.props;
    placeOrder(order.id);
  }
  render = () => {
    const { products, order } = this.props;
    return (
      <div>
        <ul>
          {
            Object.keys(products).map(id => (
              <Product
                key={id}
                product={products[id]}
                order={order}
              />
            ))
          }
        </ul>
        <button onClick={this.handleClick}>Place Order</button>
      </div>
    )
  }
}

const mapStateToProps = ({ products, orders }) => {
  return {
    products,
    order: orders.find(order => order.status == 'CART')
  }
}
const mapDispatchToProps = dispatch => {
  return {
    placeOrder: id => dispatch(_placeOrder(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartView);