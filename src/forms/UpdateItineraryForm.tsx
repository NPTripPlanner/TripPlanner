import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import { Button, Typography, CircularProgress } from "@material-ui/core";
import { makeStyles} from '@material-ui/core/styles';
import style from './FormStyle';
import { useFormik } from 'formik';
import InputField from '../components/InputField/InputField';
import * as Yup from 'yup';
import { Itinerary } from '../schema/firestore.schema';
import { selectUpdateItineraryError, selectUpdateItinerarySuccessful } from '../redux/itinerary/itinerary.selector';
import { totalDays, getLocalDateFromUTC, getDateBaseOn } from '../utils/datetime.utils';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import { StartUpdateItinerary, UpdateItineraryStateReset } from '../redux/itinerary/itinerary.actions';

type IProps = {
    itinerary: Itinerary
    onSuccess: ()=>void
  }

const renderDuration = (from:Date, to:Date)=>{
    const days = totalDays(from, to);
    if(days>0) return (<div><Typography>{`${days} Days`}</Typography></div>);
    return null; 
}
const UpdateItineraryForm = (props:IProps) => {
    const {
        itinerary,
        onSuccess = null,
    } = props;

    const classes = makeStyles(style)();
    const updateItineraryError = useSelector(selectUpdateItineraryError);
    const updateItinerarySuccessful = useSelector(selectUpdateItinerarySuccessful);
    const dispatch = React.useCallback(useDispatch(),[]);
    const dateFormat = 'MMM-DD-YYYY';

    React.useEffect(()=>{
    
        return ()=>dispatch(UpdateItineraryStateReset());
    },[dispatch]);

    React.useEffect(()=>{
        if(updateItinerarySuccessful && onSuccess) onSuccess();
    }, [updateItinerarySuccessful, onSuccess]);

    const validation = ()=>(Yup.object({
        itineraryName: Yup.string()
        .required('Required'),
        startDate: Yup.date()
        .required('Required'),
        endDate: Yup.date()
        .test('validate-date', 'Must after start', function(value){
            const start:Date = this.parent['startDate'];
            const end:Date = value;
            const days = totalDays(start, end);
            return days>0?true:false;
        })
        .required('Required'),
    }))
      
    const formik = useFormik({
        initialValues:{
            itineraryName: itinerary.name,
            startDate: getLocalDateFromUTC(itinerary.startDateUTC),
            endDate: getLocalDateFromUTC(itinerary.endDateUTC),
        },
        validationSchema: validation,
        onSubmit:(values,{setSubmitting}) => {
            dispatch(StartUpdateItinerary(itinerary.id, values.itineraryName,
                 values.startDate, values.endDate
            ));
            setSubmitting(true);
        },
    });

    if(updateItineraryError && formik.isSubmitting) formik.setSubmitting(false);
    if(updateItinerarySuccessful && formik.isSubmitting) formik.setSubmitting(false);

    return (
        <form 
        className={classes.form}
        onSubmit={formik.handleSubmit}
        >
          {updateItineraryError?
          <div className={classes.error}>
            <Typography variant='h6'>{updateItineraryError}</Typography>
          </div>
          :null
          }
          <InputField
          id="itineraryName"
          name="itineraryName"
          type="text" 
          labelText='New name'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          defaultValue={formik.values.itineraryName}
          errorText={formik.touched.itineraryName && formik.errors.itineraryName?
            formik.errors.itineraryName:null}
          />
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
            id="startDate"
            name="startDate"
            disablePast
            autoOk
            label='Start'
            value={formik.values.startDate}
            onChange={date =>{
                formik.setFieldTouched('startDate', true);
                formik.setFieldValue('startDate', date.toDate(), true);
                if(totalDays(date.toDate(), formik.values.endDate)<=0){
                  const fixedEndDate= getDateBaseOn(date.toDate(), 1);
                  formik.setFieldValue('endDate', fixedEndDate, true);
                }
            }}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            minDate={new Date()}
            format={dateFormat}
            helperText={formik.touched.startDate && formik.errors.startDate?formik.errors.startDate:null}
            error={formik.touched.startDate && formik.errors.startDate?true:false}
            />
            <br />
            <KeyboardDatePicker
            id="endDate"
            name="endDate"
            disablePast
            autoOk
            label='End'
            value={formik.values.endDate}
            onChange={date =>{
                formik.setFieldTouched('endDate', true);
                formik.setFieldValue('endDate', date.toDate(), true);
            }}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            minDate={new Date()}
            format={dateFormat}
            helperText={formik.touched.endDate && formik.errors.endDate?formik.errors.endDate:null}
            error={formik.touched.endDate && formik.errors.endDate?true:false}
            />
            <br />
          </MuiPickersUtilsProvider>
          {renderDuration(formik.values.startDate, formik.values.endDate)}
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

export default UpdateItineraryForm;