import { ActionTypes } from "./action-types";

export const setPreloaderStatus = (status) => {
  return {
    type: ActionTypes.IS_FETCHING_DATA,
    payload: status,
  };
};
export const setInternetError = (status) => {
  return {
    type: ActionTypes.NO_INTERNET,
    payload: status,
  };
};
export const setBadRequest = (value) => {
  return {
    type: ActionTypes.SET_BAD_REQUEST,
    payload: value,
  };
};
export const setCurrentBooks = (value) => {
  return {
    type: ActionTypes.SET_CURRENT_BOOKS,
    payload: value,
  };
};
export const setSingleBook = (value) => {
  return {
    type: ActionTypes.SET_SINGLE_BOOK,
    payload: value,
  };
};
export const setFeaturedBooks = (value) => {
  return {
    type: ActionTypes.SET_FEATURED_BOOKS,
    payload: value,
  };
};
export const setBestOfferBooks = (value) => {
  return {
    type: ActionTypes.SET_BEST_OFFER_BOOKS,
    payload: value,
  };
};
export const setUserIsAuthenticated = (value) => {
  return {
    type: ActionTypes.SET_USER_IS_AUTHENTICATED,
    payload: value,
  };
};
export const setUserInfo = (value) => {
  return {
    type: ActionTypes.SET_USER_INFO,
    payload: value,
  };
};
export const setDashboardInfo = (value) => {
  return {
    type: ActionTypes.SET_DASHBOARD_INFO,
    payload: value,
  };
};
export const removeUserInfo = () => {
  return {
    type: ActionTypes.REMOVE_USER_INFO,
  };
};
