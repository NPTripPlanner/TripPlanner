import { 
    Collection,
    CustomRepository,
    SubCollection,
    ISubCollection,
} from 'fireorm';
import ImprovedRepository from './ImprovedRepository';

export class Itineraries{
    id: string;
    createAt: Date;
    modifyAt: Date;
    name:string;
    startDateUTC: Date;
    endDateUTC: Date;
    totalDays: number;
    tripArchiveId: string;
}

@Collection('tripArchive')
export class TripArchive {
    id: string;
    createAt: Date;
    modifyAt: Date;
    ownerId: string;
    name: string;
    tags: Array<string>;

    @SubCollection(Itineraries, 'itineraries')
    itineraries?:ISubCollection<Itineraries>
}


@CustomRepository(TripArchive)
export class TripArchiveRepository extends ImprovedRepository<TripArchive>{}