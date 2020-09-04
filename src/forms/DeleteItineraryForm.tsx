import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button, Typography, CircularProgress } from "@material-ui/core";
import { makeStyles} from '@material-ui/core/styles';
import style from './FormStyle';
import { useFormik } from 'formik';
import { Itinerary, TripArchive } from "../schema/firestore.schema";
import Cls from 'classnames';
import { selectDeleteItineraryError, selectDeleteItinerarySuccessful, selectUnderTripArchive } from "../redux/itinerary/itinerary.selector";
import { DeleteItineraryStateReset, StartDeleteItinerary } from "../redux/itinerary/itinerary.actions";

type IProps = {
  itinerary: Itinerary;
  onSuccess: ()=>void;
  onCancel: ()=>void;
}

const DeleteItineraryForm = (props:IProps) => {
  const {
    itinerary,
    onSuccess = null,
    onCancel = null,
  } = props;

  const classes = makeStyles(style)();
  const deleteBtnClass = Cls(classes.deleteButton, classes.marginHorizontal);

  const [cancel, setCancel] = React.useState(false);
  const tripArchive:TripArchive = useSelector(selectUnderTripArchive);
  const deleteItineraryError = useSelector(selectDeleteItineraryError);
  const deleteItinerarySuccessful = useSelector(selectDeleteItinerarySuccessful);
  const dispatch = React.useCallback(useDispatch(),[]);

  React.useEffect(()=>{
    
    return ()=>dispatch(DeleteItineraryStateReset());
  },[dispatch]);

  React.useEffect(()=>{
    if(deleteItinerarySuccessful && onSuccess) onSuccess();
    if(cancel && onCancel) onCancel(); 
  }, [deleteItinerarySuccessful, onSuccess, cancel, onCancel]);
  
  const formik = useFormik({
    initialValues:{
      tripArchiveName: '',
    },
    onSubmit:(_values,{setSubmitting}) => {
      dispatch(StartDeleteItinerary(tripArchive.id, itinerary.id, itinerary.name));
      setSubmitting(true);
    },
  });

  if(deleteItineraryError && formik.isSubmitting) formik.setSubmitting(false);
  if(deleteItinerarySuccessful && formik.isSubmitting) formik.setSubmitting(false);

  return(
    <form 
    className={classes.form}
    onSubmit={formik.handleSubmit}
    >
      {deleteItineraryError?
      <div className={classes.error}>
        <Typography variant='h6'>{deleteItineraryError}</Typography>
      </div>
      :null
      }
      <div className={classes.centerText}>
        <Typography variant='h5'>
            {'Are you sure to delete itinerary '}
        </Typography>
      </div>
      <div className={classes.centerText}>
        <Typography variant='h5' color='secondary'>{`${itinerary.name}`}</Typography>
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


export default DeleteItineraryForm;
