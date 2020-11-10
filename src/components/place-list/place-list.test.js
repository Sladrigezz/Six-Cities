import React from 'react';
import renderer from 'react-test-renderer';
import PlaceList from './place-list.jsx';

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

it(`Correctly render component MainCard`, () => {
  const tree = renderer
  .create(<PlaceList
    cards = {mock}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});


