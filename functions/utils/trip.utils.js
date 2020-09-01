const firestore = require('./utils').firestore();
const commonUtils = require('./commom.utils');


/**
 * Create a trip archive which contain number of trips
 */
exports.createTripArchiveWith = async (ownerId, archiveName, writeHandler)=>{
    const archiveDocRef = await firestore.collection('tripArchive').doc();

    let name = archiveName?archiveName:'New collection';

    let archiveData = {
        id: archiveDocRef.id,
        ownerId: ownerId?ownerId:'System',
        name,
        tags: [],
    }
    archiveData = commonUtils.addCreateDateToObject(archiveData);
    archiveData = commonUtils.addModifyDateToObject(archiveData);

    writeHandler.create(archiveDocRef, archiveData);

    return archiveData.id;
}

/**
 * transfer trip archive to specific user
 */
exports.transferTripArchiveTo = async (userId, archiveId, writeHandler)=>{
    const userDocRef = await firestore.collection('userArchive').doc(userId);
    const archiveDocRef = await firestore.collection('tripArchive').doc(archiveId);
    const errorMsg = 'Transfer trip archive fail';
    const userSnapshot = await userDocRef.get();
    const archiveSnapshot = await archiveDocRef.get();

    if(!userSnapshot.exists) throw Error(`${errorMsg} user do not exist`);
    if(!archiveSnapshot.exists) throw Error(`${errorMsg} trip archive do not exist`);

    //update trip archive owerId
    const data = {ownerId: userId}
    writeHandler.update(archiveDocRef, data);

    //update user ownership
    const ownedArchives = userSnapshot.data().ownedArchives;

    if(!ownedArchives.includes(archiveId)){
        ownedArchives.push(archiveId);

        const data = {ownedArchives: ownedArchives};
        writeHandler.update(userDocRef, data);
    }

    return true;
}

exports.getTripArchive = async (archiveId)=>{
    const archiveSnapshot = await firestore.collection('tripArchive').doc(archiveId).get();
    if(!archiveSnapshot.exists) throw Error(`TripArchive ${archiveId} does not exists`);
    return archiveSnapshot.data();
}

exports.updateTripArchiveName = async (userId, archiveId, archiveName, writeHandler)=>{
 
    const querySnapshot = await firestore.collection('tripArchive')
    .where('ownerId', '==', userId)
    .where('id', '==', archiveId)
    .limit(1)
    .get();

    const docSnapshot = querySnapshot.docs[0];
    if(!docSnapshot) throw new Error(`${archiveId} do not exists`); 

    let data = {name:archiveName};
    commonUtils.addModifyDateToObject(data);

    writeHandler.update(docSnapshot.ref, data);

    return true;
}

