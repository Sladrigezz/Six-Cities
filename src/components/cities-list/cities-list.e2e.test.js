import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {CitiesList} from './cities-list.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`Component CitiesList works correctly`, () => {
  const setActiveCity = jest.fn();
  const updateOffersList = jest.fn();
  const props = {
    cities: [`Paris`, `AAA`],
    activeCity: `AAA`,
    setActiveCity,
    updateOffersList,
  };

  const e = {
    currentTarget: {
      id: `Paris`
    }
  };

  it(`should call setCity with given city name`, () => {
    const wrapper = shallow(<CitiesList {...props} />);

    wrapper.find(`a`).last().simulate(`click`, e);
    expect(setActiveCity).toHaveBeenCalledWith(`Paris`);
  });
});
