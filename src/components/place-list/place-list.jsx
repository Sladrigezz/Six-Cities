import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';

export default class PlaceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCard: null,
    };

    this._activeCard = this._activeCard.bind(this);
    this._deActive = this._deActive.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  _activeCard(id) {
    this.setState({
      activeCard: id,
    });
  }
  _deActive() {
    this.setState({
      activeCard: null
    });
  }
  onClick(id) {
    this.setState({
      activeCard: id,
    });
  }
  render() {
    const {cards} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {cards.map((card) => {

          return <PlaceCard
            onClick={this.onClick}
            onHover={this._activeCard}
            onDeHover={this._deActive}
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
};


