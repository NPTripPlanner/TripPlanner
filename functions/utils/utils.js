let adminApp;
let firestore;

const deleteDocuments = async (docRefs)=>{
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

const getAllDocumentsPathUnder = async (documentRef, includeSelf=true)=>{
    const docSnap = await documentRef.get();
    if(!docSnap.exists) throw new Error(`Document ${documentRef.id} do not exists`);

    let refs = [];
    const listCols = await documentRef.listCollections();

    for (let col of listCols){
        const listDocRefs = await col.listDocuments();
        for(let docRef of listDocRefs){
            const returnRefs = await getAllDocumentsPathUnder(docRef);
            refs.push(returnRefs);
        }
    }

    if(includeSelf) refs.push(documentRef);
    // return new Promise(res=>{
    //     res(refs.flat());
    // })
    return refs.flat();
}

module.exports = {
    init:(app)=>{
        adminApp = app,
        firestore = adminApp.firestore();
        return this;
    },
    adminApp: ()=>adminApp,
    firestore: ()=>firestore,
    deleteDocuments,
    getAllDocumentsPathUnder,
}