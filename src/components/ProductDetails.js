import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CartPageRedirect from './CartPageRedirect';

class ProductDetails extends Component {
  render() {
    const {
      addToCart,
      location: {
        state: {
          productDetails: { id, name, image, price },
        },
      },
    } = this.props;
    return (
      <div>
        <p data-testid="product-detail-name">{name}</p>
        <img src={ image } alt={ name } />
        <p>{price}</p>
        <CartPageRedirect />
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ () => addToCart(id, name, price, image) }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  addToCart: PropTypes.func.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      productDetails: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetails;
