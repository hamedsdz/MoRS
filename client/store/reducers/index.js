import { combineReducers } from "redux";
// reducers
import user from "./user";
import movie from "./movie";

const reducers = combineReducers({
  user,
  movie,
});

export default reducers;
