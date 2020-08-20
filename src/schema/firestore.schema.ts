import { 
    Collection,
    CustomRepository,
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
 } from '@google-cloud/firestore';
import { getMetadataStorage } from 'fireorm/lib/src/MetadataStorage';


export type Metadata = {
    createAt : Date;
    modifyAt : Date;
}

@Collection('tripArchive')
export class TripArchive {
    id: string;
    metadata: Metadata;
    ownerId: string;
    name: string;
}

/**
 * support pagination 
 */
export class ImprovedRepository<T extends IEntity> extends BaseFirestoreRepository<T>{

    startAfterSnap: QueryDocumentSnapshot|null;
    lastDocSnap: QueryDocumentSnapshot;
    collectionRef: CollectionReference;

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

@CustomRepository(TripArchive)
export class TripArchiveRepository extends ImprovedRepository<TripArchive>{}
