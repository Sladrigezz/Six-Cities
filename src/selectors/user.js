import {createSelector} from "reselect";
import {isNil} from 'ramda';

export const getActviveCity = (state) => state.user.activeCity;
export const getCitiesList = (state) => state.user.citiesList;
export const getFormData = (state) => state.user.form;
export const getActiveOffer = (state) => state.user.activeOffer;
export const getHoveredOffer = (state) => state.user.hoveredOffer;
export const getIsAuthRequired = (state) => state.user.isAuthorizationRequired;
export const getSubmitDefaultState = (state) => state.user.submitDefaultState;

export const getIsSubmitDesabled = createSelector(
    getFormData,
    getSubmitDefaultState,
    (formData, defaulState) => {
      const {rating, comment} = formData;
      return !defaulState || isNil(rating) || isNil(comment) || comment.length < 50;
    }
);
