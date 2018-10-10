import React, { Component } from 'react';

class Order extends Component {
  render = () => {
    const { order } = this.props;
    return (
      <div>
        <h3>{this.props.order.id}</h3>
        <ul>
          {order.lineItems.map(lineItem => (
            <li key={lineItem.id}>{lineItem.productId}</li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ products }) => {
  return {
    proudctsMemo: products.map()
  }
}

export default Order;