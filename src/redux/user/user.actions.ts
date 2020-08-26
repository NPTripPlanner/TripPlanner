import actionTypes from "./user.actionTypes";
import {action} from 'typesafe-actions';

export const LoginStart = (email, password) => action(
  actionTypes.LOGIN_START,
  { email, password },
);

export const LoginSuccessful = (user) => action(
  actionTypes.LOGIN_SUCCESSFUL,
  {user},
);

export const LoginFail = (error) => action(
  actionTypes.LOGIN_FAIL,
  {error},
);

export const ClearLoginError = () => action(
  actionTypes.CLEAR_LOGIN_ERROR,
);

export const ClearLoginErrorSuccessful = () => action(
  actionTypes.CLEAR_LOGIN_ERROR_SUCCESSFUL,
);

export const SignupStart = (email, password, displayName) => action(
  actionTypes.SIGNUP_START,
  { email, password, displayName },
);

export const SignupSuccessful = (user) => action(
  actionTypes.SIGNUP_SUCCESSFUL,
  {user},
);

export const SignupFail = (error) => action(
  actionTypes.SIGNUP_FAIL,
  {error},
);

export const ClearSignupError = () => action(
  actionTypes.CLEAR_SIGNUP_ERROR,
);

export const ClearSignupErrorSuccessful = () => action(
  actionTypes.CLEAR_SIGNUP_ERROR_SUCCESSFUL,
);

export const SendForgotPassMailStart = (email) => action(
  actionTypes.SEND_FORGOTPASS_MAIL_START,
  { email },
);

export const SendForgotPassMailSuccessful = () => ({
  type: actionTypes.SEND_FORGOTPASS_MAIL_SUCCESSFUL,
});

export const SendForgotPassMailFail = (error) => ({
  type: actionTypes.SEND_FORGOTPASS_MAIL_FAIL,
  payload: error,
});

export const SendForgotPassMailReset = () => ({
  type: actionTypes.SEND_FORGOTPASS_MAIL_RESET,
});

export const SendForgotPassMailResetSuccessful = () => ({
  type: actionTypes.SEND_FORGOTPASS_MAIL_RESET_SUCCESSFUL,
});

export const CheckUserSessionStart = () => ({
  type: actionTypes.CHECK_USER_SESSION_START,
});

export const CheckUserSessionEnd = () => ({
  type: actionTypes.CHECK_USER_SESSION_END,
});

export const UserLogout = () => ({
  type: actionTypes.LOG_OUT,
});
