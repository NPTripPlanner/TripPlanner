import firebase from 'firebase';
import {auth} from 'firebase';
import getErrorMsg from './firebase.errors.utils';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_API_KEY,
    authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FB_DATABASE_URL,
    projectId: process.env.REACT_APP_FB_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FB_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_FB_APP_ID,
    measurementId: process.env.REACT_APP_FB_MEASUREMENT_ID
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAuth = auth(firebaseApp);

export const GetCurrentUser = async ()=>{
    const user = firebaseAuth.currentUser;
    if(!user) return null;

    return {
        uid:user.uid,
        email:user.email,
        displayName:user.displayName,
        verified:user.emailVerified,
    }
}

export const Logout  = async ()=>{
    try{
        await firebaseAuth.signOut();
        return GetCurrentUser();
    }
    catch(err){
        throw Error(getErrorMsg(err.code));
    }
}

export const SignUpWithEmailAndPassword = async (email, password, displayName)=>{
    try{
        await firebaseAuth.createUserWithEmailAndPassword(email, password);
        const user = firebaseAuth.currentUser;
        await user.updateProfile({displayName:displayName});

        return await GetCurrentUser();
    }
    catch(err){
        throw Error(getErrorMsg(err.code));
    }
}

export const LoginWithEmailAndPassword = async (email, password)=>{
    try{
        await firebaseAuth.signInWithEmailAndPassword(email, password);
        return await GetCurrentUser();
    }
    catch(err){
        console.log(err);
        throw Error(getErrorMsg(err.code));
    }
}