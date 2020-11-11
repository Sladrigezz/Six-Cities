import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withActiveItem from './with-active-item';

configure({adapter: new Adapter()});
const MockComponent = () => <div />;
const MockComponentWrapped = withActiveItem(MockComponent);

it(`Test HOC Component`, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  expect(wrapper.props().activeItem).toEqual(null);

  wrapper.props().onActiveItemChange(2);
  expect(wrapper.props().activeItem).toEqual(2);
});

