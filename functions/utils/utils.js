let adminApp;
let firestore;

module.exports = {
    init:(adminApp)=>{
        adminApp = adminApp,
        firestore = adminApp.firestore();
    },
    adminApp: ()=>adminApp,
    firestore: ()=>firestore,
}