import { 
    Collection,
    CustomRepository,
} from 'fireorm';
import ImprovedRepository from './ImprovedRepository';
import { firestore } from 'firebase';
import * as transformer from 'class-transformer';
import { ClassType } from "class-transformer/ClassTransformer";

export const ConvertFirestoreObjToClass = <T>(object, classType:ClassType<T>): T=>{
    const cls = transformer.plainToClass(classType, object) as T;
    return cls as T;
}

export class Metadata {
    createAt : Date;
    modifyAt : Date;

    static tranformMetadata(obj:{}){
        Object.keys(obj).forEach(key=>{
            if(!obj[key]) return;
            const seconds = obj[key]._seconds;
            const nanoseconds = obj[key]._nanoseconds;
            const timestamp = new firestore.Timestamp(seconds, nanoseconds);
            const date = timestamp.toDate();
            obj[key] = date;
        })
        return obj;
    }
}

@Collection('tripArchive')
export class TripArchive {
    id: string;
    metadata: Metadata;
    ownerId: string;
    name: string;

    static transformTripArchive(obj:{}): TripArchive{
        Object.keys(obj).forEach(key=>{
            if(!obj[key]) return;
            if(key === 'metadata'){
                Metadata.tranformMetadata(obj[key]);
            }
        })
        return ConvertFirestoreObjToClass(obj, TripArchive);
    }
}


@CustomRepository(TripArchive)
export class TripArchiveRepository extends ImprovedRepository<TripArchive>{}