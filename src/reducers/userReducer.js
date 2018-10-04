import { lensProp, set, compose } from 'ramda';
import * as actionTypes from 'constants/userConstants';

const initialState = {
  username: '',
  logged: false,
  loginFail: false,
};

const userLens = lensProp('username');
const loginFailLens = lensProp('loginFail');
const loggedLens = lensProp('logged');

export default function userReducer(state = initialState, action = null) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.EMAIL_LOGIN_SUCCESS: {
      return compose(
        set(userLens, payload),
        set(loggedLens, true),
      )(state);
    }
    case actionTypes.EMAIL_LOGIN_FAIL: {
      return compose(
        set(userLens, ''),
        set(loggedLens, false),
        set(loginFailLens, true),
      )(state);
    }
    case actionTypes.LOGOUT: {
      return compose(
        set(userLens, ''),
        set(loggedLens, false),
      )(state);
    }
    default: {
      return state;
    }
  }
}
