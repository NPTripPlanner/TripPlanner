import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { selectCreateItineraryError, selectCreateItinerarySuccessful } from "../redux/itinerary/itinerary.selector";
import { CreateItineraryStateReset } from "../redux/itinerary/itinerary.actions";
import style from './FormStyle';
import { useFormik } from 'formik';
import InputField from '../components/InputField/InputField';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import * as Yup from 'yup';
import { Typography, CircularProgress, Button } from "@material-ui/core";
import { getDate, totalDays } from "../utils/datetime.utils";

type IProps = {
    onSuccess?: ()=>void
}

const renderDuration = (from:Date, to:Date)=>{
    const days = totalDays(from, to);
    if(days>0) return (<div><Typography>{`${days} Days`}</Typography></div>);
    return null; 
}
const CreateItineraryForm = (props:IProps) => {
    const {
        onSuccess = null,
    } = props;

    const classes = makeStyles(style)();
    const createItineraryError = useSelector(selectCreateItineraryError);
    const createItinerarySuccessful = useSelector(selectCreateItinerarySuccessful);
    const dispatch = React.useCallback(useDispatch(),[]);
    const dateFormat = 'MMM-DD-YYYY';

    React.useEffect(()=>{
        return ()=>dispatch(CreateItineraryStateReset());
    },[dispatch]);

    React.useEffect(()=>{
        if(createItinerarySuccessful && onSuccess) onSuccess();
    }, [createItinerarySuccessful, onSuccess]);

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
            console.log(days);
            return days>0?true:false;
        })
        .required('Required'),
    }))

    const formik = useFormik({
        initialValues:{
        itineraryName: '',
        startDate: getDate().toDate(),
        endDate: getDate(null, 2).toDate(),
        },
        validationSchema: validation,
        onSubmit:(_values,{setSubmitting}) => {
        // dispatch(StartCreateItinerary(values.tripArchiveName));
        setSubmitting(false);
        },
    });

    if(createItineraryError && formik.isSubmitting) formik.setSubmitting(false);
    if(createItinerarySuccessful && formik.isSubmitting) formik.setSubmitting(false);

    console.log(formik.touched.endDate ,formik.errors);

    return(
        <form 
        className={classes.form}
        onSubmit={formik.handleSubmit}
        >
        {createItineraryError?
        <div className={classes.error}>
            <Typography variant='h6'>{createItineraryError}</Typography>
        </div>
        :null
        }
        <InputField
        id="itineraryName"
        name="itineraryName"
        type="text" 
        labelText='Name'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={formik.isSubmitting}
        defaultValue={formik.values.itineraryName}
        errorText={formik.touched.itineraryName && formik.errors.itineraryName?formik.errors.itineraryName:null}
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
            formik.setFieldValue('startDate', date, true);
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
            formik.setFieldValue('endDate', date, true);
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
            <Typography variant='h5'>Create</Typography>
        </Button>
        }
        </form>

    )
};

export default CreateItineraryForm;