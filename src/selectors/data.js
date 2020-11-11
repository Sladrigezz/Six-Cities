import {createSelector} from 'reselect';
import {getActviveCity} from './user';

export const getOffers = (state) => state.data.offers;
export const getResponseAuth = (state) => state.data.responses.auth;

export const getFilteredOffers = createSelector(
    getActviveCity,
    getOffers,
    (activeCity, offers) => {
      return offers.filter((item) => {
        return item.city.name === activeCity;
      });
    }
);
