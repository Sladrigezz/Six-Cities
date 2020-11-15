import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {MainPage} from './main-page.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`should exist`, () => {
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

  const wrapper = shallow(<MainPage {...props} />);

  expect(wrapper).toBeDefined();
});
