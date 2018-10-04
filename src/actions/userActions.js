import * as actionTypes from '../constants/userConstants';

export function userLogin(payload) {
  return { type: actionTypes.EMAIL_LOGIN_SUCCESS, payload };
}
export function userLogout() {
  return { type: actionTypes.LOGOUT };
}
