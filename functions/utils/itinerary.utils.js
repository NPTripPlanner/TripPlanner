const firestore = require('./utils').firestore();
const commonUtils = require('./commom.utils');
const moment = require('moment');

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