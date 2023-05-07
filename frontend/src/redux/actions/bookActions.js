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
export const setSearchResults = (value) => {
  return {
    type: ActionTypes.SET_SEARCH_RESULTS,
    payload: value,
  };
};
export const removeSearchResults = (value) => {
  return {
    type: ActionTypes.REMOVE_SEARCH_RESULTS,
  };
};

export const setDoneLoading = (value) => {
  return {
    type: ActionTypes.SET_DONE_LOADING,
    payload: value,
  };
};

export const setWishlistData = (value) => {
  return {
    type: ActionTypes.SET_WISHLIST_DATA,
    payload: value,
  };
};
export const setUserOrderHistory = (value) => {
  return {
    type: ActionTypes.SET_USER_ORDER_HISTORY,
    payload: value,
  };
};
export const setWishlistCount = (value) => {
  return {
    type: ActionTypes.SET_WISHLIST_COUNT,
    payload: value,
  };
};
export const setCartCount = (value) => {
  return {
    type: ActionTypes.SET_CART_COUNT,
    payload: value,
  };
};
export const setCartData = (value) => {
  return {
    type: ActionTypes.SET_CART_DATA,
    payload: value,
  };
};
