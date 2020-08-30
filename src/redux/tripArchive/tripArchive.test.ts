// import store from "../Store";
import actionType from "./tripArchive.actionType";
import { 
    fetchTripArchives,
    createTripArchive,
    doFetchTripArchives,
} from "./tripArchive.saga";
import { 
    // StartFetchTripArchives,
    // FetchTripArchivesSuccessful,
    // FetchTripArchivesFail,
    StartCreateTripArchive,
    CreateTripArchiveSuccessful,
    CreateTripArchiveFail,
} from './tripArchive.actions';
import { expectSaga, testSaga } from "redux-saga-test-plan";
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import * as api from '../../utils/firebase.utils';
import { TripArchive } from "../../schema/firestore.schema";
import { debounce} from 'redux-saga/effects';

describe("Test trip archive saga", () => {
    afterAll((done)=>{
      done();
    });

    it("start fetch trip archives", async () => {
        // const fakeTripArchives = [
        //     new TripArchive(),
        //     new TripArchive(),
        //     new TripArchive(),
        // ];
        // const fakeFetchResult={
        //     lastDocSnap:{},
        //     results:fakeTripArchives
        // }
        // const user = {
        //     uid:'fake id'
        // }

        testSaga(fetchTripArchives)
        .next()
        .is(debounce(1500, actionType.FETCH_TRIP_ARCHIVES_START, doFetchTripArchives))
        .next()
        .isDone();

        return;

        // return await expectSaga(doFetchTripArchives, StartFetchTripArchives(3, true))
        // .provide([
        //     [matchers.call.fn(api.GetCurrentUser), user],
        //     [matchers.call.fn(api.GetCollectionRef), ],
        //     [matchers.call.fn(api.GetDataByQuery),fakeFetchResult]
        // ])
        // .put(FetchTripArchivesSuccessful(fakeTripArchives, true))
        // .dispatch(StartFetchTripArchives(3, true))
        // .run();
    });

    it("start fetch trip archives error", async () => {
        // const user = {
        //     uid:'fake id'
        // }
        // const fakeError = new Error('error')

        testSaga(fetchTripArchives)
        .next()
        .is(debounce(1500, actionType.FETCH_TRIP_ARCHIVES_START, doFetchTripArchives))
        .next()
        .isDone();
        return;

        // return await expectSaga(doFetchTripArchives, StartFetchTripArchives(3, true))
        // .provide([
        //     [matchers.call.fn(api.GetCurrentUser), user],
        //     [matchers.call.fn(api.SearchTripArchive), throwError(fakeError)]
        // ])
        // .put(FetchTripArchivesFail(fakeError))
        // .dispatch(StartFetchTripArchives(3, true))
        // .run();
    });

    it("create trip archive", () => {
        const fakeTripArchive = new TripArchive()

        const user = {
            uid:'fake id'
        }

        return expectSaga(createTripArchive)
        .provide([
            [matchers.call.fn(api.GetCurrentUser), user],
            [matchers.call.fn(api.CreateTripArchive),fakeTripArchive]
        ])
        .put(CreateTripArchiveSuccessful(fakeTripArchive))
        .dispatch(StartCreateTripArchive('new trip archive'))
        .run();
    });

    it("create trip archive error", () => {
        const user = {
            uid:'fake id'
        }

        const fakeError = new Error('error')
        
        return expectSaga(createTripArchive)
        .provide([
            [matchers.call.fn(api.GetCurrentUser), user],
            [matchers.call.fn(api.CreateTripArchive), throwError(fakeError)]
        ])
        .put(CreateTripArchiveFail(fakeError))
        .dispatch(StartCreateTripArchive('new trip archive'))
        .run();
    });
});