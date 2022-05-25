import React, { Component } from 'react';
import ProductCard from './ProductCard';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';

class CategorySelect extends Component {
  state = {
    categoryList: [],
    checkedFilter: false,
    productListFiltered: [],
  };

  componentDidMount() {
    this.getCategoryList();
  }

  getCategoryList = async () => {
    const categoryList = await getCategories();
    this.setState({ categoryList });
  };

  onInputCheck = async ({ target }) => {
    const categorySearch = await getProductsFromCategoryAndQuery(target.value);
    this.setState({
      checkedFilter: true,
      productListFiltered: categorySearch.results,
    });
    console.log(categorySearch);
  };

  render() {
    const { categoryList, checkedFilter, productListFiltered } = this.state;
    const categoryListElement = categoryList.map(({ name, id }) => (
      <li key={ id }>
        <label data-testid="category" htmlFor={ name }>
          <input
            type="radio"
            id={ name }
            value={ id }
            name="categoria"
            onClick={ this.onInputCheck }
          />
          {name}
        </label>
      </li>

    ));

    return (
      <div style={ { float: 'left' } }>
        <ul>{categoryListElement}</ul>

        {checkedFilter
          && productListFiltered.map(({ title, thumbnail, price, id }) => (
            <div className="product-filtered-list" key={ id }>
              <ProductCard
                key={ id }
                id={ id }
                name={ title }
                image={ thumbnail }
                price={ price }
              />
            </div>
          ))}
      </div>
    );
  }
}

export default CategorySelect;
