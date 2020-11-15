import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Login} from './login';

Enzyme.configure({adapter: new Adapter()});

it(`should try to login after click on submit`, () => {

  const login = jest.fn();
  const props = {
    updateFieldValue: jest.fn(),
    checkAuthorization: jest.fn(),
    login,
  };

  const e = {
    preventDefault: jest.fn()
  };

  const wrapper = shallow(<Login {...props} />);

  wrapper.find(`button`).simulate(`click`, e);

  expect(login).toHaveBeenCalledTimes(1);
});

it(`should call updateFieldValue on change the input`, () => {

  const login = jest.fn();
  const updateFieldValue = jest.fn();
  const props = {
    updateFieldValue,
    login,
    checkAuthorization: jest.fn(),
  };

  const e = {
    currentTarget: {
      name: `AAA`,
      value: `BBB`
    }
  };

  const wrapper = shallow(<Login {...props} />);

  wrapper.find(`input`).first().simulate(`change`, e);

  expect(updateFieldValue).toHaveBeenCalledTimes(1);
  expect(updateFieldValue).toHaveBeenCalledWith(`AAA`, `BBB`);
});
