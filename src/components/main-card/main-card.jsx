import React from 'react';
import ItemCard from '../item-card/item-card.jsx';
import PropTypes from 'prop-types';

const MainCard = (props) => {
  const {titleCard} = props;
  const cards = titleCard.map((card, index) => {
    return (
      <ItemCard
        title={card.title}
        key={index}>
      </ItemCard>
    );
  });

  return (
    <div className="cities__places-list places__list tabs__content">
      {cards}
    </div>
  );
};

MainCard.propTypes = {
  titleCard: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string
  }))
};

export default MainCard;
