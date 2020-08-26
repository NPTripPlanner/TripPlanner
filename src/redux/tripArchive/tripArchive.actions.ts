import actionType from "./tripArchive.actionType";
import {action} from 'typesafe-actions';

/**
 * Start to fetch trip archives
 * @param {*} amount how many to fetch
 * @param {*} fromStart true start all over false to fetch next amout default true
 */
export const StartFetchTripArchives = (amount=10, fromStart=true) =>action(
  actionType.FETCH_TRIP_ARCHIVES_START,
  {amount, fromStart},
);

export const FetchTripArchivesSuccessful = (tripArchiveData, fromStart) =>action(
  actionType.FETCH_TRIP_ARCHIVES_SUCCESSFUL,
  {tripArchiveData, fromStart},
);

export const FetchTripArchivesFail = (error)=>action(
  actionType.FETCH_TRIP_ARCHIVES_FAIL,
  {error},
);

export const StartCreateTripArchive = (tripArchiveName) =>action(
  actionType.CREATE_TRIP_ARCHIVE_START,
  {tripArchiveName},
);

export const CreateTripArchiveSuccessful = (tripArchive) =>action(
  actionType.CREATE_TRIP_ARCHIVE_SUCCESSFUL,
  {tripArchive},
);


export const CreateTripArchiveFail = (error) =>action(
  actionType.CREATE_TRIP_ARCHIVE_FAIL,
  {error},
);

export const CreateTripArchiveReset = () =>action(
  actionType.CREATE_TRIP_ARCHIVE_RESET,
)
