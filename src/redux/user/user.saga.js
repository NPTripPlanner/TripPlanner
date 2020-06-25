import actionTypes from './user.actionTypes';
import {
    LoginSuccessful,
    LoginFail,
    SignupFail,
    sendForgotPassMailSuccessful,
    sendForgotPassMailFail,
} from './user.actions';

import {call, put, all, takeLeading} from 'redux-saga/effects';

import {
    SignUpWithEmailAndPassword,
    LoginWithEmailAndPassword,
    SendForgotPasswordMail
} from '../../utils/firebase.utils';

function* userLogin({payload:{email, password}}){
    try{
        const user = yield call(LoginWithEmailAndPassword, email, password);
        yield call(loginSuccessful, user);
    }
    catch(err){
        yield put(LoginFail(err));
    }
}

function* loginSuccessful(user){
    yield put(LoginSuccessful(user));
}

function* loginStart(){
    yield takeLeading(actionTypes.LOGIN_START, userLogin);
}

function* userSignup({payload:{email, password, displayName}}){
    try{
        const user = yield call(SignUpWithEmailAndPassword, email, password, displayName);
        yield call(loginSuccessful, user);
    }
    catch(err){
        yield put(SignupFail(err));
    }
}

function* signupStart(){
    yield takeLeading(actionTypes.SIGNUP_START, userSignup);
}

function* sendForgotPassMail({payload:{email}}){
    try{
        yield call(SendForgotPasswordMail, email);
        yield put(sendForgotPassMailSuccessful());
    }
    catch(err){
        yield put(sendForgotPassMailFail(err));
    }
}

function* sendForgotPassMailStart(){
    yield takeLeading(actionTypes.SEND_FORGOTPASS_MAIL_START, )
}

export default function* UserSaga(){
    yield all([
        call(loginStart),
        call(signupStart),
    ]);
} 