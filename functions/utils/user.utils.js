const firestore = require('./utils').firestore();
const commonUtils = require('./commom.utils');


/**
 * Create a new user
 */
exports.createUserWith = async (userData, writeHandler)=>{
    if(!userData) throw Error('User data was not given');

    let user = {
        id: userData.id,
        displayName: userData.displayName,
        email: userData.email,
        ownedArchives:[],
    };
    user = commonUtils.addCreateDateToObject(user);
    user = commonUtils.addModifyDateToObject(user);

    const userDocRef = await firestore.collection('userArchive').doc(user.id);

    writeHandler.create(userDocRef, user);

    return user.id;
}

