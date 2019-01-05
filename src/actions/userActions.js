import * as actionTypes from '../constants/userConstants';

export function userLogin(payload) {
  return { type: actionTypes.EMAIL_LOGIN_SUCCESS, payload };
}
export function userLogout() {
  return { type: actionTypes.LOGOUT };
}
export function adminMode() {
  return { type: actionTypes.ADMIN_MODE_ON };
}
export function loginModalOpen() {
  return { type: actionTypes.LOGIN_MODAL_OPEN };
}
export function loginModalClose() {
  return { type: actionTypes.LOGIN_MODAL_CLOSE };
}
