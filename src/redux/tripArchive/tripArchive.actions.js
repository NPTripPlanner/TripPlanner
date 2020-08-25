import actionType from "./tripArchive.actionType";

/**
 * Start to fetch trip archives
 * @param {*} amount how many to fetch
 * @param {*} fromStart true start all over false to fetch next amout default true
 */
export const StartFetchTripArchives = (amount=10, fromStart=true) =>({
  type: actionType.FETCH_TRIP_ARCHIVES_START,
  payload: {amount, fromStart},
});

export const FetchTripArchivesSuccessful = (tripArchiveData, fromStart) =>({
  type: actionType.FETCH_TRIP_ARCHIVES_SUCCESSFUL,
  payload: {tripArchiveData, fromStart},
});

export const FetchTripArchivesFail = (error)=>({
  type: actionType.FETCH_TRIP_ARCHIVES_FAIL,
  payload: {error},
});

export const StartCreateTripArchive = (tripArchiveName) =>({
  type: actionType.CREATE_TRIP_ARCHIVE_START,
  payload: {tripArchiveName},
});

export const CreateTripArchiveSuccessful = (tripArchive) =>({
  type: actionType.CREATE_TRIP_ARCHIVE_SUCCESSFUL,
  payload: {tripArchive},
});

export const CreateTripArchiveFail = (error) =>({
  type: actionType.CREATE_TRIP_ARCHIVE_FAIL,
  payload: {error},
});

export const CreateTripArchiveReset = () =>({
  type: actionType.CREATE_TRIP_ARCHIVE_RESET,
})
