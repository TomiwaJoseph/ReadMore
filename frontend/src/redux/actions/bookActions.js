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
