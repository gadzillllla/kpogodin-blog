import { lensProp, set } from 'ramda';
import * as actionTypes from '../constants/blogConstants';

const initialState = {
  loaded: false,
  editorAvailable: false,
};

const loadedLens = lensProp('loaded');
const editorAvailableLens = lensProp('editorAvailable');

export default function blogReducer(state = initialState, action = null) {
  const { type } = action;

  switch (type) {
    case actionTypes.BLOG_LOADING: {
      return set(loadedLens, false)(state);
    }
    case actionTypes.BLOG_LOADED: {
      return set(loadedLens, true)(state);
    }
    case actionTypes.EDITOR_ON: {
      return set(editorAvailableLens, true)(state);
    }
    case actionTypes.EDITOR_OFF: {
      return set(editorAvailableLens, false)(state);
    }
    default: {
      return state;
    }
  }
}
