import React from 'react';
import { Link } from 'react-router-dom';

export default class CartPageRedirect extends React.Component {
  render() {
    return (
      <Link
        data-testid="shopping-cart-button"
        to="/cart"
      >
        Carrinho
      </Link>
    );
  }
}
