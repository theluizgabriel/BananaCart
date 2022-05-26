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

  updateItem = (cartList, id, operation) => cartList
    // .reduce((acc, item) => {
    //   if (item.id === id) {
    //     let newQty = item.qty;
    //     newQty = operation === 'remove' ? item.qty - 1 : item.qty + 1;
    //     if (newQty < 1) {
    //       return acc;
    //     }
    //     return [...acc, {
    //       id: item.id,
    //       qty: newQty,
    //       name: item.name,
    //       price: item.price,
    //       image: item.image,
    //     }];
    //   }
    //   return [...acc, {
    //     id: item.id,
    //     qty: 1,
    //     name: item.name,
    //     price: item.price,
    //     image: item.image,
    //   }];
    // }, []);
    .map(({ qty, id: currId, name, price, image }) => {
      if (currId === id) {
        let newQty = qty;
        newQty = operation === 'remove' ? qty - 1 : qty + 1;
        if (newQty < 1) {
          newQty = 1;
        }
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

  addToCart = ({ id, name, price, image }, operation) => {
    const newItem = {
      qty: 1,
      id,
      name,
      price,
      image,
    };

    this.setState(({ cartList }) => {
      if (this.hasItem(cartList, id)) {
        const newCart = this.updateItem(cartList, id, operation);
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
            render={ () => <Cart cartList={ cartList } addToCart={ this.addToCart } /> }
          />
          <Route
            exact
            path="/product/:id"
            render={ (props) => (<ProductDetails
              { ...props }
              addToCart={ this.addToCart }
            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
