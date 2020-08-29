import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  DeleteTripArchiveStateReset,
  StartDeleteTripArchive
} from "../redux/tripArchive/tripArchive.actions";

import { 
    selectDeleteTripArchiveError,
    selectDeleteTripArchiveSuccessful
 } from "../redux/tripArchive/tripArchive.selector";

import { Button, Typography, CircularProgress } from "@material-ui/core";
import { makeStyles} from '@material-ui/core/styles';
import style from './FormStyle';
import { useFormik } from 'formik';
import { TripArchive } from "../schema/firestore.schema";
import Cls from 'classnames';

type IProps = {
  tripArchive: TripArchive
  onSuccess?: ()=>void
  onCancel?: ()=>void
}

const ConfirmDeleteForm = (props:IProps) => {
  const {
    tripArchive,
    onSuccess = null,
    onCancel = null,
  } = props;

  const classes = makeStyles(style)();
  const deleteBtnClass = Cls(classes.deleteButton, classes.marginHorizontal);

  const [cancel, setCancel] = React.useState(false);
  const deleteTripArchiveError = useSelector(selectDeleteTripArchiveError);
  const deleteTripArchiveSuccessful = useSelector(selectDeleteTripArchiveSuccessful);
  const dispatch = React.useCallback(useDispatch(),[]);

  React.useEffect(()=>{
    
    return ()=>dispatch(DeleteTripArchiveStateReset());
  },[dispatch]);

  React.useEffect(()=>{
    if(deleteTripArchiveSuccessful && onSuccess) onSuccess();
    if(cancel && onCancel) onCancel(); 
  }, [deleteTripArchiveSuccessful, onSuccess, cancel, onCancel]);
  
  const formik = useFormik({
    initialValues:{
      tripArchiveName: '',
    },
    onSubmit:(_values,{setSubmitting}) => {
      dispatch(StartDeleteTripArchive(tripArchive.id, tripArchive.name));
      setSubmitting(true);
    },
  });

  if(deleteTripArchiveError && formik.isSubmitting) formik.setSubmitting(false);
  if(deleteTripArchiveSuccessful && formik.isSubmitting) formik.setSubmitting(false);

  return(
    <form 
    className={classes.form}
    onSubmit={formik.handleSubmit}
    >
      {deleteTripArchiveError?
      <div className={classes.error}>
        <Typography variant='h6'>{deleteTripArchiveError}</Typography>
      </div>
      :null
      }
      <div className={classes.centerText}>
        <Typography variant='h5'>
            {'Are you sure to delete collection '}
        </Typography>
      </div>
      <div className={classes.centerText}>
        <Typography variant='h5' color='secondary'>{`${tripArchive.name}`}</Typography>
      </div>
      <br />
      {
      formik.isSubmitting?<CircularProgress color='secondary' />:
      <div className={classes.buttonGroup}>
        <Button
        className={classes.marginHorizontal}
        variant="contained"
        color='secondary'
        disabled={formik.isSubmitting}
        onClick={()=>setCancel(true)}
        >
            <Typography variant='h5'>Cancel</Typography>
        </Button>
        <Button
        className={deleteBtnClass}
        variant="contained"
        disabled={formik.isSubmitting}
        type='submit'
        >
            <Typography variant='h5'>Delete</Typography>
        </Button>
      </div>
      }
      </form>

  )
};


export default ConfirmDeleteForm;
