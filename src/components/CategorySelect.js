import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getCategories } from '../services/api';

class CategorySelect extends Component {
  state = {
    categoryList: [],
  };

  componentDidMount() {
    this.getCategoryList();
  }

  getCategoryList = async () => {
    const categoryList = await getCategories();
    this.setState({ categoryList });
  };

  render() {
    const { categoryList } = this.state;
    const { onInputCheck } = this.props;

    const categoryListElement = categoryList.map(({ name, id }) => (
      <li key={ id }>
        <label data-testid="category" htmlFor={ name }>
          <input
            type="radio"
            id={ name }
            value={ id }
            name="categoria"
            onClick={ onInputCheck }
          />
          {name}
        </label>
      </li>

    ));

    return (
      <div style={ { float: 'left' } }>
        <ul>{categoryListElement}</ul>
      </div>
    );
  }
}

export default CategorySelect;

CategorySelect.propTypes = {
  onInputCheck: PropTypes.func.isRequired,
};
