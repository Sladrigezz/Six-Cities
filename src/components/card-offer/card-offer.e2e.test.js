import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {CardOffer} from './card-offer.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`simulates onMouseEnter event`, () => {
  const mouseEnterHandler = jest.fn();
  const props = {
    offer: {
      title: `aaa`,
      price: 10,
      type: `bbb`,
      images: [`ccc`],
      id: 1,
      rating: 5
    },
    offerName: `offer-1`,
    mouseEnterHandler,
  };

  const e = {
    currentTarget: {
      id: 1
    }
  };

  const wrapper = shallow(<CardOffer {...props} />);

  wrapper.find(`img`).first().simulate(`mouseEnter`, e);

  expect(mouseEnterHandler).toHaveBeenCalledWith(1);
});
