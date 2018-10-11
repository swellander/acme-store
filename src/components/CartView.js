import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Product from './Product';
import { _placeOrder } from '../store/orders';
import { Button } from '@material-ui/core';

class CartView extends Component {
  state = {
    redirect: false
  }
  handleClick = () => {
    const { placeOrder, order } = this.props;
    placeOrder(order.id);
    this.setState({ redirect: true })
  }
  render = () => {
    const { products, order } = this.props;
    if (this.state.redirect) {
      return <Redirect to="/orders" />
    } else {
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
          <Button onClick={this.handleClick}>Place Order</Button>
        </div>
      )
    }
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