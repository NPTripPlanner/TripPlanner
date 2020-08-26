import actionTypes from "./user.actionTypes";
import {FirebaseUser} from '../../utils/firebase.utils';
import { Reducer } from "redux";

export interface IUserState {
  user: FirebaseUser | null,
  checkingSession: boolean,
  loginFail: Error | null,
  signupFail: Error | null,
  forgotPassMailSentFail: Error | null,
  forgotPassMailSent: boolean,
}

const initState : IUserState = {
  user: null,
  checkingSession: false,
  loginFail: null,
  signupFail: null,
  forgotPassMailSentFail: null,
  forgotPassMailSent: false,
};

const UserReducer : Reducer<IUserState> = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return { ...state, loginFail: null };
    case actionTypes.LOGIN_SUCCESSFUL:{
      const {user} = action.payload;
      return { ...state, loginFail: null, user: user };
    }
    case actionTypes.LOGIN_FAIL:{
      const {error} = action.payload;
      return { ...state, loginFail: error, user: null };
    }
    case actionTypes.CLEAR_LOGIN_ERROR_SUCCESSFUL:
      return {...state, loginFail: null}
    case actionTypes.SIGNUP_START:
      return { ...state, signupFail: null };
    case actionTypes.SIGNUP_FAIL:{
      const {error} = action.payload;
      return { ...state, signupFail: error, user: null };
    }
    case actionTypes.CLEAR_SIGNUP_ERROR_SUCCESSFUL:
      return {...state, signupFail: null};
    case actionTypes.SEND_FORGOTPASS_MAIL_RESET_SUCCESSFUL:
    case actionTypes.SEND_FORGOTPASS_MAIL_START:
      return {
        ...state,
        forgotPassMailSent: false,
        forgotPassMailSentFail: null,
      };
    case actionTypes.SEND_FORGOTPASS_MAIL_SUCCESSFUL:
      return {
        ...state,
        forgotPassMailSent: true,
        forgotPassMailSentFail: null,
      };
    case actionTypes.SEND_FORGOTPASS_MAIL_FAIL:{
      const {error} = action.payload;
      return {
        ...state,
        forgotPassMailSentFail: error,
        forgotPassMailSent: false,
      };
    }
    case actionTypes.CHECK_USER_SESSION_START:
      return { ...state, checkingSession: true };
    case actionTypes.CHECK_USER_SESSION_END:
      return {...state, checkingSession: false};
    case actionTypes.LOG_OUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default UserReducer;
