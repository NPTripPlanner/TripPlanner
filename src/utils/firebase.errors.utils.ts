interface FirebaseErrors {
  [key:string]: {
    [key:string]:string
  }
}

const firebaseErrors : FirebaseErrors = {
  auth: {
    "auth/email-already-in-use": "E-mail alrady in use",
    "auth/invalid-email": "Invalid E-mail",
    "auth/operation-not-allowed": "Account not enabled",
    "auth/weak-password": "Password is not strong enough",
    "auth/user-disabled": "Account is disabled",
    "auth/user-not-found": "User not found",
    "auth/wrong-password": "Invalid password",
    "auth/too-many-requests":
      "Too many unsuccessful login attempts. Please try again later",
    "auth/missing-android-pkg-name": "Android app required to be installed",
    "auth/missing-continue-uri":
      "A continue URL must be provided in the request",
    "auth/missing-ios-bundle-id": "An iOS Bundle ID must be provided",
    "auth/invalid-continue-uri":
      "The continue URL provided in the request is invalid",
    "auth/unauthorized-continue-uri":
      "he domain of the continue URL is not whitelisted",
    "auth/network-request-failed": "Please, check your internet connection",
  },
};

const MsgFromErrorCode = (code:string) => {
  if (code) {
    
    const category = code.split("/")[0];
    const errors = firebaseErrors[category];
    if (errors) {
      const msg = errors[code];
      if (msg) return msg;
    }
    return `Somthing went wrong (${code})`
  }
  return `Message for error code ${code} not defined`;
};

export default MsgFromErrorCode;
