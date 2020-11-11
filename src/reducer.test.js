import reducer from './reducer.js';
import * as actions from './actions.js';

describe(`Testing my reducer`, () => {

  const initialState = {
    currentCity: `Amsterdam`,
  };
  it(`Change city on action`, () => {
    expect(reducer(initialState, actions.changeCity(`Wroclaw`)))
    .toEqual({"currentCity": `Wroclaw`});
  });
});


