const commonUtils = require('./commom.utils');

exports.onUpdateTripArchive = async (change, _context)=>{
    try{
        const nameBefore = change.before?change.before.get('name'):null;
        const nameAfter = change.after?change.after.get('name'):null;

        console.log(nameBefore ,nameAfter);

        //document deleted
        if(!nameAfter) return null;

        //to break infinite loop risk
        if(nameBefore === nameAfter) return null;

        const name = change.after.data().name;
        const tags = commonUtils.getTagsfromName(name, ' ');
        
        return change.after.ref.update({tags});
    }
    catch(err){
        console.log(err);
    }
}

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

// exports.onCreateTripArchive = async (change, _context)=>{
//     try{
//         const name = change.data().name;
//         const tags = commonUtils.getTagsfromName(name, ' ');

//         if(!change.ref.exists) return;
//         change.ref.update({tags});
//     }
//     catch(err){
//         console.log(err);
//     }
// }