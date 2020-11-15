import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';

import {CardOffersList} from './card-offers-list.jsx';
import history from '../../history/history.js';

it(`should match snapshot`, () => {
  const offers = [{
    name: `AAA`,
    price: 120,
    type: `AAA`,
    images: [`aaa`],
  }];

  const wrapper = renderer.create(
      <Router history={history}>
        <CardOffersList offers={offers} />
      </Router>
  ).toJSON();

  expect(wrapper).toMatchSnapshot();
});
