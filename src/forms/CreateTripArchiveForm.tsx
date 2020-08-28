import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  StartCreateTripArchive,
  CreateTripArchiveStateReset 
} from "../redux/tripArchive/tripArchive.actions";

import { 
    selectCreatingTripArchiveError,
    selectCreateTripArchiveSuccessful
 } from "../redux/tripArchive/tripArchive.selector";

import { Button, Typography, CircularProgress } from "@material-ui/core";
import { makeStyles} from '@material-ui/core/styles';
import style from './FormStyle';
import { useFormik } from 'formik';
import InputField from '../components/InputField/InputField';
import * as Yup from 'yup';

type IProps = {
  onSuccess?: ()=>void
}
const CreateTripArchiveForm = (props:IProps) => {
  const {
    onSuccess = null,
  } = props;

  const classes = makeStyles(style)();
  const createTripArchiveError = useSelector(selectCreatingTripArchiveError);
  const createTripArchiveSuccessful = useSelector(selectCreateTripArchiveSuccessful);
  const dispatch = React.useCallback(useDispatch(),[]);

  React.useEffect(()=>{
    
    return ()=>dispatch(CreateTripArchiveStateReset());
  },[dispatch]);

  React.useEffect(()=>{
    if(createTripArchiveSuccessful && onSuccess) onSuccess();
  }, [createTripArchiveSuccessful, onSuccess]);

  const validation = ()=>(Yup.object({
    tripArchiveName: Yup.string()
    .required('Required'),
  }))
  
  const formik = useFormik({
    initialValues:{
      tripArchiveName: '',
    },
    validationSchema: validation,
    onSubmit:(values,{setSubmitting}) => {
      dispatch(StartCreateTripArchive(values.tripArchiveName));
      setSubmitting(true);
    },
  });

  if(createTripArchiveError && formik.isSubmitting) formik.setSubmitting(false);
  if(createTripArchiveSuccessful && formik.isSubmitting) formik.setSubmitting(false);

  return(
    <form 
    className={classes.form}
    onSubmit={formik.handleSubmit}
    >
      {createTripArchiveError?
      <div className={classes.error}>
        <Typography variant='h6'>{createTripArchiveError}</Typography>
      </div>
      :null
      }
      <InputField
      id="tripArchiveName"
      name="tripArchiveName"
      type="text" 
      labelText='Name'
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      disabled={formik.isSubmitting}
      defaultValue={formik.values.tripArchiveName}
      errorText={formik.touched.tripArchiveName && formik.errors.tripArchiveName?formik.errors.tripArchiveName:null}
      />
      {
      formik.isSubmitting?<CircularProgress color='secondary' />:
      <Button
        variant="contained"
        color="secondary"
        disabled={formik.isSubmitting}
        type='submit'
      >
        <Typography variant='h5'>Create</Typography>
      </Button>
      }
      </form>

  )
};


export default CreateTripArchiveForm;