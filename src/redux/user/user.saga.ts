import actionTypes from "./user.actionTypes";
import {
  LoginSuccessful,
  LoginFail,
  ClearLoginErrorSuccessful,
  SignupFail,
  ClearSignupErrorSuccessful,
  SendForgotPassMailSuccessful,
  SendForgotPassMailFail,
  SendForgotPassMailResetSuccessful,
  CheckUserSessionEnd,
  UserLogout,
} from "./user.actions";

import { call, put, all, takeLeading, delay, take } from "redux-saga/effects";

import {
  SignUpWithEmailAndPassword,
  LoginWithEmailAndPassword,
  SendForgotPasswordMail,
  GetCurrentUser,
  Logout,
} from "../../utils/firebase.utils";

function* userLogin(action) {
  try {
    const { email, password } = action.payload;
    const user = yield call(LoginWithEmailAndPassword, email, password);
    yield call(loginSuccessful, user);
  } catch (err) {
    yield put(LoginFail(err));
  }
}

function* loginSuccessful(user) {
  yield put(LoginSuccessful(user));
}

function* loginStart() {
  yield takeLeading(actionTypes.LOGIN_START, userLogin);
}

function* clearLoginError() {
  while(true){
    yield take(actionTypes.CLEAR_LOGIN_ERROR);
    yield put(ClearLoginErrorSuccessful());
  }
}

function* userSignup(action) {
  try {
    const { email, password, displayName } = action.payload;
    const userCredential = yield call(
      SignUpWithEmailAndPassword,
      email,
      password,
      displayName
    );
    yield call(loginSuccessful, userCredential.user);
  } catch (err) {
    yield put(SignupFail(err));
  }
}

function* signupStart() {
  yield takeLeading(actionTypes.SIGNUP_START, userSignup);
}

function* clearSignupError() {
  while(true){
    yield take(actionTypes.CLEAR_SIGNUP_ERROR);
    yield put(ClearSignupErrorSuccessful());
  }
}

function* doSendForgotPassMail(action) {
  try {
    const { email } = action.payload;
    yield call(SendForgotPasswordMail, email);
    yield put(SendForgotPassMailSuccessful());
  } catch (err) {
    yield put(SendForgotPassMailFail(err));
  }
}

function* sendForgotPassMailStart() {
  yield takeLeading(actionTypes.SEND_FORGOTPASS_MAIL_START, doSendForgotPassMail);
}

function* forgotPassMailResetStart() {
  while(true){
    yield take(actionTypes.SEND_FORGOTPASS_MAIL_RESET);
    yield put(SendForgotPassMailResetSuccessful());
  }
}

function* doCheckUserSession() {
  yield delay(1000);
  const user = yield GetCurrentUser();
  if (user) {
    yield call(loginSuccessful, user);
  }
  yield put(CheckUserSessionEnd());
}

function* checkUserSessionStart() {
  yield takeLeading(actionTypes.CHECK_USER_SESSION_START, doCheckUserSession);
}

function* doLogout() {
  yield call(Logout);
  yield put(UserLogout());
}

function* logout() {
  yield takeLeading(actionTypes.LOG_OUT, doLogout);
}

export default function* UserSaga() {
  yield all([
    call(loginStart),
    call(clearLoginError),
    call(signupStart),
    call(clearSignupError),
    call(sendForgotPassMailStart),
    call(forgotPassMailResetStart),
    call(checkUserSessionStart),
    call(logout),
  ]);
}
