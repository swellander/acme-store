import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from './Order';

class OrderView extends Component {
  render = () => (
    <div>
      <ul>
        {this.props.orders.map(order => (
          <Order key={order.id} order={order} />
        ))}
      </ul>
    </div>
  )
}

const mapStateToProps = ({ orders }) => {
  return {
    orders: orders.filter(order => order.status !== 'CART'),
  }
}

export default connect(mapStateToProps)(OrderView);