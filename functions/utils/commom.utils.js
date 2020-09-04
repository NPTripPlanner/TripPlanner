const admin = require('firebase-admin');
const moment = require('moment');

const getNowUTC = ()=>{

    const nowUTC = moment.utc();
    return nowUTC.toDate();
}

const convertToUTC = (date)=>{
    const dateUTC = moment.utc(date);
    return dateUTC.toDate();
}

const addCreateDateToObject = (object, createDate=null)=>{
    let cDate = admin.firestore.Timestamp.fromDate(getNowUTC());
    if(createDate){
        cDate = admin.firestore.Timestamp.fromDate(convertToUTC(createDate));
    }
    object['createAt'] = cDate;
    return object;
}

const addModifyDateToObject = (object, modifyDate=null)=>{
    let mDate = admin.firestore.Timestamp.fromDate(getNowUTC());
    if(modifyDate){
        mDate = admin.firestore.Timestamp.fromDate(convertToUTC(modifyDate));
    }
    object['modifyAt'] = mDate;
    return object;
}

const convertToServerTimestamp = (date)=>{
    return admin.firestore.Timestamp.fromDate(date);
}

const getTagsfromName = (name, splitBy=' ')=>{
    if(!name) return [];
    const result = name.split(splitBy);
    return result?result:[];
}

/**
 * Convert date time to UTC
 * @param {*} datetime string format is like 2013-02-04T10:35:24-08:00
 */
const convertLocalToUTC = (datetime)=>{
    const convertUTC = moment.utc(datetime);
    return convertUTC;
}

/**
 * Get total days from start to end 
 * @param {*} start Moment object
 * @param {*} end  Moment object
 * 
 * @returns total days in number
 */
const getTotalDays = (start, end)=>{
    const diffDays = end.diff(start, 'days');
    if(diffDays < 0) throw new Error('start date is after end date');
    const totalDays = diffDays + 1;

    return totalDays;
}

module.exports = {
    addCreateDateToObject,
    addModifyDateToObject,
    getTagsfromName,
    convertToServerTimestamp,
    convertLocalToUTC,
    getTotalDays,
}
