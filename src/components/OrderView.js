import React, { Component } from 'react';
import { connect } from 'react-redux';

class OrderView extends Component {
  render = () => (
    <div>
      <ul>
        {this.props.orders.map(order => (
          <li key={order.id}>{order.id}</li>
        ))}
      </ul>
    </div>
  )
}

const mapStateToProps = ({ orders }) => {
  return {
    orders,
  }
}

export default connect(mapStateToProps)(OrderView);