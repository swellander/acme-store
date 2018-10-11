import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Typography, Button } from '@material-ui/core';

class Nav extends Component {
  render = () => {
    const { itemTotal, cartSize, numOrders } = this.props;
    return (
      <div>
        <div>
          <Link to="/cart">Cart({cartSize})</Link>
          <Link to="/orders">Orders({numOrders})</Link>
        </div>
        <div>
          <Typography>
            {itemTotal} items sold!
          </Typography>
        </div>
        <div>
          <Button>Reset</Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ orders }) => {
  const cart = orders.find(order => order.status == 'CART');
  const finalizedOrders = orders.filter(order => order.status !== 'CART');
  return {
    cartSize: cart ? cart.lineItems.reduce((total, item) => total + item.quantity, 0) : 0,
    numOrders: finalizedOrders.length,
    itemTotal: finalizedOrders.reduce((total, order) => total + order.lineItems.reduce((_total, item) => _total + item.quantity, 0), 0)
  }
}

export default connect(mapStateToProps)(Nav);