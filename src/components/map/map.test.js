import React from 'react';
import {MapSection} from './map.jsx';
import renderer from 'react-test-renderer';

it(`should match snapshot`, () => {
  const filteredOffers = [{
    city: {
      location: {
        latitude: 111,
        longitude: 222,
        zoom: 1
      },
      name: `AAA`,
    },
    price: 120,
    type: `AAA`,
    src: [`AAA`],
    position: [123, 123],
  }];

  const div = document.createElement(`div`);
  div.id = `map`;
  document.body.appendChild(div);

  const wrapper = renderer.create(<MapSection filteredOffers={filteredOffers} />).toJSON();

  expect(wrapper).toMatchSnapshot();
});
