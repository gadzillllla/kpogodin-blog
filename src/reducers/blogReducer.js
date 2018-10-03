import { lensProp, set } from 'ramda';
import * as actionTypes from '../constants/blogConstants';

const initialState = {
  loaded: false,
};

const loadedLens = lensProp('loaded');

export default function blogReducer(state = initialState, action = null) {
  const { type } = action;

  switch (type) {
    case actionTypes.BLOG_LOADING: {
      return set(loadedLens, false)(state);
    }
    case actionTypes.BLOG_LOADED: {
      return set(loadedLens, true)(state);
    }
    default: {
      return state;
    }
  }
}
