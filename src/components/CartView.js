import React, { Component } from 'react';
import { connect } from 'react-redux';

class CartView extends Component {
  render = () => (
    <div>
      <ul>
        {this.props.products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  )
}

const mapStateToProps = ({ products }) => {
  return {
    products
  }
}

export default connect(mapStateToProps)(CartView);