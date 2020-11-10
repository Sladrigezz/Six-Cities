import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const mock = [
  {title: `Beautiful & luxurious apartment at great location`},
];

it(`Correctly renders component 'App'`, () => {
  const tree = renderer
    .create(<App
      data={mock}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
