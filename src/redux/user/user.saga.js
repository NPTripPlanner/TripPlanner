import actionTypes from './user.actionTypes';
import {
    LoginSuccessful,
    LoginFail,
    SignupFail,
} from './user.actions';

import {takeLatest, call, put, all} from 'redux-saga/effects';

import {
    GetCurrentUser,
    SignUpWithEmailAndPassword,
    LoginWithEmailAndPassword
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
    yield takeLatest(actionTypes.LOGIN_START, userLogin);
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
    yield takeLatest(actionTypes.SIGNUP_START, userSignup);
}

export default function* UserSaga(){
    yield all([
        call(loginStart),
        call(signupStart),
    ]);
} 