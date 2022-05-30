import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CartPageRedirect from './CartPageRedirect';

export default class Header extends Component {
  render() {
    const { quantity } = this.props;
    return (
      <header>
        <Link to="/">Home</Link>
        <CartPageRedirect quantity={ quantity } />
      </header>
    );
  }
}

Header.propTypes = {
  quantity: PropTypes.number.isRequired,
};
