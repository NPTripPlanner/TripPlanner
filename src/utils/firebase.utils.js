import firebase from "firebase";
import { auth } from "firebase";
import getErrorMsg from "./firebase.errors.utils";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FB_DATABASE_URL,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FB_APP_ID,
  measurementId: process.env.REACT_APP_FB_MEASUREMENT_ID,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAuth = auth(firebaseApp);

export const GetCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      unsubscribe();
      if (user) {
        resolve({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          verified: user.emailVerified,
        });
      } else {
        return resolve(null);
      }
    }, reject);
  });
};

export const SignUpWithEmailAndPassword = async (
  email,
  password,
  displayName
) => {
  try {
    await firebaseAuth.createUserWithEmailAndPassword(email, password);
    const user = firebaseAuth.currentUser;
    await user.updateProfile({ displayName: displayName });

    return await GetCurrentUser();
  } catch (err) {
    throw Error(getErrorMsg(err.code));
  }
};

export const LoginWithEmailAndPassword = async (email, password) => {
  try {
    await firebaseAuth.signInWithEmailAndPassword(email, password);
    return await GetCurrentUser();
  } catch (err) {
    throw Error(getErrorMsg(err.code));
  }
};

export const SendForgotPasswordMail = async (email) => {
  try {
    await firebaseAuth.sendPasswordResetEmail(email);
  } catch (err) {
    throw Error(getErrorMsg(err.code));
  }
};

export const Logout = async () => {
  await firebaseAuth.signOut();
};

let mockTimer
const mockTripItems = [
  {
    tripName: 'First trip',
    startDate: '05/Jun/2021',
    createDate: '05/Jun/2020',
  },
  {
    tripName: 'Second trip',
    startDate: '05/Jun/2022',
    createDate: '05/Jun/2021',
  },
  {
    tripName: 'Third trip',
    startDate: '05/Jun/2023',
    createDate: '05/Jun/2022',
  },
  {
    tripName: 'Fourth trip',
    startDate: '05/Jun/2024',
    createDate: '05/Jun/2023',
  },
]
export const FetchTripItemCollection = async ()=>{
  //TODO: fetch real data from firebase
  return await new Promise((res, rej)=>{
    mockTimer = setTimeout(()=>{
      res(mockTripItems);
      clearTimeout(mockTimer);
    }, 3000);
  });
}
