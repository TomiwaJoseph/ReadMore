import { ActionTypes } from "../actions/action-types";

const globalState = {
  isAuthenticated: false,
  cartCount: 2,
  fetchingData: false,
  noInternet: false,
  highestPrice: 120,
  currentCategoryData: [],
};

export const bookReducer = (state = globalState, { type, payload }) => {
  switch (type) {
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
    case ActionTypes.USER_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: payload,
      };
    case ActionTypes.SET_CURRENT_BOOKS:
      return {
        ...state,
        currentCategoryData: payload,
      };
    default:
      return state;
  }
};
