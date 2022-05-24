import React, { Component } from 'react';
import { getCategories } from '../services/api';

class CategorySelect extends Component {
  state = {
    categoryList: [],
  }

  componentDidMount() {
    this.getCategoryList();
  }

  getCategoryList = async () => {
    const categoryList = await getCategories();
    this.setState({ categoryList });
  }

  render() {
    const { categoryList } = this.state;

    const categoryListElement = categoryList.map(({ name, id }) => (
      <li key={ id } data-testid="category">
        { name }
      </li>
    ));

    return (
      <div style={ { float: 'left' } }>
        <ul>
          { categoryListElement }
        </ul>
      </div>
    );
  }
}

export default CategorySelect;
