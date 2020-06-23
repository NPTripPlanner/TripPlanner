const firebaseErrors = {
    auth:{
        'auth/email-already-in-use':'E-mail alrady in use',
        'auth/invalid-email':'Invalid E-mail',
        'auth/operation-not-allowed':'Account not enabled',
        'auth/weak-password':'Password is not strong enough',
        'auth/user-disabled':'Account is disabled',
        'auth/user-not-found':'User not found',
        'auth/wrong-password':'Invalid password',
        'auth/too-many-requests':'Too many unsuccessful login attempts. Please try again later'
    }
}

const MsgFromErrorCode = (code)=>{
    const category = code.split('/')[0];
    const errors = firebaseErrors[category];
    if(errors){
        const msg = errors[code];
        if(msg) return msg;
    }
    return `Message for error code ${code} not defined`;
}

export default MsgFromErrorCode;