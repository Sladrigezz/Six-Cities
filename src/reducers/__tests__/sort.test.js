import reducer from '../sort.js';

const initialState = {
  isSortOpen: false,
  sortType: `POPULAR`,
};

describe(`reducer works correctly`, () => {
  it(`should return initialState, when no parametres`, () => {
    const action = {};
    const newState = reducer(initialState, action);

    expect(newState).toEqual(initialState);
  });

  it(`should change isSortOpen on the oposite value when called toggleSort`, () => {
    const action = {type: `TOGGLE_SORT`};
    const newState = reducer(initialState, action);
    const expectedState = Object.assign({}, initialState, {isSortOpen: true});
    expect(newState).toEqual(expectedState);
  });

  it(`should change sort type on a given value`, () => {
    const action = {type: `SET_SORT_TYPE`, payload: `AAA`};
    const newState = reducer(initialState, action);
    const expectedState = Object.assign({}, initialState, {sortType: `AAA`});
    expect(newState).toEqual(expectedState);
  });
});
