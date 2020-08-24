import actionTypes from "./user.actionTypes";

export const LoginStart = (email, password) => ({
  type: actionTypes.LOGIN_START,
  payload: { email, password },
});

export const LoginSuccessful = (user) => ({
  type: actionTypes.LOGIN_SUCCESSFUL,
  payload: user,
});

export const LoginFail = (error) => ({
  type: actionTypes.LOGIN_FAIL,
  payload: error,
});

export const ClearLoginError = () => ({
  type: actionTypes.CLEAR_LOGIN_ERROR,
});

export const ClearLoginErrorSuccessful = () => ({
  type: actionTypes.CLEAR_LOGIN_ERROR_SUCCESSFUL,
});

export const SignupStart = (email, password, displayName) => ({
  type: actionTypes.SIGNUP_START,
  payload: { email, password, displayName },
});

export const SignupSuccessful = (user) => ({
  type: actionTypes.SIGNUP_SUCCESSFUL,
  payload: user,
});

export const SignupFail = (error) => ({
  type: actionTypes.SIGNUP_FAIL,
  payload: error,
});

export const ClearSignupError = () => ({
  type: actionTypes.CLEAR_SIGNUP_ERROR,
});

export const ClearSignupErrorSuccessful = () => ({
  type: actionTypes.CLEAR_SIGNUP_ERROR_SUCCESSFUL,
});

export const SendForgotPassMailStart = (email) => ({
  type: actionTypes.SEND_FORGOTPASS_MAIL_START,
  payload: { email },
});

export const SendForgotPassMailSuccessful = () => ({
  type: actionTypes.SEND_FORGOTPASS_MAIL_SUCCESSFUL,
});

export const SendForgotPassMailFail = (error) => ({
  type: actionTypes.SEND_FORGOTPASS_MAIL_FAIL,
  payload: error,
});

export const SendForgotPassMailReset = () => ({
  type: actionTypes.SEND_FORGOTPASS_MAIL_FAIL,
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
