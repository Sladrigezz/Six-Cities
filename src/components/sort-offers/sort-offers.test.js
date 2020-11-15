import React from 'react';
import renderer from 'react-test-renderer';
import {SortOffers} from './sort-offers.jsx';

it(`should match snapshot`, () => {
  const toggleSort = jest.fn();
  const setSortType = jest.fn();
  const sortFilteredOffers = jest.fn();

  const props = {
    activeSortType: `POPULAR`,
    isOpen: true,
    toggleSort,
    setSortType,
    sortFilteredOffers
  };

  const wrapper = renderer.create(<SortOffers {...props} />).toJSON();

  expect(wrapper).toMatchSnapshot();
});
