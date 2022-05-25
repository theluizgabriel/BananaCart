import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductCard extends Component {
  render() {
    const { name, price, image, addToCart, id } = this.props;

    return (
      <div data-testid="product" style={ { border: '1px solid black' } }>
        <p>{ name }</p>
        <img src={ image } alt={ name } width="150px" />
        <p>{ price }</p>
        <button
          type="button"
          onClick={ () => addToCart(id, name, price, image) }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductCard;
