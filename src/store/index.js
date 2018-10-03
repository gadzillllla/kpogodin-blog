import { createStore, combineReducers } from 'redux';
import { __REDUX_DEVTOOLS_EXTENSION__ } from 'redux-devtools-extension';
import blogReducer from '../reducers/blogReducer';

const store = createStore(
  combineReducers({ blogReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
