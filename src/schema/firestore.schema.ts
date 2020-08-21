import { 
    Collection,
    CustomRepository,
} from 'fireorm';
import ImprovedRepository from './ImprovedRepository';
import { DocumentReference } from '@google-cloud/firestore';


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


@CustomRepository(TripArchive)
export class TripArchiveRepository extends ImprovedRepository<TripArchive>{}
