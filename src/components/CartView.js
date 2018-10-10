import React, { Component } from 'react';
import { connect } from 'react-redux';

class CartView extends Component {
  render = () => {
    const { products } = this.props;
    return (
      <div>
        <ul>
          {
            Object.keys(products).map(id => (
              <li key={id}>{products[id].name}</li>
            ))
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ products }) => {
  return {
    products
  }
}

export default connect(mapStateToProps)(CartView);