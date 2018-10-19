import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { _login } from '../store/auth';
import { connect } from 'react-redux';

class Login extends Component {
  state = {
    email: '',
    password: ''
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state)
      .then(() => this.setState({ email: '', password: '' }))
      .catch(err => {
        throw err
      })
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <TextField name="email" onChange={this.onChange} value={this.state.email} label="email" />
        <TextField name="password" onChange={this.onChange} value={this.state.password} label="password" />
        <Button type="submit">Login</Button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: credentials => dispatch(_login(credentials))
  }
}

export default connect(null, mapDispatchToProps)(Login);