import MockAdapter from 'axios-mock-adapter';
import reducer, {loadOffers, loadFavoriteOffers, loadReviews} from '../data.js';
import createAPI from '../../api/api.js';

const initialState = {
  offers: [],
  offerReviews: [],
  filteredOffers: [],
  favoriteOffers: [],
  responses: {},
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
    const getState = jest.fn();

    getState.mockReturnValue({user: {activeCity: `Amster`}});

    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const offersLoader = loadOffers();

    apiMock.onGet(`/hotels`).reply(200, [{city: {name: `aaa`}}]);

    return offersLoader(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `SET_OFFERS`,
          payload: [{city: {name: `aaa`}}],
        });
      });
  });

  it(`should load favorite offer`, () => {
    const dispatch = jest.fn();

    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const offersLoader = loadFavoriteOffers();

    apiMock.onGet(`/favorite`).reply(200, [{city: {name: `aaa`}}]);

    return offersLoader(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `SET_FAVORITE_OFFERS`,
          payload: [{city: {name: `aaa`}}],
        });
      });
  });

  it(`should load reviews`, () => {
    const dispatch = jest.fn();

    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const reviewsLoader = loadReviews(1);

    apiMock.onGet(`/comments/1`).reply(200, [{id: `1`}]);

    return reviewsLoader(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `SET_REVIEWS`,
          payload: [{id: `1`}],
        });
      });
  });

  it('should set reviews by a given data', () => {
    const action = {type: `SET_REVIEWS`, payload: [1, 2, 3]};
    const newState = reducer(initialState, action);
    const expectedState = Object.assign({}, initialState, {offerReviews: [1, 2, 3]});

    expect(newState).toEqual(expectedState);
  });

  it('should save a response with auth info from BE', () => {
    const action = {type: `SAVE_AUTH_RESPONSE`, payload: `aaa`};
    const newState = reducer(initialState, action);
    const expectedState = Object.assign({}, initialState, {responses: {auth: `aaa`}});

    expect(newState).toEqual(expectedState);
  });
  
  it('should save favourite offers sgiven by BE', () => {
    const action = {type: `SET_FAVORITE_OFFERS`, payload: [1, 2, 3]};
    const newState = reducer(initialState, action);
    const expectedState = Object.assign({}, initialState, {favoriteOffers: [1, 2, 3]});

    expect(newState).toEqual(expectedState);
  });
  
});
