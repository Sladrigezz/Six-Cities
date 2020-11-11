import React from 'react';
import renderer from 'react-test-renderer';
import {MainPage} from './main-page.jsx';

jest.mock(`../map/map.jsx`);
jest.mock(`../cities-list/cities-list.jsx`);
jest.mock(`../card-offers-list/card-offers-list.jsx`);

it(`should match snapshot`, () => {
  const loadOffersList = jest.fn();
  const setDefaultSettings = jest.fn();
  const props = {
    offers: [{
      name: `AAA`,
      price: 120,
      type: `AAA`,
      src: `AAA`,
    }],
    filteredOffers: [{
      name: `AAA`,
      price: 120,
      type: `AAA`,
      src: `AAA`,
    }],
    cities: [`AAA`],
    activeCity: `AAA`,
    responseAuth: {
      email: `ccc@cv.cz`
    },
    loadOffersList,
    setDefaultSettings,
  };
  const mainPage = renderer.create(<MainPage {...props} />).toJSON();

  expect(mainPage).toMatchSnapshot();
});

