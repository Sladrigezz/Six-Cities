import React from 'react';
import renderer from 'react-test-renderer';
import MainCard from './main-card.jsx';

const mock = [
  {title: `Beautiful & luxurious apartment at great location`},
];

it(`Correctly render component MainCard`, () => {
  const tree = renderer
    .create(<MainCard
      titleCard={mock}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
