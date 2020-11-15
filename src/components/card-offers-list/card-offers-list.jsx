import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {CardOffer} from '../card-offer/card-offer.jsx';
import {CardTypes} from '../../constants/constants.js';
import {ActionCreator} from '../../reducers/index.js';

export const CardOffersList = ({offers, setHoveredOffer, addToFavorite}) => {
  return (
    offers.map((item, i) => {
      const uniqueName = `offer-${i + 1}`;
      return <CardOffer
        key={uniqueName}
        offer={item}
        offerName={uniqueName}
        id={item.id}
        cardType={CardTypes.CITIES}
        mouseEnterHandler={setHoveredOffer}
        onBookmarkClick={addToFavorite}
      />;
    })
  );
};

CardOffersList.propTypes = {
  offers: PropTypes.array,
};

export default connect(
  (state) => ({
    offers: state.data.filteredOffers,
  }),
  (dispatch) => ({
    addToFavorite: (id, status) => dispatch(ActionCreator.addToFavorite(id, status)),
    setHoveredOffer: (id) => dispatch(ActionCreator.setHoveredOffer(id)),
  })
)(CardOffersList);
