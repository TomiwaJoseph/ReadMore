import { ActionTypes } from "../actions/action-types";

const globalState = {
  isAuthenticated: false,
  cartCount: 2,
  fetchingData: false,
  noInternet: false,
  highestPrice: 120,
  currentCategoryData: [],
  //   backendUrl: "http://localhost:8000",
};

export const bookReducer = (state = globalState, { type, payload }) => {
  switch (type) {
    // case value:

    //     break;

    default:
      return state;
  }
};
