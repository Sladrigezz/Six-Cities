import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';

import {App} from './app.jsx';
import history from '../../history/history.js';

jest.mock(`../map/map`);
jest.mock(`../main-page/main-page.jsx`);

it(`should match snapshot`, () => {
  const offers = [{
    name: `AAA`,
    price: 120,
    type: `AAA`,
    src: `AAA`,
  }];

  const app = renderer.create(
      <Router history={history}>
        <App offers={offers} />
      </Router>
  ).toJSON();
  expect(app).toMatchSnapshot();
});
