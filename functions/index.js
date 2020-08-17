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

exports.initUser = functions.https.onCall(async (data, context) => {
    
    if(process.env.NODE_ENV !== 'test'){
        if(!context.auth){
            throw new functions.https.HttpsError('unauthorized', 'Initialize user fail');
        }
    }
    
    try{
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
        console.log(err)
        throw new functions.https.HttpsError(err.code, err.message);
    }
});

