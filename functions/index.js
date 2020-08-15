const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firestore = admin.initializeApp({
        projectId:'tripplanner-9563b'
}).firestore();

const getMetadata = (createDate=null, modifyDate=null)=>{
    let cDate = admin.firestore.Timestamp.fromDate(new Date());
    let mDate = admin.firestore.Timestamp.fromDate(new Date());
    if(createDate){
        cDate = admin.firestore.Timestamp.fromDate(createDate);
    }
    if(modifyDate){
        mDate = admin.firestore.Timestamp.fromDate(modifyDate);
    }
    return {
        createDate: cDate,
        modifyDate: mDate,
    }
}

exports.initUser = functions.https.onCall(async (data, context) => {
    if(!context.auth){
        throw new functions.https.HttpsError('unauthorized', 'Initialize user fail');
    }

    try{
        return await firestore.runTransaction(async (trans)=>{
            const userId = await createUser(trans, data);
            const archiveId =  await createTripArchive(trans, userId);
            await createTripTemplate(trans, archiveId);
            return data;
        });
    }
    catch(err){
        console.log(err)
        throw new functions.https.HttpsError(err.code, err.message);
    }
});

const createUser = async (trans, userData)=>{
    try{
        const user = {
            id: userData.id,
            displayName: userData.displayName,
            email: userData.email,
            metadata:getMetadata(),
        };
        const userDocRef = await firestore.collection('userArchive').doc(user.id);
        trans.create(userDocRef, user);
        return user.id;
    }
    catch(err){
        throw err;
    }
}

const createTripArchive = async (trans, ownerId)=>{
    try{
        const archiveDocRef = await firestore.collection('tripArchive').doc();

        const archiveData = {
            id: archiveDocRef.id,
            ownerId: ownerId,
            metadata: getMetadata(),
        }
        trans.create(archiveDocRef, archiveData);
        return archiveData.id;
    }
    catch(err){
        throw err;
    }
}

const createTripTemplate = async (trans, archiveId)=>{
    try{
        const archiveDocRef = await firestore.collection('tripArchive').doc(archiveId);
        const tripDocRef = archiveDocRef.collection('tripCollection').doc();
    
        //TODO:create trip template
        const tripData = {
            id: tripDocRef.id,
            tripName:'My first trip',
            metadata: getMetadata(),
        }
        trans.create(tripDocRef, tripData);
    
        return tripData.id;
    }
    catch(err){
        throw err;
    }
}