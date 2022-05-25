import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductDetails extends Component {
  render() {
    const {
      location: {
        state: {
          productDetails: { name, image, price },
        },
      },
    } = this.props;
    return (
      <div>
        <p data-testid="product-detail-name">{name}</p>
        <img src={ image } alt={ name } />
        <p>{price}</p>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      productDetails: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetails;
