import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';

jest.mock(`../map/map`);
jest.mock(`../main-page/main-page.jsx`);

it(`should match snapshot`, () => {
  const offers = [{
    name: `AAA`,
    price: 120,
    type: `AAA`,
    src: `AAA`,
  }];

  const app = renderer.create(<App offers={offers} />).toJSON();
  expect(app).toMatchSnapshot();
});
