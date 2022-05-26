import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CartPageRedirect from './CartPageRedirect';

class ProductDetails extends Component {
  state = {
    userEmail: '',
    userReview: '',
    rating: '',
    reviews: [],
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  resetReview = (card) => {
    this.setState((prev) => ({
      reviews: [...prev.reviews, card],
      userEmail: '',
      userReview: '',
      rating: '',
    }));
  }

  saveReview = () => {
    const { userEmail, userReview, rating } = this.state;
    const reviewObject = {
      email: userEmail,
      review: userReview,
      rating,
    };
    this.resetReview(reviewObject);
  }

  render() {
    const {
      addToCart,
      location: {
        state: {
          productDetails: { id, name, image, price },
        },
      },
    } = this.props;
    const { userEmail, userReview, reviews } = this.state;
    return (
      <div>
        <p data-testid="product-detail-name">{name}</p>
        <img src={ image } alt={ name } />
        <p>{price}</p>
        <CartPageRedirect />
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ () => addToCart(id, name, price, image) }
        >
          Adicionar ao Carrinho
        </button>
        <h2>Avaliações</h2>
        <form>
          <input
            type="email"
            data-testid="product-detail-email"
            name="userEmail"
            placeholder="E-mail"
            value={ userEmail }
            onChange={ this.handleChange }
          />
          <textarea
            data-testid="product-detail-evaluation"
            name="userReview"
            placeholder="Mensagem (opcional)"
            value={ userReview }
            onChange={ this.handleChange }
          />
          <label htmlFor="numberOne">
            1
            <input
              type="radio"
              name="rating"
              value="1"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="numberTwo">
            2
            <input
              type="radio"
              name="rating"
              value="2"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="numberThree">
            3
            <input
              type="radio"
              name="rating"
              value="3"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="numberFour">
            4
            <input
              type="radio"
              name="rating"
              value="4"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="numberFive">
            5
            <input
              type="radio"
              name="rating"
              value="5"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="submit-review-btn"
            name="review-button"
            onClick={ this.saveReview }
          >
            Avaliar
          </button>
        </form>
        {reviews.map((element, index) => (
          <div key={ index }>
            <p>{element.email}</p>
            <p>{element.review}</p>
            <img src="../star.png" alt="star" />
            <p>{element.rating}</p>
            <hr />
          </div>
        ))}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  addToCart: PropTypes.func.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      productDetails: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetails;
