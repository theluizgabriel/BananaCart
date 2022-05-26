import React from 'react';
import PropTypes from 'prop-types';

class CardItemCart extends React.Component {
  render() {
    const { name, image, qty } = this.props;
    return (
      <li>
        <p data-testid="shopping-cart-product-name">{name}</p>
        <img src={ image } alt={ name } />
        <p data-testid="shopping-cart-product-quantity">{qty}</p>
      </li>
    );
  }
}

CardItemCart.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  qty: PropTypes.number.isRequired,
};

export default CardItemCart;
