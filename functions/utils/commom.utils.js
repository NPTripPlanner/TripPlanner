const admin = require('firebase-admin');

const addCreateDateToObject = (object, createDate=null)=>{
    let cDate = admin.firestore.Timestamp.fromDate(new Date());
    if(createDate){
        cDate = admin.firestore.Timestamp.fromDate(createDate);
    }
    object['createAt'] = cDate;
    return object;
}

const addModifyDateToObject = (object, modifyDate=null)=>{
    let mDate = admin.firestore.Timestamp.fromDate(new Date());
    if(modifyDate){
        mDate = admin.firestore.Timestamp.fromDate(modifyDate);
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
