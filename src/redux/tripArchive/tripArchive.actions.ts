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

export const CreateTripArchiveStateReset = () =>action(
  actionType.CREATE_TRIP_ARCHIVE_STATE_RESET,
)

export const CreateTripArchiveResetSuccessful = () =>action(
  actionType.CREATE_TRIP_ARCHIVE_RESET_SUCCESSFUL,
)

export const StartDeleteTripArchive = (tripArchiveId, tripArchiveName) =>action(
  actionType.DELETE_TRIP_ARCHIVE_START,
  {tripArchiveId, tripArchiveName},
);

export const DeleteTripArchiveFail = (error) =>action(
  actionType.DELETE_TRIP_ARCHIVE_FAIL,
  {error},
);

export const DeleteTripArchiveSuccessful = (tripArchiveId) =>action(
  actionType.DELETE_TRIP_ARCHIVE_SUCCESSFUL,
  {tripArchiveId},
);

export const DeleteTripArchiveStateReset = () =>action(
  actionType.DELETE_TRIP_ARCHIVE_STATE_RESET,
)

export const DeleteTripArchiveResetSuccessful = () =>action(
  actionType.DELETE_TRIP_ARCHIVE_RESET_SUCCESSFUL,
)

export const StartUpdateTripArchiveName = (tripArchiveId, newName, oldName) =>action(
  actionType.UPDATE_TRIP_ARCHIVE_NAME_START,
  {tripArchiveId, newName, oldName},
);

export const UpdateTripArchiveNameFail = (error) =>action(
  actionType.UPDATE_TRIP_ARCHIVE_NAME_FAIL,
  {error},
);

export const UpdateTripArchiveNameSuccessful = (tripArchive) =>action(
  actionType.UPDATE_TRIP_ARCHIVE_NAME_SUCCESSFUL,
  {tripArchive},
);

export const UpdateTripArchiveNameStateReset = () =>action(
  actionType.UPDATE_TRIP_ARCHIVE_NAME_STATE_RESET,
)

export const UpdateTripArchiveNameStateResetSuccessful = () =>action(
  actionType.UPDATE_TRIP_ARCHIVE_NAME_STATE_RESET_SUCCESSFUL,
)

export const ClearTripArchiveStart = ()=>action(
  actionType.CLEAR_TRIP_ARCHIVE_START,
)

export const ClearTripArchiveSuccessful = ()=>action(
  actionType.CLEAR_TRIP_ARCHIVE_SUCCESSFUL,
)