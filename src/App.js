import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';
import Header from './components/Header';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartList: [],
      quantity: 0,
    };
  }

  componentDidMount() {
    const cartList = JSON.parse(localStorage.getItem('cart'));
    if (cartList) {
      const quantity = this.getQuantity({ cartList });
      this.setState({ cartList, quantity });
    }
  }

  getQuantity = (itemsList = {}) => {
    const { cartList } = itemsList;
    const quantity = cartList.reduce((acc, curr) => acc + curr.qty, 0);
    // this.setState({ quantity });
    return quantity;
  }

  hasItem = (cartList, id) => cartList.some(({ id: currId }) => currId === id);

  updateItem = (cartList, id, operation) => cartList
    .map(({ qty, id: currId, name, price, image, stock }) => {
      if (currId === id) {
        let newQty = qty;
        newQty = operation === 'remove' ? qty - 1 : qty + 1;
        if (newQty < 1) {
          newQty = 1;
        }
        if (newQty > stock) newQty = stock;
        return {
          stock,
          id: currId,
          qty: newQty,
          name,
          price,
          image,
        };
      }
      return {
        stock,
        id: currId,
        qty,
        name,
        price,
        image,
      };
    });

  addToCart = ({ id, name, price, image, stock }, operation) => {
    const newItem = {
      stock,
      qty: 1,
      id,
      name,
      price,
      image,
    };
    this.setState(({ cartList }) => {
      if (this.hasItem(cartList, id)) {
        const newCart = this.updateItem(cartList, id, operation);
        const quantity = this.getQuantity({ cartList: newCart });
        localStorage.setItem('cart', JSON.stringify(newCart));
        return { cartList: newCart,
          quantity };
      }
      const quantity = this.getQuantity({ cartList: [...cartList, newItem] });
      localStorage.setItem('cart',
        JSON.stringify([...cartList, newItem]));
      return { cartList: [...cartList, newItem],
        quantity };
    });
  };

  render() {
    const { quantity, cartList } = this.state;
    return (
      <BrowserRouter>
        <Header quantity={ quantity } />
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
          <Route
            exact
            path="/checkout"
            render={ () => <Checkout cartList={ cartList } /> }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
