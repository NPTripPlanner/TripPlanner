const firestore = require('./utils').firestore();
const commonUtils = require('./commom.utils');
const moment = require('moment');

/**
 * Create a itinerary under a trip archive
 * 
 * @param {*} archiveId trip archive id
 * @param {*} itineraryName name for itinerary
 * @param {*} startDateLocal string of start date for itinerary.
 * 
 * date string formate is like 2013-02-04T10:35:24-08:00
 * 
 * The date is from client in local and it will be converted into UTC time.
 * 
 * @param {*} endDateLocal string of end date for itinerary.
 * 
 * date string formate is like 2013-02-04T10:35:24-08:00
 * 
 * The date is from client in local and it will be converted into UTC time.
 * 
 * @param {*} writeHandler a handler for write. 
 * 
 * accept transaction, batch or writebulk
 * 
 * @returns return itinerary id
 */
exports.createItineraryForTripArchive = async (
    archiveId,
    itineraryName,
    startDateLocal,//e.g 2013-02-04T10:35:24-08:00
    endDateLocal,//e.g 2013-02-04T10:35:24-08:00
    writeHandler
    )=>{

    if(!archiveId) throw Error('Archive id was not given');

    //check if archive do exists
    const archiveDocRef = await firestore.collection('tripArchive').doc(archiveId);
    const archiveFileExists = await (await archiveDocRef.get()).exists;
    if(!archiveFileExists) throw Error(`Given archive id ${archiveId} do not exist`);

    //get a new ref for itinerary
    const itDocRef = archiveDocRef.collection('itineraries').doc();

    //time conversion and day calculation
    let startDateUTC = moment.utc(startDateLocal);
    let endDateUTC = moment.utc(endDateLocal);
    const totalDays = endDateUTC.diff(startDateUTC, 'days') + 1;

    //convert to server timestamp
    startDateUTCTS = commonUtils.convertToServerTimestamp(startDateUTC.toDate());
    endDateUTCTS = commonUtils.convertToServerTimestamp(endDateUTC.toDate());

    //transform data
    let itinerarydata = {
        id: itDocRef.id,
        name: itineraryName, 
        startDateUTC: startDateUTCTS,
        endDateUTC: endDateUTCTS,
        totalDays,
        tripArchiveId: archiveId,
    };
    itinerarydata = commonUtils.addCreateDateToObject(itinerarydata);
    itinerarydata = commonUtils.addModifyDateToObject(itinerarydata);

    writeHandler.create(itDocRef, itinerarydata);

    return itinerarydata.id;
}

exports.updateItineraryName = async (tripArchiveDocRef, itineraryId, itineraryName, writeHandler)=>{
    const itinerariesRef = await tripArchiveDocRef.collection('itineraries');
    const itDocRef = await itinerariesRef.doc(`${itineraryId}`);
    const docSnapshot = await itDocRef.get();

    if(!docSnapshot.exists) throw new Error(`Itinerary ${itineraryId} do not exists`);

    const data = {name: itineraryName};
    itinerarydata = commonUtils.addModifyDateToObject(itinerarydata);

    writeHandler.update(docSnapshot.ref, data);

    return true;
}