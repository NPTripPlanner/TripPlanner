const functions = require('firebase-functions');
const admin = require('firebase-admin');
const adminApp = admin.initializeApp({
    projectId:'tripplanner-9563b'
})
const firestore = adminApp.firestore();

const utils = require('./utils/utils');
utils.init(adminApp);
const trip = require('./utils/trip.utils');
const user = require('./utils/user.utils');
const itinerary = require('./utils/itinerary.utils');
const commonUtils = require('./utils/commom.utils');
const trigger = require('./utils/trigger.utils');

const mockAuth = require('./mock/mock.auth');
const { QuerySnapshot } = require('@google-cloud/firestore');

const env = process.env.NODE_ENV;

if(process.env.NODE_ENV === 'production'){
    console.log = ()=>{}
}

class ValidateError extends Error{
    constructor(code, message){
        super(message);
        this.code = code;
    }
}

function validateAuthFromFunctionContext(context,  errorMsg=''){

    if (env==='test') {
      console.log("Authentication is mocked for integration testing");
      return mockAuth.mockFirebaseAuth;
    }
    if(context.auth) return context.auth

    throw new ValidateError('cloud-function/unauthorized', errorMsg);
}

/**
 * data: {
 *          id: string
            displayName: string,
            email: string,
 * }
 */
exports.initUser = functions.https.onCall(async (data, context) => {

    try{
        validateAuthFromFunctionContext(context, 'Initialize user fail');

        const userBatch = firestore.batch();
        //create a new user
        const userId = await user.createUserWith(data, userBatch);
        //create a new trip archive
        const archiveId = await trip.createTripArchiveWith(userId, null, userBatch);
        
        await userBatch.commit();

        //transfer trip archive to user
        await firestore.runTransaction(async (trans)=>{
            return await trip.transferTripArchiveTo(userId, archiveId, trans);
        })

        //uncomment to create 50 trip archives for test
        // for(let i=0; i<50; i++){
        //     const batch = firestore.batch();
        //     const archiveIdd = await trip.createTripArchiveWith(userId, `archive ${i}`, batch);
        //     await batch.commit();

        //     //transfer trip archive to user
        //     await firestore.runTransaction(async (trans)=>{
        //         return await trip.transferTripArchiveTo(userId, archiveIdd, trans);
        //     })
        // }
    
        //test
        // const itBatch = firestore.batch();
        // //create trip under a trip archive
        // await itinerary.createItineraryForTripArchive(archiveId, null, null, null, itBatch);
        // await itBatch.commit();
        
        return true;
    }
    catch(err){
        console.log(err);
        throw new functions.https.HttpsError(err.code, err.message);
    }
});

exports.createTripArchive = functions.https.onCall(async (data, context)=>{

    try{
        validateAuthFromFunctionContext(context, 'Create trip archive fail');

        const {userId, name} = data;

        const archiveBatch = firestore.batch();
        const archiveId = await trip.createTripArchiveWith(userId, name, archiveBatch);
        await archiveBatch.commit();

        //transfer trip archive to user
        await firestore.runTransaction(async (trans)=>{
            return await trip.transferTripArchiveTo(userId, archiveId, trans);
        });

        //uncomment to create a dummy trip template
        // const tripBatch = firestore.batch();
        // for(let i=0; i<15; i++){
        // //TODO:create trip template
        // let tripData = {
        //     tripName:'My first trip',
        // }
        // tripData = commonUtils.addCreateDateToObject(tripData);
        // tripData = commonUtils.addModifyDateToObject(tripData);
        // //create trip under a trip archive
        // await trip.createTripUnderArchiveWith(archiveId, tripData, tripBatch);
        // }
        // await tripBatch.commit();

        const retData = {
            id: archiveId,
            ownerId: userId,
        };

        return retData;
    }
    catch(err){
        console.log(err);
        throw new functions.https.HttpsError(err.code, err.message);
    }
});

exports.deleteTripArchive = functions.https.onCall(async (data, context)=>{
    try{
        validateAuthFromFunctionContext(context, 'Delete trip archive fail');

        const {userId, tripArchiveId} = data;
        const docRef = await firestore.collection('tripArchive').doc(tripArchiveId);
        const docSnapshot = await docRef.get();
        if(!docSnapshot.exists){
            throw new Error(`Trip archive ${tripArchiveId} do not exists`);
        }
        if(docSnapshot.data().ownerId !== userId){
            throw new Error(`${tripArchiveId}'s ownerId do not match ${userId}`);
        }

        const allDocRefs = await utils.getAllDocumentsPathUnder(docRef);
        await utils.deleteDocuments(allDocRefs);
        return true;
    }
    catch(err){
        console.log(err.message);
        throw new functions.https.HttpsError(err.code, err.message);
    }
});

