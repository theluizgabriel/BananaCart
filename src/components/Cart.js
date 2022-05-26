import React from 'react';
import PropTypes from 'prop-types';
import CardItemCart from './CardItemCart';

export default class Cart extends React.Component {
  addOrRemoveItem = (operation, { id, name, price, image }) => {
    const { addToCart } = this.props;
    addToCart({ id, name, price, image }, operation);
  }

  render() {
    const { cartList } = this.props;
    return (
      <main>
        <h1>Carrinho de compras</h1>
        {cartList.length ? (
          <ul>
            {cartList.map(({ id, name, qty, image, price }) => (
              <CardItemCart
                id={ id }
                key={ id }
                name={ name }
                qty={ qty }
                image={ image }
                price={ price }
                addOrRemoveItem={ this.addOrRemoveItem }
              />
            ))}
          </ul>
        ) : (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        )}
      </main>
    );
  }
}

Cart.propTypes = {
  addToCart: PropTypes.func.isRequired,
  cartList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
