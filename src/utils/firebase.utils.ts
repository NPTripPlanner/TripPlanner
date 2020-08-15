import * as firebasePro from "firebase";
import 'firebase/functions';
import 'firebase/firestore';
import * as firebaseTest from "@firebase/testing";
import getErrorMsg from "./firebase.errors.utils";
import * as fireorm from 'fireorm';
import {
  UserArchive,
} from '../schema/firestore.schema';

type App = firebase.app.App;
type Auth = firebase.auth.Auth;
type FirestoreDB = firebase.firestore.Firestore;
type CloudFunctions = firebase.functions.Functions;

export let firebaseApp : App;
export let firebaseAuth : Auth;
export let firebaseDatabase : FirestoreDB;
export let cloudFunctions : CloudFunctions;

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

export const InitFirebase = () => {
  const setup = (app:App) => {
    if (process.env.NODE_ENV !== "test"){ 
      firebaseAuth = app.auth();
    }
    
    firebaseDatabase = app.firestore();
    cloudFunctions = app.functions();
  };

  switch (process.env.NODE_ENV) {
    case "production":
    case "development":
      firebaseApp = firebasePro.initializeApp(firebaseConfig);
      setup(firebaseApp);
      break;
    default:
      firebaseApp = firebaseTest.initializeAdminApp({
        databaseName: "tripplanner-9563b",
        projectId: "tripplanner-9563b",
      });
      setup(firebaseApp);
  }

  fireorm.initialize(firebaseDatabase);
};

export const ClearApp = async () => {
  return await firebaseApp.delete();
};

///////////////////Auth//////////////////////////////////
export const GetCurrentUser = () => {
  return new Promise<firebase.User|null>((resolve, reject) => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      unsubscribe();
      if (user) {
        resolve(user);
      } else {
        return resolve(null);
      }
    }, reject);
  });
};

export const SignUpWithEmailAndPassword = async (
  email:string,
  password:string,
  displayName:string
) => {
  try {
    const userCredential  = await firebaseAuth.createUserWithEmailAndPassword(email, password);

    if(!userCredential.user){
      throw Error('Unable to update user profile after creating user'); 
    }
    await userCredential.user.updateProfile({ displayName: displayName });
    const result = initializeUser(userCredential.user);
    if(!result) throw Error('Initilize user fail');
    return userCredential;
  } catch (err) {
    throw Error(getErrorMsg(err.code));
  }
};

const initializeUser = async (user:firebase.User)=>{
  
  const result = await cloudFunctions.httpsCallable('initUser')({
    id:user.uid,
    displayName:user.displayName,
    email:user.email,
  });
  return result;
}

export const LoginWithEmailAndPassword = async (email:string, password:string) => {
  try {
    await firebaseAuth.signInWithEmailAndPassword(email, password);
    return await GetCurrentUser();
  } catch (err) {
    throw Error(getErrorMsg(err.code));
  }
};

export const SendForgotPasswordMail = async (email:string) => {
  try {
    await firebaseAuth.sendPasswordResetEmail(email);
  } catch (err) {
    throw Error(getErrorMsg(err.code));
  }
};

export const Logout = async () => {
  await firebaseAuth.signOut();
};

///////////////////Firestore CRUD//////////////////////////////////
export const CreateUser = async (userData:UserArchive) => {
  try{
    const userRepo = fireorm.getRepository(UserArchive);
    const userDoc = await userRepo.create(userData);
    return userDoc;
  }
  catch(err){
    throw Error(err.code);
  }
}

export const GetUser = async (userId:string)=>{
  try{
    const userRepo = fireorm.getRepository(UserArchive);
    return await userRepo.findById(userId);
  }
  catch(err){
    throw Error(err.code);
  }
}

export const ClearDatabase = async () =>{
  try{
    const userRepo = fireorm.getRepository(UserArchive);
    const users : UserArchive[] = await userRepo.find();
    let tasks : Promise<void>[] = [];
    users.map((user)=>{
      tasks.push(userRepo.delete(user.id));
      return user;
    })
    return await Promise.all(tasks);
  }
  catch(err){
    throw Error(err.code);
  }
}
