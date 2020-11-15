import {isEmpty, propEq, find, isNil, ascend, prop, sort, descend} from 'ramda';

import {setCitiesList, setCity} from './user.js';
import {getFilteredOffers} from '../selectors/data.js';
import {getActviveCity} from '../selectors/user.js';
import {getActiveSortType} from '../selectors/sort.js';
import {SortTypes} from '../constants/constants.js';
import history from '../history/history.js';

const initialState = {
  offers: [],
  offerReviews: [],
  filteredOffers: [],
  favoriteOffers: [],
  responses: {},
};

export const setOffers = (offers) => ({type: `SET_OFFERS`, payload: offers});
export const setReviews = (reviews) => ({type: `SET_REVIEWS`, payload: reviews});
export const setFilteredOffers = (offers) => ({type: `SET_FILTERED_OFFERS`, payload: offers});
export const saveAuthResponse = (authResponse) => ({type: `SAVE_AUTH_RESPONSE`, payload: authResponse});
export const setFavoriteOffers = (offers) => ({type: `SET_FAVORITE_OFFERS`, payload: offers});

const filterOffers = (activeCity, offers) => {
  return offers.filter((item) => {
    return item.city.name === activeCity;
  });
};

const sortOffers = (offers, sortType) => {
  switch (sortType) {
    case SortTypes.PRICEASC:
      const byPriceAsc = ascend(prop(`price`));
      return sort(byPriceAsc, offers);

    case SortTypes.PRICEDESC:
      const byPriceDesc = descend(prop(`price`));
      return sort(byPriceDesc, offers);

    case SortTypes.RATEDESC:
      const byRateDesc = descend(prop(`rating`));
      return sort(byRateDesc, offers);
  }

  return offers;
};

export const sortFilteredOffers = () => (dispatch, getState) => {
  const filteredOffers = getFilteredOffers(getState());
  const sortType = getActiveSortType(getState());

  const sortedOffers = sortOffers(filteredOffers, sortType);

  dispatch(setFilteredOffers(sortedOffers));
};

export const loadOffers = (offerId) => (dispatch, getState, api) => {
  const activeCity = getActviveCity(getState());

  return api.get(`/hotels`)
  .then((response) => {

    if (isNil(response) || isEmpty(response.data)) {
      return history.push(`/offers-not-found`);
    }

    const offers = response.data;
    let citiesList = [];
    offers.forEach((item) => {
      const cityName = item.city.name;
      return citiesList.includes(cityName) ? null : citiesList.push(cityName);
    });

    dispatch(setOffers(offers));
    dispatch(setCitiesList(citiesList));

    if (!isEmpty(activeCity)) {
      const filteredOffers = filterOffers(activeCity, offers);
      dispatch(setFilteredOffers(filteredOffers));
    }

    if (isEmpty(activeCity) && isNil(offerId)) {
      const defaultCity = citiesList[0];
      const filteredOffers = filterOffers(defaultCity, offers);
      dispatch(setCity(defaultCity));
      dispatch(setFilteredOffers(filteredOffers));
    }

    if (isEmpty(activeCity) && !isNil(offerId)) {
      const offer = find(propEq(`id`, offerId))(offers);
      const defaultCity = offer.city.name;
      const filteredOffers = filterOffers(defaultCity, offers);
      dispatch(setCity(defaultCity));
      dispatch(setFilteredOffers(filteredOffers));
    }

    return true;
  });
};

export const loadFavoriteOffers = () => (dispatch, getState, api) => {
  return api.get(`/favorite`)
  .then((response) => {
    if (!isNil(response) && isEmpty(response.data)) {
      history.push(`/favorites-not-found`);
    }
    return dispatch(setFavoriteOffers(response.data));
  });
};

export const loadReviews = (id) => (dispatch, getState, api) => {
  return api.get(`/comments/${id}`)
  .then((response) => {
    return !isNil(response) ? dispatch(setReviews(response.data)) : [];
  });
};

export const updateOffersList = () => (dispatch, getState) => {
  const offers = getFilteredOffers(getState());
  dispatch(setFilteredOffers(offers));
};

export const ActionCreator = {
  setOffers,
  setReviews,
  setFilteredOffers,
  loadOffers,
  sortFilteredOffers,
  setFavoriteOffers,
  loadFavoriteOffers,
};

const data = (state = initialState, action) => {
  switch (action.type) {
    case `SET_OFFERS`:
      return Object.assign({}, state, {offers: action.payload});
    case `SET_FILTERED_OFFERS`:
      return Object.assign({}, state, {filteredOffers: action.payload});
    case `SAVE_AUTH_RESPONSE`:
      const responses = Object.assign({}, state.responses, {auth: action.payload});
      return Object.assign({}, state, {responses});
    case `SET_REVIEWS`:
      return Object.assign({}, state, {offerReviews: action.payload});
    case `SET_FAVORITE_OFFERS`:
      return Object.assign({}, state, {favoriteOffers: action.payload});
  }

  return state;
};

export default data;
