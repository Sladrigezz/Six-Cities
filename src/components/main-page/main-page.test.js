import React from 'react';
import renderer from 'react-test-renderer';
import MainPage from './main-page.jsx';

const mock = [
  {title: `Beautiful & luxurious apartment at great location`},
];

it(`Correctly render component MainPage`, () => {
  const tree = renderer
    .create(<MainPage
      data={mock}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
