import React, { Component } from 'react';
import CartPageRedirect from './CartPageRedirect';

export default class Home extends Component {
    state = {
      search: '',
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

    render() {
      const { search, isEmpty } = this.state;
      return (
        <div>
          <input
            type="text"
            name="search"
            value={ search }
            onChange={ this.handleChange }
          />
          <CartPageRedirect />
          {isEmpty && (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>)}
        </div>
      );
    }
}
