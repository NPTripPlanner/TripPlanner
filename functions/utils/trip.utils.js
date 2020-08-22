const firestore = require('./utils').firestore();
const commonUtils = require('./commom.utils');


/**
 * Create a trip archive which contain number of trips
 */
exports.createTripArchiveWith = async (ownerId, archiveName, batchOrTrans)=>{
    try{
        const archiveDocRef = await firestore.collection('tripArchive').doc();

        const archiveData = {
            id: archiveDocRef.id,
            ownerId: ownerId?ownerId:'System',
            metadata: commonUtils.getMetadata(),
            name: archiveName?archiveName:'New collection'
        }

        batchOrTrans.create(archiveDocRef, archiveData);

        return archiveData.id;
    }
    catch(err){
        throw err;
    }
}

/**
 * Create a trip under specific trip archive
 */
exports.createTripUnderArchiveWith = async (archiveId, tripData, batchOrTrans)=>{
    try{
        if(!archiveId) throw Error('Archive id was not given');
        if(!tripData) throw Error('Trip data is required');

        const archiveDocRef = await firestore.collection('tripArchive').doc(archiveId);
        const archiveFileExists = await (await archiveDocRef.get()).exists;
        if(!archiveFileExists) throw Error(`Given archive id ${archiveId} do not exist`);

        const tripDocRef = archiveDocRef.collection('tripCollection').doc();
        const data = {...tripData, id:tripDocRef.id};

        batchOrTrans.create(tripDocRef, data);

        return tripData.id;
    }
    catch(err){
        throw err;
    }
}

/**
 * transfer trip archive to specific user
 */
exports.transferTripArchiveTo = async (userId, archiveId, batchOrTrans)=>{
    try{
        const userDocRef = await firestore.collection('userArchive').doc(userId);
        const archiveDocRef = await firestore.collection('tripArchive').doc(archiveId);
        const errorMsg = 'Transfer trip archive fail';
        const userSnapshot = await userDocRef.get();
        const archiveSnapshot = await archiveDocRef.get();

        if(!userSnapshot.exists) throw Error(`${errorMsg} user do not exist`);
        if(!archiveSnapshot.exists) throw Error(`${errorMsg} trip archive do not exist`);

        //update trip archive owerId
        const data = {ownerId: userId}
        batchOrTrans.update(archiveDocRef, data);

        //update user ownership
        const ownedArchives = userSnapshot.data().ownedArchives;

        if(!ownedArchives.includes(archiveId)){
            ownedArchives.push(archiveId);

            const data = {ownedArchives: ownedArchives};
            batchOrTrans.update(userDocRef, data);
        }

        return true;
    }
    catch(err){
        throw Error(err);
    }
}

exports.getTripArchive = async (archiveId)=>{
    try{
        const archiveSnapshot = await firestore.collection('tripArchive').doc(archiveId).get();
        if(!archiveSnapshot.exists) throw Error(`TripArchive ${archiveId} does not exists`);
        return archiveSnapshot.data();
    }
    catch(err){
        throw Error(err);
    }
}
