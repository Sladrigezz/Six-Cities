import MockAdapter from 'axios-mock-adapter';
import createAPI from '../../api/api.js';

import reducer, {checkAuthorization} from '../user.js';

const initialState = {
  activeCity: ``,
  citiesList: [],
};

describe(`reducer works correctly`, () => {
  it(`should return initialState when no paramteres`, () => {
    const action = {};
    const newState = reducer(initialState, action);

    expect(newState).toEqual(initialState);
  });

  it(`should set given city as active`, () => {
    const action = {type: `SET_CITY`, payload: `AAA`};
    const newState = reducer(initialState, action);
    const expectedState = Object.assign({}, initialState, {activeCity: `AAA`});

    expect(newState).toEqual(expectedState);
  });

  it(`should set cities list by a given data`, () => {
    const action = {type: `SET_CITIES`, payload: [1, 2, 3]};
    const newState = reducer(initialState, action);
    const expectedState = Object.assign({}, initialState, {citiesList: [1, 2, 3]});

    expect(newState).toEqual(expectedState);
  });

  it(`should create a correct API call to /login endPoint`, () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValue({user: {formAuth: {email: `aaa@dd.cz`, password: `asdfa`}}});
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const login = checkAuthorization();

    apiMock.onPost(`/login`).reply(200, [{email: `aaa@bbb.cz`, id: 1}]);

    return login(dispatch, getState, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: `SAVE_AUTH_RESPONSE`,
        payload: [{email: `aaa@bbb.cz`, id: 1}]
      });
    });
  });
});
