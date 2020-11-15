import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';

import {Login} from './login.jsx';
import history from '../../history/history.js';

jest.mock(`../sign-in/sign-in.jsx`);


it(`should match snapshot`, () => {
  const props = {
    updateFieldValue: jest.fn(),
    login: jest.fn(),
    checkAuthorization: jest.fn(),
  };

  const wrapper = renderer.create(
      <Router history={history}>
        <Login {...props} />
      </Router>
  ).toJSON();

  expect(wrapper).toMatchSnapshot();
});
