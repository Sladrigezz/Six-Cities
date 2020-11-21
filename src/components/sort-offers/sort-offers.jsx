import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {sortOptions, SortTypes} from '../../constants/constants.js';
import {getActiveSortType, getIsSortOpen} from '../../selectors/sort.js';
import {ActionCreator} from '../../reducers/index.js';

export const SortOffers = (props, {activeSortType, isOpen, setSortType, sortFilteredOffers}) => {
  const handleClick = () => {
    props.toggleSort();
    document.removeEventListener(`click`, handleClick);
  };

  const onSortClickHandler = () => {
    props.toggleSort();
    document.addEventListener(`click`, handleClick);
  };

  const onSortChangeHandler = (e) => {
    setSortType(e.currentTarget.id);
    sortFilteredOffers();
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span onClick={onSortClickHandler} className="places__sorting-type" tabIndex="0">
        Popular
          <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? `places__options--opened` : ``}`}>
        {sortOptions.map((item, i) => {
          const SortTypesValues = Object.values(SortTypes);
          const currentSortType = SortTypesValues[i];
          const isActive = activeSortType === currentSortType;
          return (
            <li
              className={`places__option ${isActive ? `places__option--active` : ``}`}
              tabIndex={i}
              key={item}
              id={currentSortType}
              onClick={onSortChangeHandler}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </form>
  );
}


SortOffers.propTypes = {
  activeSortType: PropTypes.string,
  isOpen: PropTypes.bool,
  toggleSort: PropTypes.func,
  setSortType: PropTypes.func,
  sortFilteredOffers: PropTypes.func
};

export default connect(
  (state) => ({
    activeSortType: getActiveSortType(state),
    isOpen: getIsSortOpen(state),
  }),
  (dispatch) => ({
    toggleSort: () => dispatch(ActionCreator.toggleSort()),
    setSortType: (sortType) => dispatch(ActionCreator.setSortType(sortType)),
    sortFilteredOffers: () => dispatch(ActionCreator.sortFilteredOffers()),
  })
)(SortOffers);
