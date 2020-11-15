import React from 'react';
import renderer from 'react-test-renderer';
import {SignIn} from './sign-in.jsx';

import {Router} from 'react-router-dom';
import history from '../../history/history.js';

it(`should match snapShot`, () => {
  const props = {
    responses: {
      auth: {
        email: `aaa@bbb.cz`
      }
    }
  };
  const wrapper = renderer.create(
      <Router history={history}>
        <SignIn {...props} />
      </Router>
  ).toJSON();

  expect(wrapper).toMatchSnapshot();
});
