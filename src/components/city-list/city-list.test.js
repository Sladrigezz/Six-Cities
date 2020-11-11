import React from 'react';
import renderer from 'react-test-renderer';
import CityList from './city-list.jsx';

const mock = new Set([
  `Amsterdam`,
  `Budapesht`,
  `Wroclaw`
]);

it(`Test CityList Component`, () => {
  const tree = renderer
    .create(<CityList
      onChangeCity={() => {}}
      cities={mock}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
