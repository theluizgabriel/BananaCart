import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategorySelect from './CategorySelect';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ProductCard from './ProductCard';

export default class Home extends Component {
  state = {
    search: '',
    products: [],
    categorySelect: '',
    isEmpty: true,
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, this.onInputChange);
  };

  onInputCheck = async ({ target }) => {
    const { value } = target;
    this.setState(
      {
        categorySelect: value,
      },
      this.searchProducts,
    );
  };

  onInputChange = () => {
    const emptyLength = 0;
    const { search } = this.state;
    if (search.length > emptyLength) {
      this.setState({ isEmpty: false });
    } else {
      this.setState({ isEmpty: true });
    }
  };

  searchProducts = async () => {
    const { search, categorySelect } = this.state;
    const responseApi = await getProductsFromCategoryAndQuery(
      categorySelect,
      search,
    );
    this.setState({ products: responseApi.results });
  };

  render() {
    const { search, isEmpty, products } = this.state;
    const { addToCart } = this.props;

    return (
      <div className="w-full pr-10 pb-10 flex flex-row justify-between">
        <div className="">
          <CategorySelect onInputCheck={ this.onInputCheck } />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex mb-10 justify-center">
            <input
              className="shadow appearance-none border rounded w-full
            py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
            w-2/3"
              type="text"
              data-testid="query-input"
              name="search"
              value={ search }
              onChange={ this.handleChange }
            />
            <button
              className="text-black font-bold py-2
            px-4 rounded focus:outline-none focus:shadow-outline -translate-x-12"
              type="button"
              data-testid="query-button"
              onClick={ this.searchProducts }
            >
              <i className="fa-solid fa-magnifying-glass" />
            </button>
          </div>
          <div className="flex justify-center w-full flex-wrap gap-5">
            {isEmpty && (
              <p
                data-testid="home-initial-message"
                className="justify-self-center pr-10"
              >
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
            )}
            {products.map(
              ({
                title,
                thumbnail,
                price,
                id,
                available_quantity: qty,
                shipping,
              }) => (
                <ProductCard
                  key={ id }
                  id={ id }
                  name={ title }
                  image={ thumbnail }
                  price={ price }
                  addToCart={ addToCart }
                  stock={ qty }
                  isFreeShipping={ shipping.free_shipping }
                />
              ),
            )}
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  addToCart: PropTypes.func.isRequired,
};
