import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Checkout extends Component {
  render() {
    const { cartList } = this.props;
    return (
      <div>
        <h1>Revise seus produtos</h1>
        <ul>
          {cartList.map((item) => (
            <li key={ item.id }>
              <img src={ item.image } alt={ item.name } />
              <p>{ item.name }</p>
              <p>{ item.qty }</p>
              <p>{ item.price }</p>
            </li>
          ))}
        </ul>
        <hr />
        <h2>Informações do comprador</h2>
        <form>
          <input
            data-testid="checkout-fullname"
            type="text"
            placeholder="Nome completo"
          />
          <input
            data-testid="checkout-email"
            type="email"
            placeholder="Email"
          />
          <input
            data-testid="checkout-cpf"
            type="text"
            placeholder="CPF"
          />
          <input
            data-testid="checkout-phone"
            type="text"
            placeholder="Telefone"
          />
          <input
            data-testid="checkout-cep"
            type="text"
            placeholder="CEP"
          />
          <input
            data-testid="checkout-address"
            type="text"
            placeholder="Endereço"
          />
        </form>
      </div>
    );
  }
}

Checkout.propTypes = {
  cartList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      qty: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
