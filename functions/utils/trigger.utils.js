const commonUtils = require('./commom.utils');

/**
 * On document created
 * update search tags base on name
 * @param {*} docSnapshot 
 */
exports.updateTagsOnCreated = async (docSnapshot)=>{
    try{
        const name = docSnapshot?docSnapshot.get('name'):null;
        if(!name) return null;
        const tags = commonUtils.getTagsfromName(name, ' ');
        return docSnapshot.ref.update({tags});
    }
    catch(error){
        console.log(error);
    }
}

/**
 * On document changed 
 * update search tags base on name
 * @param {*} change 
 */
exports.updateTagsOnChanged = async (change)=>{
    try{
        const nameBefore = change.before?change.before.get('name'):null;
        const nameAfter = change.after?change.after.get('name'):null;

        if(!nameBefore || !nameAfter){
            console.log('before and after should not be empty', nameBefore, nameAfter);
            return null;
        }

        //to break infinite loop risk
        if(nameBefore === nameAfter) {
            console.log('same name no changed', nameBefore, nameAfter);
            return null;
        }

        const tags = commonUtils.getTagsfromName(nameAfter, ' ');
        return change.after.ref.update({tags});
    }
    catch(error){
        console.log(error);
    }
}