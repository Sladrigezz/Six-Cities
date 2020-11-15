import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';

import {MainPage} from './main-page.jsx';
import history from '../../history/history.js';

jest.mock(`../map/map.jsx`);
jest.mock(`../cities-list/cities-list.jsx`);
jest.mock(`../card-offers-list/card-offers-list.jsx`);
jest.mock(`../sort-offers/sort-offers.jsx`);
jest.mock(`../sign-in/sign-in.jsx`);

it(`should match snapshot`, () => {
  const checkAuthorization = jest.fn();
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
    checkAuthorization,
  };
  const mainPage = renderer.create(
      <Router history={history}>
        <MainPage {...props} />
      </Router>
  ).toJSON();

  expect(mainPage).toMatchSnapshot();
});

