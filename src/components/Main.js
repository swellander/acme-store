import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Nav from './Nav';
import CartView from './CartView';
import OrderView from './OrderView';

export default class Main extends Component {
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