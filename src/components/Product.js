import React, { Component } from 'react';
import { connect } from 'react-redux';
import { _createLineItem, _updateLineItem } from '../store/orders';

class Product extends Component {
  handleClick = (direction) => {
    const { create, update } = this.props;
    if (!this.props.lineItem) create();
    else update(direction);
  }
  render = () => {
    const { product, lineItem } = this.props;
    const quantity = lineItem ? lineItem.quantity : 0;
    return (
      <div>
        <h3>x{quantity} {product.name}</h3>
        <button onClick={() => this.handleClick('plus')}>+</button>
        <button onClick={() => this.handleClick('minus')}>-</button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, { order, product }) => {
  const lineItem = order ? order.lineItems.find(item => item.productId == product.id) : undefined;
  if (lineItem) console.log(lineItem.id)
  return {
    lineItem,
    create: () => dispatch(_createLineItem(order.id, product.id)),
    update: direction => dispatch(_updateLineItem(lineItem, direction))
  }
}

export default connect(null, mapDispatchToProps)(Product);