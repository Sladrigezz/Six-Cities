import React from 'react';
import renderer from 'react-test-renderer';
import {Logo} from './logo.jsx';

import {Router} from 'react-router-dom';
import history from '../../history/history.js';

it(`should match snapShot`, () => {
  const wrapper = renderer.create(
      <Router history={history}>
        <Logo />
      </Router>
  ).toJSON();

  expect(wrapper).toMatchSnapshot();
});
