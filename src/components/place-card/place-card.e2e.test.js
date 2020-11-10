import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlaceCard from './place-card.jsx';

const mock = [
  {
    title: `Beautiful & luxurious apartment at great location`,
    price: `120`,
    degree: `Apartment`,
    order: `Premium`,
    photo: `img/apartment-01.jpg`,
    id: 55
  },
];

Enzyme.configure({adapter: new Adapter()});

describe(`Test e2e value component`, () => {
  const clickHandler = jest.fn();
  const app = shallow(<PlaceCard
    index={mock[0].id}
    data={mock[0]}
    onClick = {clickHandler}/>);

  it(`Click on link - 'Head in Card'`, () => {
    const imageCard = app.find(`.place-card__image`);
    imageCard.simulate(`click`);

    expect(clickHandler).toHaveBeenCalledTimes(1);
    expect(clickHandler).toHaveBeenCalledWith(mock[0].id);
  });
});
