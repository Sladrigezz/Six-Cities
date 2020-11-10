import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class PlaceCard extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    const {
      id,
      title,
      degree,
      order,
      photo,
      price} = this.props.data;
    const {
      onClick,
      onHover,
      onDeHover} = this.props;
    return (
      <article
        onMouseEnter={() => {
          onHover(id);
        }}
        onMouseLeave={onDeHover}
        className="cities__place-card place-card">
        <div className="place-card__mark">
          <span>{order}</span>
        </div>
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#" >
            <img
              onClick={()=> {
                onClick(id);
              }}
              className="place-card__image"
              src={photo}
              width={260}
              height={200}
              alt="Place image" />
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">€{price}</b>
              <span className="place-card__price-text">/&nbsp;night</span>
            </div>
            <button className="place-card__bookmark-button button" type="button">
              <svg className="place-card__bookmark-icon" width={18} height={19}>
                <use xlinkHref="#icon-bookmark" />
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: `93%`}} />
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a href="#" >{title}</a>
          </h2>
          <p className="place-card__type">{degree}</p>
        </div>
      </article>
    );
  }
}

PlaceCard.propTypes = {
  onClick: PropTypes.func,
  onDeHover: PropTypes.func,
  onHover: PropTypes.func,
  data: PropTypes.shape({
    id: PropTypes.number,
    degree: PropTypes.string,
    order: PropTypes.string,
    photo: PropTypes.string,
    price: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};


