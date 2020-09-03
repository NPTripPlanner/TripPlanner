import actionType from "./tripArchive.actionType";
import {action} from 'typesafe-actions';

/**
 * Start to fetch trip archives
 * @param {*} amount how many to fetch
 * @param {*} fromStart true fetch from begining of index otherwise from last default true
 * @param {*} keyword if provided return data wiil match keyword
 */
export const StartFetchTripArchives = (amount=10, fromStart=true, keyword='') =>action(
  actionType.FETCH_TRIP_ARCHIVES_START,
  {amount, fromStart, keyword},
);

export const StartFetchMoreTripArchives = (amount=10) =>action(
  actionType.FETCH_MORE_TRIP_ARCHIVES_START,
  {amount, fromStart:false, keyword:null},
);

export const StartCreateTripArchive = (tripArchiveName) =>action(
  actionType.CREATE_TRIP_ARCHIVE_START,
  {tripArchiveName},
);

export const CreateTripArchiveStateReset = () =>action(
  actionType.CREATE_TRIP_ARCHIVE_STATE_RESET,
)

export const StartDeleteTripArchive = (tripArchiveId, tripArchiveName) =>action(
  actionType.DELETE_TRIP_ARCHIVE_START,
  {tripArchiveId, tripArchiveName},
);

export const DeleteTripArchiveStateReset = () =>action(
  actionType.DELETE_TRIP_ARCHIVE_STATE_RESET,
)

export const StartUpdateTripArchiveName = (tripArchiveId, newName, oldName) =>action(
  actionType.UPDATE_TRIP_ARCHIVE_NAME_START,
  {tripArchiveId, newName, oldName},
);

export const UpdateTripArchiveNameStateReset = () =>action(
  actionType.UPDATE_TRIP_ARCHIVE_NAME_STATE_RESET,
)

export const ClearTripArchiveStart = ()=>action(
  actionType.CLEAR_ALL_TRIP_ARCHIVE_STATE,
)
