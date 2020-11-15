import React from 'react';
import PropTypes from 'prop-types';
import {CardTypes} from '../../constants/constants.js';
import {CardOffer} from '../card-offer/card-offer.jsx';

export const FavoriteCitySection = ({city, offers, onBookmarkClick}) => {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((item, i) => {
          return <CardOffer onBookmarkClick={onBookmarkClick} cardType={CardTypes.FAVORITES} offer={item} key={i} />;
        })}
      </div>
    </li>
  );
}


FavoriteCitySection.propTypes = {
  city: PropTypes.string,
  offers: PropTypes.array,
  onBookmarkClick: PropTypes.func,
};
