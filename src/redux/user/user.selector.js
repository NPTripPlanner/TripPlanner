import {createSelector} from 'reselect';

const selectUser = (state)=>state.user;

export const selectUserInfo = createSelector(
    [selectUser],

    user=>user.user
);

export const selectLoginFail = createSelector(
    [selectUser],

    user=>user.loginFail?user.loginFail.message:null
);

export const selectSignupFail = createSelector(
    [selectUser],

    user=>user.signupFail?user.signupFail.message:null
);