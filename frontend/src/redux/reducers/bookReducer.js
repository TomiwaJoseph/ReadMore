import { ActionTypes } from "../actions/action-types";

const globalState = {
  isAuthenticated: false,
  noSearchResults: false,
  fetchingData: false,
  doneLoading: false,
  noInternet: false,
  highestPrice: 200,
  userInfo: {},
  currentCategoryData: [],
  singleBookData: [],
  featuredBooksData: [],
  bestOfferBooks: [],
  searchResults: [],
  wishlistCount: 0,
  wishlistData: [],
  userOrderHistory: [],
  cartDataToRender: [],
  cartCount: 0,
  cartTotal: 0,
};

export const bookReducer = (state = globalState, { type, payload }) => {
  switch (type) {
    case ActionTypes.REMOVE_BOOK_DATA:
      return {
        ...state,
        singleBookData: [],
      };
    case ActionTypes.CLEAN_CART:
      return {
        ...state,
        cartDataToRender: [],
        cartCount: 0,
      };
    case ActionTypes.SET_CART_DATA:
      return {
        ...state,
        cartDataToRender: payload,
      };
    case ActionTypes.SET_CART_COUNT:
      return {
        ...state,
        cartCount: payload,
      };
    case ActionTypes.SET_WISHLIST_COUNT:
      return {
        ...state,
        wishlistCount: payload,
      };
    case ActionTypes.SET_USER_ORDER_HISTORY:
      return {
        ...state,
        userOrderHistory: payload,
      };
    case ActionTypes.SET_WISHLIST_DATA:
      return {
        ...state,
        wishlistData: payload,
      };
    case ActionTypes.SET_DONE_LOADING:
      return {
        ...state,
        doneLoading: payload,
      };
    case ActionTypes.REMOVE_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: [],
      };
    case ActionTypes.SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: payload,
      };
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
