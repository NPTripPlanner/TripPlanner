// import store from "../Store";
import { fetchTripArchives } from "./trip_manager.saga";
import { 
    StartFetchTripArchives,
    FetchTripArchivesSuccessful,
} from './trip_manager.actions';
import { expectSaga } from "redux-saga-test-plan";
import * as matchers from 'redux-saga-test-plan/matchers';
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

});