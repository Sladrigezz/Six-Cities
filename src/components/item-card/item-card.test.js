import React from 'react';
import renderer from 'react-test-renderer';
import ItemCard from './item-card.jsx';


it(`Correctly render component ItemCard`, () => {
  const tree = renderer
    .create(<ItemCard
      title={`Hello world`}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
