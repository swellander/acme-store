import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Nav extends Component {
  render = () => {
    const { cartSize, numOrders } = this.props;
    return (
      <div>
        <Link to="/cart">Cart({cartSize})</Link>
        <Link to="/orders">Orders({numOrders})</Link>
      </div>
    )
  }
}

const mapStateToProps = ({ orders }) => {
  const cart = orders.find(order => order.status == 'CART');
  return {
    cartSize: cart ? cart.lineItems.reduce((total, item) => total + item.quantity, 0) : 0,
    numOrders: orders.filter(order => order.status !== 'CART').length
  }
}

export default connect(mapStateToProps)(Nav);