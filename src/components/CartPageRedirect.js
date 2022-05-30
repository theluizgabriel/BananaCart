import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class CartPageRedirect extends React.Component {
  render() {
    const { quantity } = this.props;
    return (
      <Link
        data-testid="shopping-cart-button"
        to="/cart"
      >
        Carrinho
        <p data-testid="shopping-cart-size">{quantity}</p>
      </Link>
    );
  }
}

CartPageRedirect.propTypes = {
  quantity: PropTypes.number.isRequired,
};
