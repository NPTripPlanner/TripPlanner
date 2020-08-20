const functions = require('firebase-functions');
const admin = require('firebase-admin');
const adminApp = admin.initializeApp({
    projectId:'tripplanner-9563b'
})
const firestore = adminApp.firestore();

require('./utils/utils').init(adminApp);
const trip = require('./utils/trip.utils');
const user = require('./utils/user.utils');
const commonUtils = require('./utils/commom.utils');

const mockAuth = require('./mock/mock.auth');


const env = process.env.NODE_ENV;

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
        
    
        const tripBatch = firestore.batch();
        //TODO:create trip template
        const tripData = {
            tripName:'My first trip',
            metadata: commonUtils.getMetadata(),
        }
        //create trip under a trip archive
        await trip.createTripUnderArchiveWith(archiveId, tripData, tripBatch);
        await tripBatch.commit();
        
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

        return {id: archiveId, ownerId: userId};
    }
    catch(err){
        console.log(err);
        throw new functions.https.HttpsError(err.code, err.message);
    }
});

