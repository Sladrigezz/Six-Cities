import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import leaflet from 'leaflet';
import reducer from '../../reducer.js';

leaflet.map = () => ({
  setView: () => {},
  addLayer: () => {},
});

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

const store = createStore(reducer);

it(`Correctly renders component 'App'`, () => {
  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            data = {mock}
          />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
