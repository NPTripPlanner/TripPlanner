import * as firebaseTest from "@firebase/testing";
import * as firebasePro from "firebase";
import 'firebase/functions';
import 'firebase/firestore';
import getErrorMsg from "./firebase.errors.utils";
import * as fireorm from 'fireorm';
import {TripArchive, TripArchiveRepository } from '../schema/firestore.schema';
import { QueryDocumentSnapshot, DocumentReference, CollectionReference, DocumentSnapshot, QuerySnapshot, Query } from "@google-cloud/firestore";
import ImprovedRepository from "../schema/ImprovedRepository";
import { BaseRepository } from "fireorm/lib/src/BaseRepository";
import { IEntity } from "fireorm";

export type FirebaseUser = firebasePro.User;

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
    //test do not use auth but dev and production
    if (process.env.NODE_ENV !== "test"){ 
      firebaseAuth = app.auth();
    }
    firebaseDatabase = app.firestore();
    cloudFunctions = app.functions();

    //test and developmentuse firestore and cloud function in emulator 
    if(process.env.NODE_ENV!=='production'){
      cloudFunctions.useFunctionsEmulator('http://localhost:5001');
    }
    //connect to emulator firestore in dev
    if(process.env.NODE_ENV === 'development'){
      firebasePro.firestore().settings({
        host: "localhost:8080",
        ssl: false
      });
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
    //only use when dev mode
    if(process.env.NODE_ENV === 'development'){
      const result = await initializeUser(userCredential.user);
      if(!result) throw Error('Initilize user fail');
    }
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
 * An easy way to get fireorm's repository from root collection
 * with type conversion if provided
 * @param entity 
 */
export const GetRepository = async <
T extends fireorm.IEntity,
ConvertToType = ImprovedRepository<T>
>
(entity:fireorm.Constructor<T>)=>{
  return (await fireorm.getRepository(entity)) as unknown as ConvertToType;
}

/**
 * A special function that convert fireorm repo, which extends from BaseRepository
 * into a custom ImprovedRepository
 * 
 * This is intend to be use with subcollections.
 * 
 * Given type is recommend
 * @param repo which is class extends from fireorm BaseRepository
 */
export const ConvertRepo = async <T extends IEntity,>(repo:BaseRepository)=>{
  return repo as unknown as ImprovedRepository<T>;
}

export const GetCollectionRef = async <T extends fireorm.IEntity>(entity:fireorm.Constructor<T>)=>{
  return (await GetRepository(entity)).getCollectionReference();
}
//#endregion Fireorm

//#region Firestore query
interface QueryDataReturn<T> {
  lastDocSnapshotCursor: QueryDocumentSnapshot | null,
  results: T[]
}

/**
 * Get data by firestore query
 * 
 * @param entity a class type that was defined as schema with fireorm
 * @param query firebase query
 * @param amount number of data to return. given less or equal to 0 to return all data.
 * Default is 5
 * 
 * Note: If given firebase query had .limit() then will be replaced by this amount
 * 
 * @param startAfter a QueryDocumentSnapshot or null.
 * 
 * If given then return data are after given document snapshot.
 * 
 * If null then return data are alway from start
 * 
 * @returns {QueryDataReturn} an object that contain 2 properties:
 * 
 * @property {lastDocSnapshotCursor} a QueryDocumentSnapshot return from last document data
 * 
 * you can give this to startAfter at next GetDataByQuery to achive pagination.
 * 
 * @property {results} an array of data
 */
export const GetDataByQuery = async  <T extends fireorm.IEntity>(
  repository:ImprovedRepository<T>,
  query:Query,
  amount:number = 5,
  startAfter:QueryDocumentSnapshot|null = null, 
  ):Promise<QueryDataReturn<T>>=> {

  const repo = repository;

  let newQuery = query;
  if(startAfter) newQuery = newQuery.startAfter(startAfter);
  if(amount > 0) newQuery = newQuery.limit(amount);

  const q = await newQuery.get();

  if(q.empty) return {
    lastDocSnapshotCursor: startAfter,
    results: Array<T>(),
  };

  const results: T[] = [];
  for(let snap of q.docs){
    const data = await repo.findById(snap.id);
    results.push(data);
  }
  return {
    lastDocSnapshotCursor: q.docs[q.docs.length - 1],
    results
  };

}

/**
 * Convert a keyword string into an array splited by space in string
 * 
 * @param keyword a string to be splited into an array
 * 
 * @returns an array of string otherwise null if keyword is empty string or
 * only whitespaces
 */
export const ConvertSearchKeywordToArray = (keyword:string):string[]=>{
  let words: string[]|null = null;
  if(keyword){
    if (!keyword.replace(/\s/g, '').length) return words;

    words = keyword.split(' ');
    if(!words) {
      words = [keyword];
    }
  }

  return words;
}
//#endregion Firestore query

//#region Firestore Search
/**
 * Deprecated use GetDataByQuery instead
 * 
 * Search trip archive
 * 
 * Support keyword search and pagination loading
 * 
 * Note: keyword must has same string when pagination loading is required.
 * 
 * Search by keyword:
 * keyword + amount(0 to return all)
 * 
 * Search by keyword with pagination:
 * keyword + startAfter + amount(0 to return all). 
 * keyword must keep exactly the same throughout each search.
 * However, give startAfter null to start from begin of search index,
 * if search first time.
 * 
 * Pagination only:
 * startAfter + amount(0 to return all). 
 * Give startAfter null to start from begin of search index,
 * if search first time.
 * 
 * 
 * 
 * @param userId user id that trip archive need to be searched under
 * @param keyword keyword for trip archive name, given null or empty string to disable keyword search,
 * in other word result return all trip archives by amount.
 * 
 * keyword must be the same through each search if pagination is required
 * @param amount amount to return, given number equal or less than 0 to return all at once 
 * @param startAfter QueryDocumentSnapshot, 
 * if given then return trip archives by amount after this snapshot.
 * 
 * This is purposly for pagination loading, but only work if keyword is the same
 * through each search. To do pagination loading, just give last document snapshot from
 * this function's return value
 *  
 * This must be null if each searchs with different keyword, otherwise result would be unexpected.
 * 
 * @returns an object contain lastDocSnapshotCursor and array of TripArchive.
 * 
 * lastDocSnapshotCursor is a cursor that point to a document at end of this search,
 * give this to next search with same or without keyword to return next amount of data 
 */
export const SearchTripArchive = async (
  userId:string,
  keyword:string,
  amount:number,
  startAfter:null|QueryDocumentSnapshot=null 
  )=>{
  try{
    let words: string[]|null = null;
    if(keyword){
      words = keyword.split(' ');
      if(!words) {
        words = [keyword];
      }
    }

    const tripArchiveRepo = await GetRepository(TripArchive);
    let query = tripArchiveRepo.getCollectionReference()
    .where('ownerId', '==', userId);
    if(words) query = query.where('tags', 'array-contains-any', words);
    query = query.orderBy('createAt', 'desc');
    if(startAfter) query = query.startAfter(startAfter);
    if(amount > 0) query = query.limit(amount);
    const q = await query.get();

    if(q.empty) return {
      lastDocSnapshotCursor: startAfter,
      results:Array<TripArchive>(),
    };

    const results: TripArchive[] = [];
    for(let snap of q.docs){
      const tripArchive = await GetTripArchive(userId, snap.id);
      results.push(tripArchive);
    }
    return {
      lastDocSnapshotCursor: q.docs[q.docs.length - 1],
      results
    };
  }
  catch(err){
    throw Error(getErrorMsg(err.code));
  }
}
//#endregion Firestore Search

//#region Firestore Read
/**
 * Return all trip archives under user id
 * @param userId user id to fetch trip archive from
 */
export const FetchTripArchive = async (userId:string)=>{
  try{
    // const tripArchiveRepo = await fireorm.getRepository(TripArchive);
    const tripArchiveRepo = await GetRepository(TripArchive);
    return await tripArchiveRepo.whereEqualTo('ownerId', userId).find();
  }
  catch(err){
    throw Error(getErrorMsg(err.code));
  }
}

/**
 * Get trip archives under user id after certain document
 * 
 * This fetch is for pagination use
 * @param userId user id to fetch trip archive from
 * @param amount how many to fetch at a time, default is 10
 * @param startAfter a particualr document snapshot, usually from the last fetch, if null fetch will
 * start from the begining
 */
// export const FetchTripArchiveAfter = async (userId:string, 
//   amount:number=10,
//   startAfter:null|QueryDocumentSnapshot=null,
//   )=>{
//   try{
//     // const tripArchiveRepo = (await fireorm.getRepository(TripArchive)) as TripArchiveRepository;
//     const tripArchiveRepo = await GetRepository<TripArchive, TripArchiveRepository>(TripArchive);
//     tripArchiveRepo.qeryAfterSnap(startAfter);
//     const results = await tripArchiveRepo.whereEqualTo('ownerId', userId)
//     .orderByDescending('createAt')
//     .limit(amount)
//     .find();
//     return {
//       lastDocSnap: tripArchiveRepo.getLastDocQuerySnap(),
//       results: results,
//     }
//   }
//   catch(err){
//     throw Error(getErrorMsg(err.code));
//   }
// }

/**
 * Return trip archive under user with archive id
 * @param userId user id to get trip archive from
 * @param archiveId trip archive id
 */
export const GetTripArchive = async (userId:string, archiveId:string)=>{
  try{
    const tripArchiveRepo = await GetRepository<TripArchive, TripArchiveRepository>(TripArchive);
    const result = await tripArchiveRepo.whereEqualTo('ownerId', userId)
    .whereEqualTo('id', archiveId)
    .findOne();
    
    return result;
  }
  catch(err){
    throw Error(getErrorMsg(err.code));
  }
}
//#endregion Firestore Read

//#region Firestore write
/**
 * Create a new trip archive in firestore through cloud function
 * @param userId user id the new trip archive will be created under
 * @param archiveName trip archive name
 */
export const CreateTripArchive = async (userId:string, archiveName:string)=>{
  try{
    const result = await cloudFunctions.httpsCallable('createTripArchive')({
      userId: userId,
      name: archiveName,
    });
    const archiveId = result.data.id;
    const data = await GetTripArchive(userId, archiveId);
    
    return data;
  }
  catch(err){
    console.log(err)
    throw Error(getErrorMsg(err.code));
  }
}

/**
 * Create an itinerary under trip archive
 * @param userId user id
 * @param archiveId archive id that itinerary will be created under
 * @param itineraryName name for itinerary
 * @param startDate itinerary start date in UTC string
 * @param endDate itinerary end date in UTC string
 */
export const CreateItineraryForTripArchive = async (
  userId:string,
  archiveId:string,
  itineraryName:string,
  startDate:string,
  endDate:string
  )=>{
    try{
      const result = await cloudFunctions.httpsCallable('createItineraryForTripArchive')({
        tripArchiveId: archiveId,
        name: itineraryName,
        startDate,
        endDate,
      });
      const itineraryId = result.data.id;
      const tripArchive = await GetTripArchive(userId, result.data.tripArchiveId);
      const it = await tripArchive.itineraries.findById(itineraryId);
      
      return it;
    }
    catch(err){
      console.log(err)
      throw Error(getErrorMsg(err.code));
    }
}
//#endregion Firestore write

//#region Firestore update
export const UpdateTripArchiveName = async (userId:string, archiveId:string, archiveName:string)=>{
  try{
    const result = await cloudFunctions.httpsCallable('updateTripArchiveName')({
      userId: userId,
      tripArchiveId: archiveId,
      name: archiveName,
    });

    if(!result) throw new Error(
      `Can not update ${archiveId} trip archive name`
    );

    const tripArchive = await GetTripArchive(userId, archiveId);
    
    return tripArchive;
  }
  catch(err){
    throw Error(getErrorMsg(err.code));
  }
}

export const UpdateItineraryName = async (
  userId:string,
  archiveId:string,
  itineraryId:string,
  name:string)=>{

    try{
      const result = await cloudFunctions.httpsCallable('updateItineraryName')({
        userId: userId,
        tripArchiveId: archiveId,
        itineraryId: itineraryId,
        name: name,
      });
      
      if(!result) throw new Error(
        `Can not update ${itineraryId} itinerary name under trip archive ${archiveId}`
      );
  
      const tripArchive = await GetTripArchive(userId, archiveId);
      const it = tripArchive.itineraries.findById(itineraryId);
      
      return it;
    }
    catch(err){
      throw Error(getErrorMsg(err.code));
    }
}
//#endregion Firestore update

//#region Firestore delete
/**
 * Delete a trip archive
 * @param userId user id the trip archive will be deleted under
 * @param archiveId trip archive Id
 */
export const DeleteTripArchive = async (userId:string, archiveId:string)=>{
  try{
    const result = await cloudFunctions.httpsCallable('deleteTripArchive')({
      userId: userId,
      tripArchiveId: archiveId,
    });
    
    return result.data;
  }
  catch(err){
    throw Error(getErrorMsg(err.code));
  }
}

export const DeleteItinerary = async (
  userId:string,
  archiveId:string,
  itineraryId:string
  )=>{
    try{
      const result = await cloudFunctions.httpsCallable('deleteItinerary')({
        userId: userId,
        tripArchiveId: archiveId,
        itineraryId: itineraryId,
      });
      
      return result.data;
    }
    catch(err){
      throw Error(getErrorMsg(err.code));
    }
}
//#endregion Firestore delete

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
 * Create a realtime listener to listen on
 * specific repository(collection) change
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
 * Create a realtime listener to listen on specific document change
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
