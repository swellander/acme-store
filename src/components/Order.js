import React, { Component } from 'react';
import { connect } from 'react-redux';

class Order extends Component {
  render = () => {
    const { order, products } = this.props;
    return (
      <div>
        <h3>{this.props.order.id}</h3>
        <ul>
          {order.lineItems.map(lineItem => {
            const product = products[lineItem.productId];
            console.log(product);
            return <li key={lineItem.id}>{product.name} x {lineItem.quantity}</li>
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ products }) => {
  return {
    products
  }
}

export default connect(mapStateToProps)(Order);