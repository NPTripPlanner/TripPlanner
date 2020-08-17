let adminApp;
let firestore;

module.exports = {
    init:(app)=>{
        adminApp = app,
        firestore = adminApp.firestore();
    },
    adminApp: ()=>adminApp,
    firestore: ()=>firestore,
}