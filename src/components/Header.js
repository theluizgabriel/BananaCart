import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CartPageRedirect from './CartPageRedirect';

export default class Header extends Component {
  render() {
    const { quantity } = this.props;
    return (
      <header
        className="flex justify-between bg-yellow-300 p-5 shadow-lg items-center"
      >
        <Link to="/">
          <img
            width="110px"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Bananas.svg/560px-Bananas.svg.png"
            alt="banana"
          />
        </Link>
        <h1
          style={ { fontFamily: 'Urbanist, sans-serif',
            fontSize: '60px' } }
        >
          BananaCart

        </h1>
        <CartPageRedirect quantity={ quantity } />
      </header>
    );
  }
}

Header.propTypes = {
  quantity: PropTypes.number.isRequired,
};
