import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';

export default class PlaceList extends Component {
  constructor(props) {
    super(props);


  }

  render() {
    const {cards, currentCity, onActiveItemChange} = this.props;
    return (
      <div className="cities__places-list places__list tabs__content">
        {cards.filter((el) => el.city === currentCity).map((card) => {

          return <PlaceCard
            onHover={() => {
              onActiveItemChange(card);
            }}
            onClickActiveCard={(id) => {
              onActiveItemChange(id);
            }}
            data={card}
            key={card.id}
          />;
        })}
      </div>
    );
  }
}


PlaceList.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentCity: PropTypes.string,
  onActiveItemChange: PropTypes.func
};


