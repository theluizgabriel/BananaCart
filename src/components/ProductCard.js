import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

class ProductCard extends Component {
  state = {};

  componentDidMount = () => {
    const { name, price, image, id, stock, isFreeShipping } = this.props;
    this.setState({ productDetails: { id, name, price, image, stock, isFreeShipping } });
  };

  render() {
    const { name, price, image, addToCart, id, stock, isFreeShipping } = this.props;
    const { productDetails } = this.state;
    return (
      <div
        data-testid="product"
        className="rounded-xl p-5 flex flex-col items-center bg-white cursor-pointer
        justify-between gap-5 w-60 text-center shadow-lg shadow-gray-500
        hover:shadow-2xl hover:scale-105 hover:ease-in-out hover:duration-200"
      >
        <Link
          data-testid="product-detail-link"
          to={ {
            pathname: `/product/${id}`,
            state: { productDetails },
          } }
        >
          { isFreeShipping && (
            <p
              className="bg-yellow-300 px-2 py-1 rounded-lg
              shadow-md shadow-gray-300 mb-5 w-2/3 mx-auto
              font-medium"
              data-testid="free-shipping"
            >
              Frete Gratis
            </p>
          ) }
          <img
            src={ image }
            alt={ name }
            width="150px"
            className="mx-auto"
          />
          <p>
            {name}
          </p>
          <p className="text-xl">{`R$ ${price}`}</p>
        </Link>
        <Button variant="contained" color="primary">
          <button
            data-testid="product-add-to-cart"
            type="button"
            onClick={ () => addToCart({ id, name, price, image, stock }, 'add') }
          >
            Adicionar ao Carrinho
          </button>
        </Button>
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
