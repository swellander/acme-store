import React, { Component } from 'react';
import { connect } from 'react-redux';

class Product extends Component {
  render = () => {
    const { product, lineItem } = this.props;
    const quantity = lineItem ? lineItem.quantity : 0;
    return (
      <div>
        <h3>x{quantity} {product.name}</h3>
        <button>+</button>
        <button>-</button>
      </div>
    )
  }
}

const mapStateToProps = ({ orders }, { order, product }) => {
  return {
    lineItem: order ? order.lineItems.find(item => item.productId == product.id) : undefined
  }
}

export default connect(mapStateToProps)(Product);