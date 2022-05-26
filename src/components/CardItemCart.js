import React from 'react';
import PropTypes from 'prop-types';

class CardItemCart extends React.Component {
  render() {
    const { id, name, image, qty, price, addOrRemoveItem } = this.props;
    return (
      <li style={ { border: '1px solid black' } }>
        <p data-testid="shopping-cart-product-name">{name}</p>
        <img src={ image } alt={ name } />
        <p data-testid="shopping-cart-product-quantity">{ `Quantidade: ${qty}` }</p>
        <p>{ `R$ ${price}` }</p>
        <button
          onClick={ () => addOrRemoveItem('remove', { id, name, price, image }) }
          id={ id }
          data-testid="product-decrease-quantity"
          type="button"
        >
          -1
        </button>
        <button
          onClick={ () => addOrRemoveItem('add', { id, name, price, image }) }
          id={ id }
          data-testid="product-increase-quantity"
          type="button"
        >
          +1
        </button>
      </li>
    );
  }
}

CardItemCart.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  qty: PropTypes.number.isRequired,
  addOrRemoveItem: PropTypes.func.isRequired,
};

export default CardItemCart;
