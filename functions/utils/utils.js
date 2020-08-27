let adminApp;
let firestore;

module.exports = {
    init:(app)=>{
        adminApp = app,
        firestore = adminApp.firestore();
    },
    adminApp: ()=>adminApp,
    firestore: ()=>firestore,
    deleteDocuments: async (docRefs)=>{
        if(!docRefs) return;
        
        const results = await firestore.runTransaction(async (trans)=>{
            const deletedDocs = [];
            for(let ref of docRefs){
                deletedDocs.push(ref.path);
                trans.delete(ref);
            }
            return deletedDocs;
        });

        console.log(`${results.length} documents was deleted`, results);
    }
}