import React, { Component } from 'react';
import { connect } from 'react-redux';
import { _createLineItem, _updateLineItem, _removeLineItem } from '../store/orders';
import { Button } from '@material-ui/core';

class Product extends Component {
  handleClick = (direction) => {
    const { lineItem, create, update, remove } = this.props;
    if (!lineItem) create();
    else if (lineItem.quantity == 1 && direction == 'minus') remove();
    else update(direction);
  }
  render = () => {
    const { product, lineItem } = this.props;
    const quantity = lineItem ? lineItem.quantity : 0;
    return (
      <div>
        <h3>x{quantity} {product.name}</h3>
        <Button variant="contained" onClick={() => this.handleClick('plus')}>+</Button>
        <Button disabled={quantity == 0} variant="contained" onClick={() => this.handleClick('minus')}>-</Button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, { order, product }) => {
  const lineItem = order ? order.lineItems.find(item => item.productId == product.id) : undefined;
  return {
    lineItem,
    create: () => dispatch(_createLineItem(order.id, product.id)),
    update: direction => dispatch(_updateLineItem(lineItem, direction)),
    remove: () => dispatch(_removeLineItem(lineItem.id, order.id))
  }
}

export default connect(null, mapDispatchToProps)(Product);