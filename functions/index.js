const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firestore = admin.initializeApp({
    projectId:'tripplanner-9563b'
}).firestore();

exports.initUser = functions.https.onCall(async (data, context) => {
    // if(!context.auth){
    //     throw new functions.https.HttpsError('unauthorized', 'Initialize user fail');
    // }

    try{
        const user = {
            id: data.id,
            displayName: data.displayName,
            email: data.email,
            metadata:{
                createDate: admin.firestore.FieldValue.serverTimestamp(),
                modifyDate: admin.firestore.FieldValue.serverTimestamp(),
            }
        };
        await firestore.collection('userArchive').doc(user.id).create(user);
        return user;
    }
    catch(err){
        throw new functions.https.HttpsError(err.code, err.message);
    }
});