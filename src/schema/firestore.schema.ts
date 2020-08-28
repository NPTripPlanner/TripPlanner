import { 
    Collection,
    CustomRepository,
} from 'fireorm';
import ImprovedRepository from './ImprovedRepository';

// export class Metadata {
//     createAt : Date;
//     modifyAt : Date;
// }

@Collection('tripArchive')
export class TripArchive {
    id: string;
    createAt : Date;
    modifyAt : Date;
    ownerId: string;
    name: string;
    tags: Array<string>;
}


@CustomRepository(TripArchive)
export class TripArchiveRepository extends ImprovedRepository<TripArchive>{}