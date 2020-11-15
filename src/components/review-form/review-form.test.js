import React from 'react';
import renderer from 'react-test-renderer';

import {ReviewForm} from './review-form.jsx';

it(`should match snapShot`, () => {
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
  const wrapper = renderer.create(<ReviewForm {...props} />).toJSON();

  expect(wrapper).toMatchSnapshot();
});
