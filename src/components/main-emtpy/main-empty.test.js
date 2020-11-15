import React from 'react';
import renderer from 'react-test-renderer';
import {MainEmpty} from './main-empty.jsx';

import {Router} from 'react-router-dom';
import history from '../../history/history.js';

jest.mock(`../sign-in/sign-in.jsx`);

it(`should match snapShot`, () => {

  const props = {
    checkAuthorization: jest.fn()
  };
  const wrapper = renderer.create(
      <Router history={history}>
        <MainEmpty {...props} />
      </Router>
  ).toJSON();

  expect(wrapper).toMatchSnapshot();
});
