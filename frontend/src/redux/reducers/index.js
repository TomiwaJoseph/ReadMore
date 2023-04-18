import { combineReducers } from "redux";
import { bookReducer } from "./bookReducer";

const reducers = combineReducers({
  store: bookReducer,
});

export default reducers;
