import React from 'react';
import {MapSection} from './map.jsx';
import renderer from 'react-test-renderer';

it(`should match snapshot`, () => {
  const offers = [{
    location: {
      latitude: 111,
      longitude: 222,
      zoom: 1
    },
    name: `AAA`,
    price: 120,
    type: `AAA`,
    src: [`AAA`],
    position: [123, 123],
  }];

  const city = {
    location: {
      latitude: 123,
      longitude: 214,
    }
  };

  const div = document.createElement(`div`);
  div.id = `map`;
  document.body.appendChild(div);

  const wrapper = renderer.create(<MapSection offers={offers} city={city} />).toJSON();

  expect(wrapper).toMatchSnapshot();
});
