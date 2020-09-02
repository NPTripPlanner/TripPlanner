const commonUtils = require('./commom.utils');

exports.onUpdateTripArchive = async (change, _context)=>{

    try{

        const nameBefore = change.before?change.before.get('name'):null;
        const nameAfter = change.after?change.after.get('name'):null;

        //document deleted
        if(nameAfter === null) return;

        //to break infinite loop risk
        if(nameBefore === nameAfter) return;

        const name = change.after.data().name;
        const tags = commonUtils.getTagsfromName(name, ' ');
        
        return change.after.ref.update({tags});
    }
    catch(err){
        console.log(err);
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