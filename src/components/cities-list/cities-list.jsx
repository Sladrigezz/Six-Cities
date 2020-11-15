import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {ActionCreator} from '../../reducers/index.js';
import {updateOffersList as updateOffers} from '../../reducers/data.js';

export const CitiesList = ({cities, activeCity, setActiveCity, updateOffersList}) => {
  const onItemClickHandler = (e) => {
    const cityName = e.currentTarget.id;
    setActiveCity(cityName);
    updateOffersList();
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((item) => {
          const isActive = activeCity === item;
          return (
            <li className="locations__item" key={item} >
              <a
                className={`locations__item-link tabs__item ${isActive ? `tabs__item--active` : ``}`}
                id={item}
                onClick={onItemClickHandler}
              >
                <span>{item}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}


CitiesList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string),
  activeCity: PropTypes.string,
  updateOffersList: PropTypes.func,
  setActiveCity: PropTypes.func,
};

export default connect(
  (state) => ({
    activeCity: state.user.activeCity,
    cities: state.user.citiesList,
    state,
  }),
  (dispatch) => ({
    setActiveCity: (cityName) => dispatch(ActionCreator.setCity(cityName)),
    updateOffersList: () => dispatch(updateOffers()),
  })
)(CitiesList);
