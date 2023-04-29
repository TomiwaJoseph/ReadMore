import { ActionTypes } from "../actions/action-types";

const globalState = {
  isAuthenticated: false,
  cartCount: 2,
  fetchingData: false,
  noInternet: false,
  highestPrice: 200,
  userInfo: {},
  dashboard_info: {},
  currentCategoryData: [],
  singleBookData: [],
  featuredBooksData: [],
  bestOfferBooks: [],
};

export const bookReducer = (state = globalState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_USER_INFO:
      return {
        ...state,
        userInfo: payload,
      };
    case ActionTypes.REMOVE_USER_INFO:
      return {
        ...state,
        userInfo: {},
      };
    case ActionTypes.SET_DASHBOARD_INFO:
      return {
        ...state,
        dashboard_info: payload,
      };
    case ActionTypes.IS_FETCHING_DATA:
      return {
        ...state,
        fetchingData: payload,
      };
    case ActionTypes.SET_BAD_REQUEST:
      return {
        ...state,
        badRequest: payload,
      };
    case ActionTypes.NO_INTERNET:
      return {
        ...state,
        noInternet: payload,
      };
    case ActionTypes.SET_USER_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: payload,
      };
    case ActionTypes.SET_CURRENT_BOOKS:
      return {
        ...state,
        currentCategoryData: payload,
      };
    case ActionTypes.SET_SINGLE_BOOK:
      return {
        ...state,
        singleBookData: payload,
      };
    case ActionTypes.SET_FEATURED_BOOKS:
      return {
        ...state,
        featuredBooksData: payload,
      };
    case ActionTypes.SET_BEST_OFFER_BOOKS:
      return {
        ...state,
        bestOfferBooks: payload,
      };
    default:
      return state;
  }
};
