import React from 'react';
import PropTypes from 'prop-types';

const CityList = ({cities, onChangeCity, onActiveItemChange, activeItem}) => {
  return <ul className="locations__list tabs__list">
    {Array.from(cities).map((city) => <li key={city} className={`locations__item-link ${activeItem === city ? `tabs__item--active` : ``}`}>
      <a
        onClick={(evt) => {
          evt.preventDefault();
          onChangeCity(city);
          onActiveItemChange(city);
        }}
        className="locations__item-link tabs__item"
        href="#">
        <span>{city}</span>
      </a>
    </li>)}
  </ul>;
};

CityList.propTypes = {
  cities: PropTypes.object,
  onChangeCity: PropTypes.func,
  onActiveItemChange: PropTypes.func,
  activeItem: PropTypes.string
};

export default CityList;
