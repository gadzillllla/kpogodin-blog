import {
  createStore,
  combineReducers
} from "redux";
import blogReducer from "../reducers/blogReducer";
import { __REDUX_DEVTOOLS_EXTENSION__ } from "redux-devtools-extension";

const store = createStore(
  combineReducers({ blogReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
