import { ActionTypes } from "./action-types";

export const setTestPage = (data) => {
  return {
    type: ActionTypes.SET_TEST_PAGE_DATA,
    payload: data,
  };
};
