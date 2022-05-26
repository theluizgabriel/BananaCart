import React from 'react';
import PropTypes from 'prop-types';
import CardItemCart from './CardItemCart';

export default class Cart extends React.Component {
  render() {
    const { cartList } = this.props;
    return (
      <main>
        <h1>Carrinho de compras</h1>
        {cartList.length ? (
          <ul>
            {cartList.map(({ id, name, qty, image }) => (
              <CardItemCart key={ id } name={ name } qty={ qty } image={ image } />
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
  cartList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
