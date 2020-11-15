/* eslint-disable camelcase */
import React from 'react';
import renderer from 'react-test-renderer';
import {ReviewsList} from './reviews-list.jsx';

it(`should match snapshot`, () => {
  const review1 = {
    date: `2019-12-12`,
    user: {
      name: `AAA`,
      avatar_url: `BBB`,
    },
    comment: `CCC`,
    rating: 4,
  };
  const wrapper = renderer.create(<ReviewsList reviews={[review1]} />).toJSON();

  expect(wrapper).toMatchSnapshot();
});
