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

module.exports = {
    addCreateDateToObject,
    addModifyDateToObject,
    getTagsfromName,
    convertToServerTimestamp,
}
