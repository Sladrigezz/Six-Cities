import React from 'react';
import renderer from 'react-test-renderer';
import {CardOffer} from './card-offer.jsx';

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

  const cardOffer = renderer.create(<CardOffer {...props} />).toJSON();

  expect(cardOffer).toMatchSnapshot();
});
