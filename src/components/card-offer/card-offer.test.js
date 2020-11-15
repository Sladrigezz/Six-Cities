import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';

import {CardOffer} from './card-offer.jsx';
import history from '../../history/history.js';

it(`should match snapshot`, () => {
  const props = {
    offer: {
      name: `aaa`,
      price: 10,
      type: `bbb`,
      images: [`ccc`],
    },
    onMouseEnterHandler: jest.fn(),
    offerName: `offer-1`,
  };

  const cardOffer = renderer.create(
      <Router history={history}>
        <CardOffer {...props} />
      </Router>
  ).toJSON();

  expect(cardOffer).toMatchSnapshot();
});
