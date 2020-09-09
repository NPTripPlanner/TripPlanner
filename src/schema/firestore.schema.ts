import { 
    Collection,
    CustomRepository,
    SubCollection,
    ISubCollection,
} from 'fireorm';
import ImprovedRepository from './ImprovedRepository';

export class Schedule{
    id: string;
    createAt: Date;
    modifyAt: Date;
    date: Date;
    note: string;
}

@Collection('itineraries')
export class Itinerary{
    id: string;
    createAt: Date;
    modifyAt: Date;
    name:string;
    startDateUTC: Date;
    endDateUTC: Date;
    totalDays: number;
    tripArchiveId: string;

    @SubCollection(Schedule, 'schedules')
    schedules?:ISubCollection<Schedule>;
}

@Collection('tripArchive')
export class TripArchive {
    id: string;
    createAt: Date;
    modifyAt: Date;
    ownerId: string;
    name: string;
    tags: Array<string>;

    @SubCollection(Itinerary, 'itineraries')
    itineraries?:ISubCollection<Itinerary>;
}


@CustomRepository(TripArchive)
export class TripArchiveRepository extends ImprovedRepository<TripArchive>{}

@CustomRepository(Itinerary)
export class ItineraryRepository extends ImprovedRepository<Itinerary>{}

@CustomRepository(Schedule)
export class ScheduleRepository extends ImprovedRepository<Schedule>{}

