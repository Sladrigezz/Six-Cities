import data from './mocks/offers';

const initialState = {
  currentCity: `Amsterdam`,
  listCities: new Set([...data.map((offer) => offer.city)])
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CITY_CHANGE`:
      return Object.assign({}, state, {
        currentCity: action.city
      });
    default: return state;
  }
};


export default reducer;
