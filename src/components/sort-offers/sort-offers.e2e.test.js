import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {SortOffers} from './sort-offers.jsx';

Enzyme.configure({adapter: new Adapter()});

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

it(`should call toggleSort on click`, () => {
  const wrapper = shallow(<SortOffers {...props} />);

  wrapper.find(`.places__sorting-type`).simulate(`click`);

  expect(toggleSort).toHaveBeenCalledTimes(1);
});

it(`should set sort type and sort filtered offers after change sort`, () => {
  const wrapper = shallow(<SortOffers {...props} />);
  const e = {
    currentTarget: {
      id: 3
    }
  };

  wrapper.find(`li`).at(1).simulate(`click`, e);

  expect(setSortType).toHaveBeenCalledTimes(1);
  expect(sortFilteredOffers).toHaveBeenCalledTimes(1);

  expect(setSortType).toHaveBeenCalledWith(3);

});

