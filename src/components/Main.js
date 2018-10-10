import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Nav from './Nav';
import CartView from './CartView';
import OrderView from './OrderView';
import { _loadOrders } from '../store/orders';
import { _loadProducts } from '../store/products';
import { connect } from 'react-redux';

class Main extends Component {
  componentDidMount() {
    this.props.init();
  }
  render() {
    return (
      <div>
        <Nav />
        <Route path='/cart' component={CartView} />
        <Route path='/orders' component={OrderView} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(_loadOrders())
      dispatch(_loadProducts())
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Main));