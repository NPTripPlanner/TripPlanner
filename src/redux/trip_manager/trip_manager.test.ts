// import store from "../Store";
import { fetchTripArchives } from "./trip_manager.saga";
import { 
    StartFetchTripArchives,
    FetchTripArchivesSuccessful,
    FetchTripArchivesFail,
} from './trip_manager.actions';
import { expectSaga } from "redux-saga-test-plan";
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import * as api from '../../utils/firebase.utils';
import { TripArchive } from "../../schema/firestore.schema";

describe("Test trip archive saga", () => {
    afterAll((done)=>{
      done();
    });

    it("start fetch trip archives", () => {
        const fakeTripArchives = [
            new TripArchive(),
            new TripArchive(),
            new TripArchive(),
        ];
        const fakeFetchResult={
            lastDocSnap:{},
            results:fakeTripArchives
        }
        const user = {
            uid:'fake id'
        }
        
        return expectSaga(fetchTripArchives)
        .provide([
            [matchers.call.fn(api.GetCurrentUser), user],
            [matchers.call.fn(api.FetchTripArchiveAfter),fakeFetchResult]
        ])
        .put(FetchTripArchivesSuccessful(fakeTripArchives, true))
        .dispatch(StartFetchTripArchives(3, true))
        .run();
    });

    it("start fetch trip archives error", () => {
        const user = {
            uid:'fake id'
        }
        const fakeError = new Error('error')
        
        return expectSaga(fetchTripArchives)
        .provide([
            [matchers.call.fn(api.GetCurrentUser), user],
            [matchers.call.fn(api.FetchTripArchiveAfter), throwError(fakeError)]
        ])
        .put(FetchTripArchivesFail(fakeError))
        .dispatch(StartFetchTripArchives(3, true))
        .run();
    });
});