exports.updateTripArchiveName = functions.https.onCall(async (data, context)=>{
    try{
        validateAuthFromFunctionContext(context, 'update trip archive name fail');

        const {userId, tripArchiveId, name} = data;

        const result = await firestore.runTransaction(async (trans)=>{
            return await trip.updateTripArchiveName(userId, tripArchiveId, name, trans);
        });

        return result;
    }
    catch(err){
        console.log(err);
        throw new functions.https.HttpsError(err.code, err.message);
    }
});

exports.createItineraryForTripArchive = functions.https.onCall(
    async (data, context)=>{
        try{
            validateAuthFromFunctionContext(context, 'create itinerary fail');
    
            const {tripArchiveId, name, startDate, endDate} = data;
            const itId = await firestore.runTransaction(async (trans)=>{
                return await itinerary.createItineraryForTripArchive(
                    tripArchiveId, name, startDate, endDate, trans);
            });

            return {
                id: itId,
                tripArchiveId,
            }
        }
        catch(err){
            console.log(err);
            throw new functions.https.HttpsError(err.code, err.message);
        }
    }
);

exports.updateItinerary = functions.https.onCall(
    async (data, context)=>{
        try{
            validateAuthFromFunctionContext(context, 'update itinerary name fail');

            const {userId, tripArchiveId, itineraryId, dataToUpdate} = data;
            const tripArchiveRef = await firestore.collection('tripArchive');
            const querySnapshots = await tripArchiveRef.where('ownerId', '==', userId)
            .where('id', '==', tripArchiveId)
            .get();

            const tripArchiveDocSnap = querySnapshots.docs[0];
            if(!tripArchiveDocSnap.exists) throw new Error(`TripArchive ${tripArchiveId} do not exists`);

            const result = await firestore.runTransaction(async (trans)=>{
                return await itinerary.updateItineraryData(
                    tripArchiveDocSnap.ref, itineraryId, dataToUpdate, trans);
            });

            return result;

        }
        catch(err){
            console.log(err);
            throw new functions.https.HttpsError(err.code, err.message);
        }
    }
);

exports.deleteItinerary = functions.https.onCall(async (data, context)=>{
    try{
        validateAuthFromFunctionContext(context, 'Delete trip archive fail');

        const {userId, tripArchiveId, itineraryId} = data;
        const tripArchiveRef = await firestore.collection('tripArchive');
        const querySnapshots = await tripArchiveRef.where('ownerId', '==', userId)
        .where('id', '==', tripArchiveId)
        .get();

        const tripArchiveDocSnap = querySnapshots.docs[0];
        if(!tripArchiveDocSnap.exists) throw new Error(`TripArchive ${tripArchiveId} do not exists`);

        const itineraryColRef = tripArchiveDocSnap.ref.collection('itineraries');
        const itDocRef = itineraryColRef.doc(`${itineraryId}`);
        const itDocSnap = await itDocRef.get();
        if(!itDocSnap.exists) throw new Error(`Itinerary ${itineraryId} do not exists`);
        
        const allDocRefs = await utils.getAllDocumentsPathUnder(itDocRef);
        await utils.deleteDocuments(allDocRefs);
        return true;
    }
    catch(err){
        console.log(err.message);
        throw new functions.https.HttpsError(err.code, err.message);
    }
});

exports.triggerTripArchiveCreate = functions.firestore.document('tripArchive/{archive_id}')
.onCreate(trigger.updateTagsOnCreated);
exports.triggerTripArchiveChange = functions.firestore.document('tripArchive/{archive_id}')
.onUpdate(trigger.updateTagsOnChanged);

exports.triggerItineraryCreate = functions.firestore.document('tripArchive/{archive_id}/itineraries/{itinerary_id}')
.onCreate(trigger.updateTagsOnCreated);
exports.triggerItineraryChange = functions.firestore.document('tripArchive/{archive_id}/itineraries/{itinerary_id}')
.onUpdate(trigger.updateTagsOnChanged);
