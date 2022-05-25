import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartList: [],
    };
  }

  hasItem = (cartList, id) => cartList.some(({ id: currId }) => currId === id);

  updateItem = (cartList, id) => cartList
    .map(({ qty, id: currId, name, price, image }) => {
      if (currId === id) {
        const newQty = qty + 1;
        return {
          id: currId,
          qty: newQty,
          name,
          price,
          image,
        };
      }
      return {
        id: currId,
        qty,
        name,
        price,
        image,
      };
    });

  addToCart = (id, name, price, image) => {
    const newItem = {
      qty: 1,
      id,
      name,
      price,
      image,
    };

    this.setState(({ cartList }) => {
      if (this.hasItem(cartList, id)) {
        const newCart = this.updateItem(cartList, id);
        return { cartList: newCart };
      }
      return { cartList: [...cartList, newItem] };
    });
  };

  render() {
    const { cartList } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => <Home addToCart={ this.addToCart } /> }
          />
          <Route
            exact
            path="/cart"
            render={ () => <Cart cartList={ cartList } /> }
          />
          <Route
            exact
            path="/product/:id"
            render={ (props) => <ProductDetails { ...props } /> }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
