import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductDetails extends Component {
  state = {
    userEmail: '',
    userReview: '',
    rating: '',
    reviews: [],
  }

  componentDidMount() {
    this.getReviews();
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  getReviews = () => {
    const {
      location: {
        state: {
          productDetails: { id },
        },
      },
    } = this.props;
    const reviewsSaved = JSON.parse(localStorage.getItem(`${id}`));
    if (reviewsSaved) {
      this.setState({ reviews: reviewsSaved });
    }
    console.log(reviewsSaved);
  }

  resetReview = (card) => {
    const {
      location: {
        state: {
          productDetails: { id },
        },
      },
    } = this.props;
    this.setState((prev) => {
      console.log(prev);
      if (prev.reviews) {
        localStorage.setItem(`${id}`, JSON.stringify([...prev.reviews, card]));
      }
      return {
        reviews: [...prev.reviews, card],
        userEmail: '',
        userReview: '',
        rating: '',
      };
    });
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
          productDetails: { id, name, image, price, stock },
        },
      },
    } = this.props;
    const { userEmail, userReview, reviews } = this.state;
    return (
      <div>
        <p data-testid="product-detail-name">{name}</p>
        <img src={ image } alt={ name } />
        <p>{price}</p>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ () => addToCart({ id, name, price, image, stock }) }
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
              data-testid="1-rating"
              type="radio"
              name="rating"
              value="1"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="numberTwo">
            2
            <input
              data-testid="2-rating"
              type="radio"
              name="rating"
              value="2"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="numberThree">
            3
            <input
              data-testid="3-rating"
              type="radio"
              name="rating"
              value="3"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="numberFour">
            4
            <input
              data-testid="4-rating"
              type="radio"
              name="rating"
              value="4"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="numberFive">
            5
            <input
              data-testid="5-rating"
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
        {reviews && reviews.length > 0 ? reviews.map((element, index) => (
          <div key={ index }>
            <p>{element.email}</p>
            <p>{element.review}</p>
            <p>{element.rating}</p>
            <hr />
          </div>
        )) : null}
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
        stock: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetails;
