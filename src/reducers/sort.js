import {SortTypes} from "../constants/constants";

const initialState = {
  isSortOpen: false,
  sortType: SortTypes.POPULAR,
};

export const toggleSort = () => ({type: `TOGGLE_SORT`});
export const setSortType = (sortType) => ({type: `SET_SORT_TYPE`, payload: sortType});

export const ActionCreator = {
  toggleSort,
  setSortType
};

const sort = (state = initialState, action) => {
  switch (action.type) {
    case `TOGGLE_SORT`:
      return Object.assign({}, state, {isSortOpen: !state.isSortOpen});

    case `SET_SORT_TYPE`:
      return Object.assign({}, state, {sortType: action.payload});
  }

  return state;
};

export default sort;


