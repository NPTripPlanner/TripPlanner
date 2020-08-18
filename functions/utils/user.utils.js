const firestore = require('./utils').firestore();
const commonUtils = require('./commom.utils');


/**
 * Create a new user
 */
exports.createUserWith = async (userData, batchOrTrans)=>{
    try{
        if(!userData) throw Error('User data was not given');

        const user = {
            id: userData.id,
            displayName: userData.displayName,
            email: userData.email,
            metadata: commonUtils.getMetadata(),
            ownedArchives:[],
        };

        const userDocRef = await firestore.collection('userArchive').doc(user.id);

        batchOrTrans.create(userDocRef, user);

        return user.id;
    }
    catch(err){
        throw err;
    }
}

