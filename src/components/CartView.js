import React, { Component } from 'react';
import { connect } from 'react-redux';
import Product from './Product';

class CartView extends Component {
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
      </div>
    )
  }
}

const mapStateToProps = ({ products, orders }) => {
  console.log(orders);
  return {
    products,
    order: orders.find(order => order.status == 'CART')
  }
}

export default connect(mapStateToProps)(CartView);