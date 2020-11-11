import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {CardOffer} from '../card-offer/card-offer.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';

const CardOfferWrapped = withActiveItem(CardOffer);

export const CardOffersList = (props) => {
  const {offers} = props;

  return (
    offers.map((item, i) => {
      const uniqueName = `offer-${i + 1}`;
      return <CardOfferWrapped
        key={uniqueName}
        offer={item}
        offerName={uniqueName}
        id={item.id}
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
  })
)(CardOffersList);
