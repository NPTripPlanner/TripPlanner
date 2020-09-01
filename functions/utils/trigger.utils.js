const commonUtils = require('./commom.utils');

exports.onUpdateTripArchive = async (change, _context)=>{

    try{
        const nameBefore = change.before.data().name;
        const nameAfter = change.after.data().name;
        //to break infinite loop
        if(nameBefore === nameAfter) return;

        const name = change.after.data().name;
        const tags = commonUtils.getTagsfromName(name, ' ');
        
        if(!change.after.ref.exists) return;
        change.after.ref.update({tags});
    }
    catch(err){
        console.log(err);
    }
}

exports.onCreateTripArchive = async (change, _context)=>{
    try{
        const name = change.data().name;
        const tags = commonUtils.getTagsfromName(name, ' ');

        if(!change.ref.exists) return;
        change.ref.update({tags});
    }
    catch(err){
        console.log(err);
    }
}