import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {CardOffer} from './card-offer.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`simulates onMouseEnter event`, () => {
  const onItemClickHandler = jest.fn();
  const props = {
    offer: {
      title: `aaa`,
      price: 10,
      type: `bbb`,
      images: [`ccc`],
    },
    offerName: `offer-1`,
    onItemClickHandler,
  };

  const wrapper = shallow(<CardOffer {...props} />);

  wrapper.find(`img`).first().simulate(`mouseEnter`, `offer-1`);

  expect(onItemClickHandler).toHaveBeenCalledWith(`offer-1`);
});
