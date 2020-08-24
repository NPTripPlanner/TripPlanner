import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SendForgotPassMailStart, SendForgotPassMailReset } from "../redux/user/user.actions";
import {
  selectSendForgotPassMailSuccess,
  selectSendForgotPassMailFail,
} from "../redux/user/user.selector";

import { Button, Typography, CircularProgress } from "@material-ui/core";
import { makeStyles} from '@material-ui/core/styles';
import style from './FormStyle';
import { Email } from '@material-ui/icons';
import { useFormik } from 'formik';
import InputField from '../components/InputField/InputField';
import * as Yup from 'yup';

const ForgotPasswordForm = () => {
  const classes = makeStyles(style)();
  const sentMailSuccess = useSelector(selectSendForgotPassMailSuccess);
  const sentMailError = useSelector(selectSendForgotPassMailFail);
  const dispatch = React.useCallback(useDispatch(),[]);

  React.useEffect(()=>{
    return ()=>dispatch(SendForgotPassMailReset());
  },[dispatch]);

  const validation = ()=>(Yup.object({
    email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  }))

  const formik = useFormik({
    initialValues:{
      email: '',
    },
    validationSchema: validation,
    onSubmit:(values,{setSubmitting}) => {
      dispatch(SendForgotPassMailStart(values.email));
      setSubmitting(true);
    },
  });

  if(sentMailError && formik.isSubmitting) formik.setSubmitting(false);

  if(sentMailSuccess) return (
    <div>
      <Typography variant='h6'>{'Check your mail box for email to reset your password'}</Typography>
    </div>
  )

  return(
    <form 
    className={classes.form}
    onSubmit={formik.handleSubmit}
    >
      {sentMailError?
      <div className={classes.error}>
        <Typography variant='h6'>{sentMailError}</Typography>
      </div>
      :null
      }
      <InputField
      id="email"
      name="email"
      type="text" 
      labelText='Email'
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      disabled={formik.isSubmitting}
      defaultValue={formik.values.email}
      endAdornment={<Email />}
      errorText={formik.touched.email && formik.errors.email?formik.errors.email:null}
      />
      {
      formik.isSubmitting?<CircularProgress color='secondary' />:
      <Button
        variant="contained"
        color="secondary"
        disabled={formik.isSubmitting}
        type='submit'
      >
        <Typography variant='h5'>Send</Typography>
      </Button>
      }
      </form>

  )
};

export default ForgotPasswordForm;
