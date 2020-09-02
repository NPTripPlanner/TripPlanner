import { 
    BaseFirestoreRepository,
    // IFireOrmQueryLine,
    // IOrderByParams,
    IEntity,
} from 'fireorm';

import { 
    QuerySnapshot,
    // QueryDocumentSnapshot,
    // WhereFilterOp,
    CollectionReference,
    // Query,
    DocumentSnapshot,
    DocumentReference,
 } from '@google-cloud/firestore';
import { getMetadataStorage } from 'fireorm/lib/src/MetadataStorage';

/**
 * support:
 *  pagination, 
 *  document included its own reference
 */
export default class ImprovedRepository<T extends IEntity> extends BaseFirestoreRepository<T>{

    private collectionRef: CollectionReference;

    constructor(colName: string, collectionPath?: string){
        super(colName,collectionPath);
        const { firestoreRef } = getMetadataStorage();
        if (!firestoreRef) {
            throw new Error('Firestore must be initialized first');
          }
        this.collectionRef = firestoreRef.collection(collectionPath || colName);
    }

    extractFromColSnap = (q: QuerySnapshot): T[] => {
        return q.docs.map(this.extractTFromDocSnap);
    };

    extractFromDocSnap = (doc: DocumentSnapshot): T =>{
        return this.extractTFromDocSnap(doc);
    }

    /**
     * Return collection reference of this repository
     */
    getCollectionReference = (): CollectionReference =>{
      return this.collectionRef;
    }

    /**
     * Return a firebase DocumentReference under collection
     * @param pathOrId 
     */
    getDocumentReference = (pathOrId:string): DocumentReference =>{
      return this.collectionRef.doc(pathOrId);
    }
}