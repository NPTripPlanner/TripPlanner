import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StartCreateTripArchive } from "../redux/trip_manager/trip_manager.actions";

import TPForm from "../components/TPForm/TPForm";
import TPSpinner from "../components/TPSpinner/TPSpinner";

import { 
    selectCreatingTripArchive,
    selectCreatingTripArchiveError
 } from "../redux/trip_manager/trip_manager.selector";

import { creatTripArchiveFormData, creatTripArchiveFormFields } from "./FormData";

import { Button, Typography } from "@material-ui/core";

const CreateTripArchiveForm = () => {
  const [sent, setSent] = React.useState(false);
  const [emptyName, setEmptyName] = React.useState(null);
  const [data, setData] = React.useState(creatTripArchiveFormData);
  const creatingTripArchive = useSelector(selectCreatingTripArchive);
  const createTripArchiveError = useSelector(selectCreatingTripArchiveError);
  const dispatch = useDispatch();

  const handleFormSubmit = (data) => {
    setSent(true);
    dispatch(StartCreateTripArchive(data.tripArchiveName));
  };

  const handleDataChanged = (_, nData) => {
    setData(nData);
    if (nData.tripArchiveName) {
      setEmptyName(null)
    } else {
        setEmptyName('Name is required');
    }
  };
  if (!creatingTripArchive && !createTripArchiveError && sent){
    return (
        <div>
          <Typography variant="h6">
            Trip Archive created successful
          </Typography>
        </div>
    );
  }
  else if ((createTripArchiveError||emptyName) && sent) setSent(false);

  return (
    <TPSpinner spinTitle="Creating ..." isLoading={sent}>
      <TPForm
        error={createTripArchiveError || emptyName}
        errorFields={emptyName ? ["tripArchiveName"] : null}
        formData={data}
        formFields={creatTripArchiveFormFields}
        submitButton={
          <Button variant="contained" color="secondary">
            <Typography variant="h6">Create</Typography>
          </Button>
        }
        onSubmit={handleFormSubmit}
        onFormDataChanged={handleDataChanged}
      />
    </TPSpinner>
  );
};

export default CreateTripArchiveForm;
