import React from 'react';
import renderer from 'react-test-renderer';
import {SignIn} from './sign-in.jsx';

it(`should match snapshot`, () => {
  const props = {
    updateFieldValue: jest.fn(),
    login: jest.fn(),
  };

  const wrapper = renderer.create(<SignIn {...props} />).toJSON();

  expect(wrapper).toMatchSnapshot();
});
