import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ReviewForm} from './review-form.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`should update field value with a given value`, () => {
  const updateFieldValue = jest.fn();
  const resetForm = jest.fn();
  const sendReview = jest.fn();

  const props = {
    formData: {
      comment: `aaa`,
      rating: `55`,
    },
    updateFieldValue,
    resetForm,
    sendReview,
  };

  const e = {
    currentTarget: {
      name: `aaa`,
      value: `bbb`
    }
  };

  const e1 = {
    currentTarget: {
      name: `text`,
      value: `aaabbb`
    }
  };

  const wrapper = shallow(<ReviewForm {...props} />);

  wrapper.find(`input`).first().simulate(`change`, e);
  wrapper.find(`textarea`).first().simulate(`change`, e1);

  expect(updateFieldValue).toHaveBeenCalledTimes(2);
  expect(updateFieldValue).toHaveBeenNthCalledWith(1, `aaa`, `bbb`);
  expect(updateFieldValue).toHaveBeenNthCalledWith(2, `text`, `aaabbb`);
});


