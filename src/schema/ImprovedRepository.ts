import { 
    BaseFirestoreRepository,
    IFireOrmQueryLine,
    IOrderByParams,
    IEntity,
} from 'fireorm';

import { 
    QuerySnapshot,
    QueryDocumentSnapshot,
    WhereFilterOp,
    CollectionReference,
    Query,
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

    private startAfterSnap: QueryDocumentSnapshot|null;
    private lastDocSnap: QueryDocumentSnapshot;
    private collectionRef: CollectionReference;

    constructor(colName: string, collectionPath?: string){
        super(colName,collectionPath);
        const { firestoreRef } = getMetadataStorage();
        if (!firestoreRef) {
            throw new Error('Firestore must be initialized first');
          }
        this.collectionRef = firestoreRef.collection(collectionPath || colName);
    }


    protected extractTFromColSnap = (q: QuerySnapshot): T[] => {
        this.lastDocSnap = q.docs[q.docs.length - 1];
        return q.docs.map(this.extractTFromDocSnap);
    };

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
     * Qery start after document snapshot
     * @param docSnapshot document snapshot or null to query from start
     */
    qeryAfterSnap = (docSnapshot:QueryDocumentSnapshot): void =>{
      this.startAfterSnap = docSnapshot
    }

    /**
     * Get last qery document snapshot
     */
    getLastDocQuerySnap = (): QueryDocumentSnapshot =>{
      return this.lastDocSnap;
    }

    /**
     * Return a firebase DocumentReference under collection
     * @param pathOrId 
     */
    getDocumentReference = (pathOrId:string): DocumentReference =>{
      return this.collectionRef.doc(pathOrId);
    }

    async execute(
        queries: Array<IFireOrmQueryLine>,
        limitVal?: number,
        orderByObj?: IOrderByParams,
        single?: boolean
      ): Promise<T[]> {

        let query = queries.reduce((acc:CollectionReference|Query, cur:IFireOrmQueryLine) => {
          const op = cur.operator as WhereFilterOp;
          return acc.where(cur.prop, op, cur.val);
        }, this.collectionRef);
    
        if (orderByObj) {
          query = query.orderBy(orderByObj.fieldPath, orderByObj.directionStr);
        }

        if(this.startAfterSnap) {
            query = query.startAfter(this.startAfterSnap);
        }
    
        if (single) {
          query = query.limit(1);
        } else if (limitVal) {
          query = query.limit(limitVal);
        }
    
        return query.get().then(this.extractTFromColSnap);
      }
}