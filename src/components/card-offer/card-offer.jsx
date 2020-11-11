import React from 'react';
import PropTypes from 'prop-types';

export class CardOffer extends React.PureComponent {
  render() {
    const {offer, offerName, onItemClickHandler} = this.props;
    const {title, price, type, images} = offer;

    return (
      <article className="cities__place-card place-card">
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img
              className="place-card__image"
              src={images[0]}
              width="260"
              height="200"
              alt="Place image"
              id={offerName}
              onMouseEnter={onItemClickHandler}
            />
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">In bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: `80%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a href="#">{title}</a>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    );
  }
}

CardOffer.propTypes = {
  offerName: PropTypes.string,
  onItemClickHandler: PropTypes.func,
  offer: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    type: PropTypes.string,
    images: PropTypes.array,
  }),
};
