import React from 'react';
import renderer from 'react-test-renderer';
import MainPage from './main-page.jsx';

const mock = [
  {
    title: `Beautiful & luxurious apartment at great location`,
    price: `120`,
    degree: `Apartment`,
    order: `Premium`,
    photo: `img/apartment-01.jpg`,
    id: 1
  },
];

it(`Correctly render component MainPage`, () => {
  const tree = renderer
    .create(<MainPage
      data={mock}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});


