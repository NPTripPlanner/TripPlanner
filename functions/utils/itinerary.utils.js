const firestore = require('./utils').firestore();
const commonUtils = require('./commom.utils');
const moment = require('moment');

/**
 * Create a itinerary under a trip archive
 * 
 * @param {*} archiveId trip archive id
 * @param {*} itineraryName name for itinerary, if null then default name will be used
 * @param {*} startDateLocal string of start date for itinerary.
 * 
 * date string formate is like 2013-02-04T10:35:24-08:00
 * 
 * The date is from client in local and it will be converted into UTC time.
 * 
 * Given null to set it to today
 * 
 * @param {*} endDateLocal string of end date for itinerary.
 * 
 * date string formate is like 2013-02-04T10:35:24-08:00
 * 
 * The date is from client in local and it will be converted into UTC time.
 * 
 * If startDateLocal was null then this will set to 1 day after startDateLocal
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
    if(!archiveFileExists) throw new Error(`Given archive id ${archiveId} do not exist`);

    //get a new ref for itinerary
    const itDocRef = archiveDocRef.collection('itineraries').doc();

    let defaultStartDateLocal = startDateLocal;
    let defaultEndDateLocal = endDateLocal;

    if(!defaultStartDateLocal){
        defaultStartDateLocal = moment.utc().format();
        defaultEndDateLocal = moment.utc().add(1, 'days').format();
    }
    else if(!defaultEndDateLocal){
        throw new Error('startDateLocal was given but endDateLocal was not');
    }

    //convert time to UTC
    let startDateUTC = commonUtils.convertLocalToUTC(defaultStartDateLocal);
    let endDateUTC = commonUtils.convertLocalToUTC(defaultEndDateLocal);

    //different days between start to end date
    const totalDays = commonUtils.getTotalDays(startDateUTC, endDateUTC);

    //convert to server timestamp
    startDateUTCTS = commonUtils.convertToServerTimestamp(startDateUTC.toDate());
    endDateUTCTS = commonUtils.convertToServerTimestamp(endDateUTC.toDate());

    //transform data
    let itinerarydata = {
        id: itDocRef.id,
        name: itineraryName?itineraryName:'First itinerary', 
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

/**
 * Update itinerary data
 * @param {*} tripArchiveDocRef the ref of trip archive this itinerary stored under 
 * @param {*} itineraryId itinerary id
 * @param {*} dataToUpdate data to update
 * 
 * shape:
 * {name, startDate, endDate} startDate and endDate are string in local time
 * 
 * @param {*} writeHandler a handler for write
 * 
 * accept transaction, batch or writebulk
 */
exports.updateItineraryData = async (tripArchiveDocRef, itineraryId, dataToUpdate, writeHandler)=>{
    const itinerariesRef = await tripArchiveDocRef.collection('itineraries');
    const itDocRef = await itinerariesRef.doc(`${itineraryId}`);
    const docSnapshot = await itDocRef.get();

    if(!docSnapshot.exists) throw new Error(`Itinerary ${itineraryId} do not exists`);

    const {name, startDate, endDate} = dataToUpdate;

    let updatedData = {};

    if(name) updatedData = {...updatedData, name};

    //update startDate, endDate and totalDays
    if(startDate && endDate){
        //convert time to UTC
        let startDateUTC = commonUtils.convertLocalToUTC(startDate);
        let endDateUTC = commonUtils.convertLocalToUTC(endDate);

        //different days between start to end date
        const totalDays = commonUtils.getTotalDays(startDateUTC, endDateUTC);

        //convert to server timestamp
        startDateUTCTS = commonUtils.convertToServerTimestamp(startDateUTC.toDate());
        endDateUTCTS = commonUtils.convertToServerTimestamp(endDateUTC.toDate());

        updatedData = {
            ...updatedData,
            startDateUTC: startDateUTCTS,
            endDateUTC: endDateUTCTS,
            totalDays,
        };
    }

    itinerarydata = commonUtils.addModifyDateToObject(updatedData);

    writeHandler.update(docSnapshot.ref, updatedData);

    return true;
}