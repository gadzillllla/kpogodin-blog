import { lensProp, set } from 'ramda';
import * as actionTypes from '../constants/blogConstants';

const initialState = {
  loaded: false,
  editorAvailable: false,
  tag: '',
};

const loadedLens = lensProp('loaded');
const editorAvailableLens = lensProp('editorAvailable');
const tagLens = lensProp('tag');

export default function blogReducer(state = initialState, action = null) {
  const { type, payload } = action;

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
    case actionTypes.CHANGE_TAG: {
      return set(tagLens, payload)(state);
    }
    default: {
      return state;
    }
  }
}
