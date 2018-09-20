import * as actionTypes from '../constants/blogConstants';

export function blogLoading() {

  return { type: actionTypes.BLOG_LOADING };
}
export function blogLoaded() {

  return { type: actionTypes.BLOG_LOADED };
}
