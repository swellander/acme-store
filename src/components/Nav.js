import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends Component {
  render = () => (
    <div>
      <Link to="/cart">Cart</Link>
      <Link to="/orders">Orders</Link>
    </div>
  )
}