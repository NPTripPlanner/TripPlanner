const firestore = require('./utils').firestore();
const commonUtils = require('./commom.utils');


/**
 * Create a trip archive which contain number of trips
 */
exports.createTripArchiveWith = async (ownerId, archiveName, batchOrTrans)=>{
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

    batchOrTrans.create(archiveDocRef, archiveData);

    return archiveData.id;
}

/**
 * Create a trip under specific trip archive
 */
exports.createTripUnderArchiveWith = async (archiveId, tripData, batchOrTrans)=>{
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

/**
 * transfer trip archive to specific user
 */
exports.transferTripArchiveTo = async (userId, archiveId, batchOrTrans)=>{
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

exports.getTripArchive = async (archiveId)=>{
    const archiveSnapshot = await firestore.collection('tripArchive').doc(archiveId).get();
    if(!archiveSnapshot.exists) throw Error(`TripArchive ${archiveId} does not exists`);
    return archiveSnapshot.data();
}

exports.getAllDocumentsPathUnder = async (documentRef, includeSelf=true)=>{
    const docSnap = await documentRef.get();
    if(!docSnap.exists) throw new Error(`Document ${documentRef.id} do not exists`);

    let refs = [];
    const listCols = await documentRef.listCollections();

    for (let col of listCols){
        const listDocRefs = await col.listDocuments();
        for(let docRef of listDocRefs){
            const returnRefs = await this.getAllDocumentsPathUnder(docRef);
            refs.push(returnRefs);
        }
    }

    if(includeSelf) refs.push(documentRef);
    return refs.flat();
}

exports.updateTripArchiveName = async (userId, archiveId, archiveName, batchOrTrans)=>{
 
    const querySnapshot = await firestore.collection('tripArchive')
    .where('ownerId', '==', userId)
    .where('id', '==', archiveId)
    .limit(1)
    .get();

    const docSnapshot = querySnapshot.docs[0];
    if(!docSnapshot) throw new Error(`${archiveId} do not exists`); 

    batchOrTrans.update(docSnapshot.ref, {name: archiveName});

    return true;
}

