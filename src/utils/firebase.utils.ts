import * as firebaseTest from "@firebase/testing";
import * as firebasePro from "firebase";
import 'firebase/functions';
import 'firebase/firestore';
import getErrorMsg from "./firebase.errors.utils";
import * as fireorm from 'fireorm';
import {TripArchive, TripArchiveRepository } from '../schema/firestore.schema';
import { QueryDocumentSnapshot, DocumentReference, CollectionReference, DocumentSnapshot, QuerySnapshot } from "@google-cloud/firestore";
import ImprovedRepository from "../schema/ImprovedRepository";

type App = firebase.app.App;
type Auth = firebase.auth.Auth;
type FirestoreDB = firebase.firestore.Firestore | any;
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

//#region App

export const InitFirebase = () => {
  const setup = (app:App) => {
    //test do not have auth
    if (process.env.NODE_ENV !== "test"){ 
      firebaseAuth = app.auth();
    }
    firebaseDatabase = app.firestore();
    cloudFunctions = app.functions();

    //test and developmentuse firestore and cloud function in emulator 
    if(process.env.NODE_ENV!=='production'){
      cloudFunctions.useFunctionsEmulator('http://localhost:5001');
    }
  };

  switch (process.env.NODE_ENV) {
    case "production":
    case "development":
      firebaseApp = firebasePro.initializeApp(firebaseConfig);
      setup(firebaseApp);
      break;
    default:
      firebaseApp = firebaseTest.initializeTestApp({
        projectId:'tripplanner-9563b',
        auth:{uid:'test', email:'test@test.com'}
      });
      setup(firebaseApp);
  }

  fireorm.initialize(firebaseDatabase);
};

export const ClearApp = async () => {
  return await firebaseApp.delete();
};

//#endregion App

//#region User
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
    const result = await initializeUser(userCredential.user);
    if(!result) throw Error('Initilize user fail');
    return userCredential;
  } catch (err) {
    throw Error(getErrorMsg(err.code));
  }
};

/**
 * Call cloud function to initialize user
 */
export const initializeUser = async (user:firebase.User|any)=>{
  const result = await cloudFunctions.httpsCallable('initUser')({
    id:user.uid,
    displayName:user.displayName,
    email:user.email,
  });
  return result.data;
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

//#endregion User

//#region Test only

/**
 * Clear all firestore data in emulator
 */
export const ClearTestFirestore = async ()=>{
  return await firebaseTest.clearFirestoreData({
    projectId:'tripplanner-9563b',
  })
}

//#endregion Test only

//#region Fireorm
/**
 * An easy way to get fireorm's repository with type conversion if provided
 * @param entity 
 */
export const GetRepository = async <
T extends fireorm.IEntity,
ConvertToType = ImprovedRepository<T>
>
(entity:fireorm.Constructor<T>)=>{
  return (await fireorm.getRepository(entity)) as unknown as ConvertToType;
}
//#endregion Fireorm

//#region Firestore CRUD
/**
 * Return all trip archives associate with user
 * @param userId 
 */
export const FetchTripArchive = async (userId:string)=>{
  try{
    // const tripArchiveRepo = await fireorm.getRepository(TripArchive);
    const tripArchiveRepo = await GetRepository(TripArchive);
    return await tripArchiveRepo.whereEqualTo('ownerId', userId).find();
  }
  catch(err){
    console.log(err);
    throw Error(getErrorMsg(err.code));
  }
}

/**
 * Get trip archives in batch
 * @param userId 
 * @param batchLimit 
 * @param startAfter a particualr document snapshot
 */
export const PullNextTripArchive = async (userId:string, 
  batchLimit:number=10,
  startAfter:null|QueryDocumentSnapshot=null,
  )=>{
  try{
    // const tripArchiveRepo = (await fireorm.getRepository(TripArchive)) as TripArchiveRepository;
    const tripArchiveRepo = await GetRepository<TripArchive, TripArchiveRepository>(TripArchive);
    tripArchiveRepo.qeryAfterSnap(startAfter);
    const results = await tripArchiveRepo.whereEqualTo('ownerId', userId)
    .limit(batchLimit)
    .find();
    return {
      lastDocSnap: tripArchiveRepo.getLastDocQuerySnap(),
      results: results,
    }
  }
  catch(err){
    throw Error(getErrorMsg(err.code));
  }
}

interface CreateTripArchiveReturn {
  /** Trip archive id */
  id: string;
  /** Owner id or user id */
  ownerId: string;
}
/**
 * Create a new trip archive in firestore through cloud function
 * @param userId 
 * @param archiveName 
 */
export const CreateTripArchive = async (userId:string, archiveName:string)=>{
  try{
    const result = await cloudFunctions.httpsCallable('createTripArchive')({
      userId: userId,
      name: archiveName,
    });
    const data : CreateTripArchiveReturn = result.data;
    return data;
  }
  catch(err){
    console.log(err);
    throw Error(getErrorMsg(err.code));
  }
}
//#endregion Firestore CRUD

//#region  Firestore listener
type SnapshotCollection = CollectionReference;
type SnapshotDocument = DocumentReference;
type ObserverCollection = (snapshot: QuerySnapshot<FirebaseFirestore.DocumentData>) => void; 
type ObserverDocument = (snapshot: DocumentSnapshot<FirebaseFirestore.DocumentData>) => void;
type onListenError = (error: Error) => void;

const validateParams =  (
  watched:(SnapshotCollection|SnapshotDocument),
  observer:(ObserverCollection|ObserverDocument),
  onError:onListenError
)=>{
  const errorMsg = 'Can not watch, null paramter';
  if(!watched){ throw new Error(errorMsg)};
  if(!observer){ throw new Error(errorMsg)};
  if(!onError){ throw new Error(errorMsg)};
}
const onListenCollection = (watched:SnapshotCollection, observer:ObserverCollection, onError:onListenError)=>{
  validateParams(watched, observer, onError);
  return watched.onSnapshot(observer, onError);
}

const onListenDocument = (watched:SnapshotDocument, observer:ObserverDocument, onError:onListenError)=>{
  validateParams(watched, observer, onError);
  return watched.onSnapshot(observer, onError);
}

/**
 * Realtime listening on repository(collection)
 * 
 * function return an unsubcribe function
 * use unsubscribe function to cancel listening
 * e.g unsubscribe()
 * @param repo 
 * @param cb 
 * @param onError 
 */
export const ListenToRepository = <
K extends fireorm.IEntity,
T extends ImprovedRepository<K>
>(repo:T, cb:(docs:K[])=>void, onError:onListenError)=>{

  const obeserver = (qerySnapshot:QuerySnapshot)=>{
    const docs = repo.extractFromColSnap(qerySnapshot);
    cb(docs);
  }
  return onListenCollection(
    repo.getCollectionReference(),
    obeserver,
    onError
  )
}
/**
 * Realtime listening on document
 * 
 * function return an unsubcribe function
 * use unsubscribe function to cancel listening
 * e.g unsubscribe()
 */
export const ListenToDocument = <
K extends fireorm.IEntity,
T extends ImprovedRepository<K>
>(repo:T, documentRef:DocumentReference, cb:(doc:K)=>void, onError:onListenError)=>{

  const obeserver = (docSnapshot:DocumentSnapshot)=>{
    const doc = repo.extractFromDocSnap(docSnapshot);
    cb(doc);
  }
  return onListenDocument(
    documentRef,
    obeserver,
    onError
  )
}

//#endregion Firestore listener
