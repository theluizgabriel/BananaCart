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
        <label
          data-testid="category"
          htmlFor={ name }
          style={ { cursor: 'pointer' } }
        >
          <input
            style={ { display: 'hidden', opacity: 0 } }
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
      <div
        className="w-72 bg-[#333333] py-10 pl-5 shadow-lg
        shadow-slate-400"
      >
        <ul className="flex flex-col text-slate-200 gap-3">{categoryListElement}</ul>
      </div>
    );
  }
}

export default CategorySelect;

CategorySelect.propTypes = {
  onInputCheck: PropTypes.func.isRequired,
};
