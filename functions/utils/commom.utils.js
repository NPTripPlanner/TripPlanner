const admin = require('firebase-admin');

class CommonUtils {

    static getMetadata(createDate=null, modifyDate=null){

        let cDate = admin.firestore.Timestamp.fromDate(new Date());
        let mDate = admin.firestore.Timestamp.fromDate(new Date());
        if(createDate){
            cDate = admin.firestore.Timestamp.fromDate(createDate);
        }
        if(modifyDate){
            mDate = admin.firestore.Timestamp.fromDate(modifyDate);
        }
        return {
            createAt: cDate,
            modifyAt: mDate,
        }
    }
}

module.exports = CommonUtils;
