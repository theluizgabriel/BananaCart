import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CartPageRedirect from './CartPageRedirect';
import CategorySelect from './CategorySelect';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ProductCard from './ProductCard';

export default class Home extends Component {
    state = {
      search: '',
      products: [],
      isEmpty: true,
    }

    handleChange = ({ target }) => {
      this.setState({ [target.name]: target.value },
        this.onInputChange);
    }

    onInputChange = () => {
      const emptyLength = 0;
      const { search } = this.state;
      if (search.length > emptyLength) {
        this.setState({ isEmpty: false });
      } else {
        this.setState({ isEmpty: true });
      }
    }

    searchProducts = async () => {
      const { search } = this.state;
      const responseApi = await getProductsFromCategoryAndQuery('', search);
      this.setState({ products: responseApi.results });
    }

    render() {
      const { search, isEmpty, products } = this.state;
      const { addToCart } = this.props;

      return (
        <>
          <CategorySelect />
          <div>
            <input
              type="text"
              data-testid="query-input"
              name="search"
              value={ search }
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="query-button"
              onClick={ this.searchProducts }
            >
              Pesquisar
            </button>
            <CartPageRedirect />
            {isEmpty && (
              <p data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>)}
          </div>
          <div>
            { products.map(({ title, thumbnail, price, id }) => (
              <ProductCard
                key={ id }
                id={ id }
                name={ title }
                image={ thumbnail }
                price={ price }
                addToCart={ addToCart }
              />
            )) }
          </div>
        </>
      );
    }
}

Home.propTypes = {
  addToCart: PropTypes.func.isRequired,
};
