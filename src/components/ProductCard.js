import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductCard extends Component {
  render() {
    const { name, price, image } = this.props;

    return (
      <div data-testid="product" style={ { border: '1px solid black' } }>
        <p>{ name }</p>
        <img src={ image } alt={ name } width="150px" />
        <p>{ price }</p>
      </div>
    );
  }
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default ProductCard;
