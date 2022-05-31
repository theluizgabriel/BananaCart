import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Badge } from '@material-ui/core';

export default class CartPageRedirect extends React.Component {
  render() {
    const { quantity } = this.props;
    return (
      <div className="flex">
        <Link
          data-testid="shopping-cart-button"
          to="/cart"
        >
          <div className="flex align-center">
            <Badge
              data-testid="shopping-cart-size"
              badgeContent={ quantity }
              color="secondary"
            >
              <ShoppingCartIcon />
            </Badge>
          </div>
        </Link>
      </div>
    );
  }
}

CartPageRedirect.propTypes = {
  quantity: PropTypes.number.isRequired,
};
