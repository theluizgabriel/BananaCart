import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends Component {
  state = {
    productDetails: {},
  };

  componentDidMount = () => {
    const { name, price, image, id, stock, isFreeShipping } = this.props;
    this.setState({ productDetails: { id, name, price, image, stock, isFreeShipping } });
  };

  render() {
    const { name, price, image, addToCart, id, stock, isFreeShipping } = this.props;
    const { productDetails } = this.state;
    return (
      <div data-testid="product" style={ { border: '1px solid black' } }>
        <Link
          data-testid="product-detail-link"
          to={ {
            pathname: `/product/${id}`,
            state: { productDetails },
          } }
        >
          <p>
            {name}
          </p>
        </Link>
        { isFreeShipping && <p data-testid="free-shipping">Frete Gratis</p> }
        <img src={ image } alt={ name } width="150px" />
        <p>{price}</p>
        <button
          data-testid="product-add-to-cart"
          type="button"
          onClick={ () => addToCart({ id, name, price, image, stock }, 'add') }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  isFreeShipping: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
  stock: PropTypes.number.isRequired,
};

export default ProductCard;
