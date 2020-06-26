import actionTypes from './user.actionTypes';

const initState = {
    user:null,
    loginFail:null,
    signupFail:null,
    forgotPassMailSentFail:null,
    forgotPassMailSent:false,
}

const UserReducer = (state=initState, action)=>{

    switch(action.type){
        case actionTypes.LOGIN_START:
            return {...state, loginFail:null};
        case actionTypes.LOGIN_SUCCESSFUL:
            return {...state, loginFail:null, user:action.payload};
        case actionTypes.LOGIN_FAIL:
            return {...state, loginFail:action.payload};
        case actionTypes.SIGNUP_START:
            return {...state, signupFail:null};
        case actionTypes.SIGNUP_FAIL:
            return {...state, signupFail:action.payload, 
                user:action.payload};
        case actionTypes.SEND_FORGOTPASS_MAIL_RESET:
        case actionTypes.SEND_FORGOTPASS_MAIL_START:
            return {...state, forgotPassMailSent:false, forgotPassMailSentFail:null};
        case actionTypes.SEND_FORGOTPASS_MAIL_SUCCESSFUL:
            return {...state, forgotPassMailSent:true, forgotPassMailSentFail:null};
        case actionTypes.SEND_FORGOTPASS_MAIL_FAIL:
            return {...state, forgotPassMailSentFail:action.payload, forgotPassMailSent:false};
        case actionTypes.LOG_OUT:
            return {...state, user:null};
        default:
            return state;
    }
}

export default UserReducer;