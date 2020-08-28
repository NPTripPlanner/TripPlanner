const commonUtils = require('./commom.utils');

exports.onUpdateTripArchive = async (change, _context)=>{

    const nameBefore = change.before.data().name;
    const nameAfter = change.after.data().name;
    //to break infinite loop
    if(nameBefore === nameAfter) return;

    const name = change.after.data().name;
    const tags = commonUtils.getTagsfromName(name, ' ');
    change.after.ref.update({tags});
}

exports.onCreateTripArchive = async (change, _context)=>{
    const name = change.data().name;
    const tags = commonUtils.getTagsfromName(name, ' ');
    change.ref.update({tags});
}