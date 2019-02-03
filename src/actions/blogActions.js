import * as actionTypes from '../constants/blogConstants';

export function blogLoading() {
  return { type: actionTypes.BLOG_LOADING };
}
export function blogLoaded() {
  return { type: actionTypes.BLOG_LOADED };
}

export function editorOn() {
  return { type: actionTypes.EDITOR_ON };
}

export function editorOff() {
  return { type: actionTypes.EDITOR_OFF };
}

export function changeTag(payload) {
  return { type: actionTypes.CHANGE_TAG, payload };
}

export function uploadImg(payload) {
  return { type: actionTypes.UPLOAD_IMG, payload };
}
