import { lensProp, set, compose } from 'ramda';
import * as actionTypes from 'constants/userConstants';

const initialState = {
  username: '',
  userUid: '',
  logged: false,
  loginFail: false,
  admin: false,
  userPicUrl: 'none',
  loginModalOpen: false,
};

const userLens = lensProp('username');
const userUidLens = lensProp('userUid');
const loginFailLens = lensProp('loginFail');
const loggedLens = lensProp('logged');
const adminLens = lensProp('admin');
const userPicUrlLens = lensProp('userPicUrl');
const loginModalOpenLens = lensProp('loginModalOpen');

export default function userReducer(state = initialState, action = null) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.EMAIL_LOGIN_SUCCESS: {
      const picture = payload.photoURL ? payload.photoURL : 'default';
      return compose(
        set(userLens, payload.displayName),
        set(userUidLens, payload.uid),
        set(loggedLens, true),
        set(userPicUrlLens, picture),
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
        set(adminLens, false),
        set(userUidLens, ''),
        set(userPicUrlLens, 'none'),
        set(loginModalOpenLens, false),
      )(state);
    }
    case actionTypes.ADMIN_MODE_ON: {
      return set(adminLens, true)(state);
    }
    case actionTypes.LOGIN_MODAL_OPEN: {
      return set(loginModalOpenLens, true)(state);
    }
    case actionTypes.LOGIN_MODAL_CLOSE: {
      return set(loginModalOpenLens, false)(state);
    }
    default: {
      return state;
    }
  }
}
