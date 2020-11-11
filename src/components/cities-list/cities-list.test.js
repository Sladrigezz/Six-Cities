import React from 'react';
import renderer from 'react-test-renderer';
import {CitiesList} from './cities-list.jsx';

it(`should match snapshot`, () => {
  const setActiveCity = jest.fn();
  const updateOffersList = jest.fn();
  const props = {
    cities: [`Paris`, `AAA`],
    activeCity: `AAA`,
    setActiveCity,
    updateOffersList,
  };

  const wrapper = renderer.create(<CitiesList {...props} />).toJSON();

  expect(wrapper).toMatchSnapshot();
});
