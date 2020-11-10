import React from 'react';
import renderer from 'react-test-renderer';
import PlaceCard from './place-card.jsx';

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

it(`Correctly render component ItemCard`, () => {
  const testHandler = jest.fn();
  const tree = renderer
  .create(<PlaceCard
    onClick={testHandler}
    onDeHover={testHandler}
    onHover={testHandler}
    index={mock[0].id}
    data={mock[0]}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});

