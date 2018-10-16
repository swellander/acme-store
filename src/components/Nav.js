import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { _reset } from '../store/orders';
import { Typography, Button } from '@material-ui/core';
import { TabContainer, Tab, Tabs } from '@material-ui/core';

class Nav extends Component {
  state = {
    value: 0,
  };
  handleClick = () => {
    this.props.reset();
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
  componentDidUpddate = prevProps => {
    console.log("YOOOO")
    console.log(prevProps, this.props);
  }
  render = () => {
    const { itemTotal, cartSize, numOrders } = this.props;
    const { value } = this.state;
    return (
      <div>
        <Tabs value={value} onChange={this.handleChange}>
          <Tab to="/cart" component={Link} label={`Cart(${cartSize})`} />
          <Tab to='/orders' component={Link} label={`Orders(${numOrders})`} />
        </Tabs>
        <div>
          <Typography variant="display1">
            {itemTotal} items sold!
          </Typography>
        </div>
        <div>
          <Button onClick={this.handleClick}>Reset</Button>
        </div>
        {/* {value === 0 && <TabContainer>Item One</TabContainer>}
        {value === 1 && <TabContainer>Item Two</TabContainer>}
        {value === 2 && <TabContainer>Item Three</TabContainer>} */}
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

const mapDispatchToProps = dispatch => {
  return {
    reset: () => dispatch(_reset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);