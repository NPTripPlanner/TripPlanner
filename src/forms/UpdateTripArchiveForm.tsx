import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import { 
    StartUpdateTripArchiveName, UpdateTripArchiveNameStateReset,
  } from "../redux/tripArchive/tripArchive.actions";
  
  import { 
      selectUpdateTripArchiveSuccessful,
      selectUpdateTripArchiveError
   } from "../redux/tripArchive/tripArchive.selector";

import { Button, Typography, CircularProgress } from "@material-ui/core";
import { makeStyles} from '@material-ui/core/styles';
import style from './FormStyle';
import { useFormik } from 'formik';
import InputField from '../components/InputField/InputField';
import * as Yup from 'yup';
import { TripArchive } from '../schema/firestore.schema';

type IProps = {
    tripArchive: TripArchive
    onSuccess?: ()=>void
  }

const UpdateTripArchiveForm = (props:IProps) => {
    const {
        tripArchive,
        onSuccess = null,
    } = props;

    const classes = makeStyles(style)();
    const updateTripArchiveError = useSelector(selectUpdateTripArchiveError);
    const updateTripArchiveSuccessful = useSelector(selectUpdateTripArchiveSuccessful);
    const dispatch = React.useCallback(useDispatch(),[]);

    React.useEffect(()=>{
    
        return ()=>dispatch(UpdateTripArchiveNameStateReset());
    },[dispatch]);

    React.useEffect(()=>{
        if(updateTripArchiveSuccessful && onSuccess) onSuccess();
    }, [updateTripArchiveSuccessful, onSuccess]);

    const validation = ()=>(Yup.object({
        tripArchiveNewName: Yup.string()
        .required('Required'),
    }))
      
    const formik = useFormik({
        initialValues:{
            tripArchiveNewName: tripArchive.name,
        },
        validationSchema: validation,
        onSubmit:(values,{setSubmitting}) => {
          dispatch(StartUpdateTripArchiveName(
              tripArchive.id,
              values.tripArchiveNewName,
              tripArchive.name
              )
            );
          setSubmitting(true);
        },
    });

    if(updateTripArchiveError && formik.isSubmitting) formik.setSubmitting(false);
    if(updateTripArchiveSuccessful && formik.isSubmitting) formik.setSubmitting(false);

    return (
        <form 
        className={classes.form}
        onSubmit={formik.handleSubmit}
        >
          {updateTripArchiveError?
          <div className={classes.error}>
            <Typography variant='h6'>{updateTripArchiveError}</Typography>
          </div>
          :null
          }
          <InputField
          id="tripArchiveNewName"
          name="tripArchiveNewName"
          type="text" 
          labelText='New name'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          defaultValue={formik.values.tripArchiveNewName}
          errorText={formik.touched.tripArchiveNewName && formik.errors.tripArchiveNewName?
            formik.errors.tripArchiveNewName:null}
          />
          {
          formik.isSubmitting?<CircularProgress color='secondary' />:
          <Button
            variant="contained"
            color="secondary"
            disabled={formik.isSubmitting}
            type='submit'
          >
            <Typography variant='h5'>Change</Typography>
          </Button>
          }
        </form>
    );
};

export default UpdateTripArchiveForm;