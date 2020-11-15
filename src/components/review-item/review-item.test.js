/* eslint-disable camelcase */
import React from 'react';
import renderer from 'react-test-renderer';
import {ReviewItem} from './review-item.jsx';

it(`should match snapshot`, () => {
  const review = {
    date: `2019-12-12`,
    user: {
      name: `AAA`,
      avatar_url: `BBB`,
    },
    comment: `CCC`,
    rating: 4,
  };

  const wrapper = renderer.create(<ReviewItem review={review} />).toJSON();
  expect(wrapper).toMatchSnapshot();
});
