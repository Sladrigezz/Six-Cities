import MockAdapter from 'axios-mock-adapter';
import createAPI from '../../api/api.js';

import reducer, {logIntoApp, checkAuthorization, sendReview} from '../user.js';

const initialState = {
  activeCity: ``,
  activeOffer: null,
  hoveredOffer: null,
  citiesList: [],
  isAuthorizationRequired: true,
  form: {},
  submitDefaultState: true
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

  it(`should create a correct API call to post/login endPoint`, () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    getState.mockReturnValue({user: {form: {email: `aaa@dd.cz`, password: `asdfa`}}});
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const login = logIntoApp();

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

  it(`should check if user is authorized`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const checkAuth = checkAuthorization();

    apiMock.onGet(`/login`).reply(200, [{email: `aaa@bbb.cz`, id: 1}]);

    return checkAuth(dispatch, null, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: `SAVE_AUTH_RESPONSE`,
        payload: [{email: `aaa@bbb.cz`, id: 1}]
      });
    });
  });

  it(`should send review with a given values`, () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    getState.mockReturnValue({user: {form: {email: `aaa@dd.cz`, password: `asdfa`}}, activeOffer: 1});

    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const send = sendReview();

    apiMock.onPost(`/comments/1`, {rating: `2`, comment: `aaa`}).reply(200, [
      {
        rating: 2,
        comment: `aaa`,
        date: `2019-05-08T14:13:56.569Z`
      }
    ]);

    return send(dispatch, getState, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(2, {type: `SET_REVIEWS`});
    });
  });

  it(`should require authorization`, () => {
    const action = {type: `REQUIRE_AUTHORIZATION`, payload: false};
    const newState = reducer(initialState, action);
    const expectedState = Object.assign({}, initialState, {isAuthorizationRequired: false});

    expect(newState).toEqual(expectedState);
  });

  it(`should update field value`, () => {
    const action = {type: `UPDATE_FIELD_VALUE`, payload: {fieldName: `email`, value: `22@vv.cz`}};
    const newState = reducer(initialState, action);
    const expectedState = Object.assign({}, initialState, {form: {email: `22@vv.cz`}});

    expect(newState).toEqual(expectedState);
  });

  it(`should set active offer id`, () => {
    const action = {type: `SET_ACTIVE_OFFER`, payload: `2`};
    const newState = reducer(initialState, action);
    const expectedState = Object.assign({}, initialState, {activeOffer: `2`});

    expect(newState).toEqual(expectedState);
  });

  it(`should set hovered offer id`, () => {
    const action = {type: `SET_HOVERED_OFFER`, payload: 2};
    const newState = reducer(initialState, action);
    const expectedState = Object.assign({}, initialState, {hoveredOffer: 2});

    expect(newState).toEqual(expectedState);
  });

  it(`should reset form`, () => {
    const action = {type: `RESET_FORM`};
    const newState = reducer(initialState, action);
    const expectedState = Object.assign({}, initialState, {form: {}});

    expect(newState).toEqual(expectedState);
  });

  it(`should set a given state to a submit button`, () => {
    const action = {type: `SET_BUTTON_STATE`, payload: false};
    const newState = reducer(initialState, action);
    const expectedState = Object.assign({}, initialState, {submitDefaultState: false});

    expect(newState).toEqual(expectedState);
  });
});
