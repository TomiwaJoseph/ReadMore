import { ActionTypes } from "../actions/action-types";

const globalState = {
  isAuthenticated: true,
  backendUrl: "http://localhost:8000",
};

export const bookReducer = (state = globalState, { type, payload }) => {
  switch (type) {
    // case value:

    //     break;

    default:
      return state;
  }
};
