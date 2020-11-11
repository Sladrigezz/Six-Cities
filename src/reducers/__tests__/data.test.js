import MockAdapter from 'axios-mock-adapter';
import reducer, {loadOffers} from '../data.js';
import createAPI from '../../api/api.js';

const initialState = {
  offers: [],
  filteredOffers: [],
};

describe(`reducer works correctly`, () => {
  it(`should return initialState, when no parametres`, () => {
    const action = {};
    const newState = reducer(initialState, action);

    expect(newState).toEqual(initialState);
  });

  it(`should set offers by a given data`, () => {
    const action = {type: `SET_OFFERS`, payload: [1, 2, 3]};
    const newState = reducer(initialState, action);
    const expectedState = Object.assign({}, initialState, {offers: [1, 2, 3]});
    expect(newState).toEqual(expectedState);

  });

  it(`should set filtered offers by a given data`, () => {
    const action = {type: `SET_FILTERED_OFFERS`, payload: [1, 2, 3]};
    const newState = reducer(initialState, action);
    const expectedState = Object.assign({}, initialState, {filteredOffers: [1, 2, 3]});
    expect(newState).toEqual(expectedState);
  });

  it(`should create a correct API call to a /hotels endPoint`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const offersLoader = loadOffers();

    apiMock.onGet(`/hotels`).reply(200, [{city: {name: `aaa`}}]);

    return offersLoader(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `SET_OFFERS`,
          payload: [{city: {name: `aaa`}}],
        });
      });
  });
});
