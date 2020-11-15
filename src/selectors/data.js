import {createSelector} from 'reselect';
import {isNil, isEmpty, propEq, find, slice, prop, sort, descend} from 'ramda';
import sortByDistance from 'sort-by-distance';

import {getActviveCity, getActiveOffer} from './user.js';
import {firstClosestOffer, lastClosestOffer} from '../constants/constants.js';

export const getOffers = (state) => state.data.offers;
export const getReviews = (state) => state.data.offerReviews;
export const getOffer = (state, id) => state.data.offers[id - 1];
export const getResponses = (state) => state.data.responses;
export const getResponseAuth = (state) => state.data.responses.auth;
export const getFavoriteOffers = (state) => state.data.favoriteOffers;

export const getReviewList = createSelector(
    getReviews,
    (reviews) => {
      let reviewList = [];
      if (!isNil(reviews)) {
        reviewList = reviews.length > 10 ? slice(0, 10, reviews) : reviews;
      }

      const byDate = descend(prop(`date`));
      const sorted = sort(byDate, reviewList);

      return sorted;
    }
);

export const getFilteredOffers = createSelector(
    getActviveCity,
    getOffers,
    (activeCity, offers) => {
      return offers.filter((item) => {
        return item.city.name === activeCity;
      });
    }
);

const filterOffersByCity = (city, offers) => {
  const filteredOffers = offers.filter((item) => {
    return item.city.name === city;
  });
  return filteredOffers;
};

export const getFavoriteCities = createSelector(
    getFavoriteOffers,
    (offers) => {
      let favoriteCities = [];

      if (!offers) {
        return favoriteCities;
      }
      offers.map((item) => {
        if (!favoriteCities.includes(item.city.name)) {
          return favoriteCities.push(item.city.name);
        }
        return true;
      });

      return favoriteCities;
    }
);

export const getComposedFavoriteOffersOffers = createSelector(
    getFavoriteOffers,
    getFavoriteCities,
    (offers, cities) => {
      let citiesObject = {};

      if (!offers || !cities) {
        return citiesObject;
      }

      cities.map((item) => {
        citiesObject[item] = filterOffersByCity(item, offers);
      });
      return citiesObject;
    }
);

export const getClosestOffers = createSelector(
    getFilteredOffers,
    getActiveOffer,
    (offers, offerId) => {

      let restructuredOffers = [];
      let targetOffer;
      let sortedByDistance;
      let sortedOffersByDistance = [];
      if (!isNil(offers)) {
        offers.map((item) => {
          restructuredOffers.push({id: item.id, longitude: item.location.longitude, latitude: item.location.latitude});
        });
      }

      const opts = {
        yName: `latitude`,
        xName: `longitude`
      };

      if (!isEmpty(restructuredOffers) && !isNil(offerId)) {

        targetOffer = find(propEq(`id`, offerId))(restructuredOffers);
        const origin = {longitude: targetOffer.longitude, latitude: targetOffer.latitude};
        sortedByDistance = sortByDistance(origin, restructuredOffers, opts);
      }

      if (!isNil(sortedByDistance)) {
        sortedByDistance.map((item) => {
          sortedOffersByDistance.push({id: item.id, location: {latitude: item.latitude, longitude: item.longitude}});
        });
      }
      return slice(firstClosestOffer, lastClosestOffer, sortedOffersByDistance);
    }
);
