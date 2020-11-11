import React from 'react';
import {mount, configure} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import withActiveItem from './with-active-item.js';

configure({adapter: new Adapter()});
const onItemClickHandler = jest.fn();
const MockComponent = () => {
  return (
    <div>
      <a onClick={onItemClickHandler} />
    </div>
  );
};

const MockComponentWrapped = withActiveItem(MockComponent);

it(`set first item of items array, by default`, () => {
  const wrapper = mount(<MockComponentWrapped />);

  expect(wrapper.state().activeItem).toEqual(`Paris`);
});

it(`should change item value after calling hoc's callback`, () => {
  const wrapper = mount(<MockComponentWrapped />).setState({activeItem: `offer-1`});

  expect(wrapper.state().activeItem).toEqual(`offer-1`);
});

it(`simulates click event and calling hoc's callback`, () => {
  mount(<MockComponentWrapped />).find(`a`).simulate(`click`);

  expect(onItemClickHandler).toHaveBeenCalledTimes(1);
});
