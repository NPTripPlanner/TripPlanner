import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { LoginStart, ClearLoginError } from "../redux/user/user.actions";

// import TPForm from "../components/TPForm/TPForm";
// import TPSpinner from "../components/TPSpinner/TPSpinner";

import { selectLoginFail } from "../redux/user/user.selector";

// import { loginFormData, loginFormFields } from "./FormData";

import { Button, Typography, CircularProgress } from "@material-ui/core";
import { makeStyles} from '@material-ui/core/styles';
import style from './FormStyle';
import {Lock, Email} from '@material-ui/icons';
import { useFormik } from 'formik';
import InputField from '../components/InputField/InputField';
import * as Yup from 'yup';


const LoginForm = () => {
 
  const classes = makeStyles(style)();

  const loginError = useSelector(selectLoginFail);
  const dispatch = React.useCallback(useDispatch(),[]);

  React.useEffect(()=>{
    return ()=>dispatch(ClearLoginError());
  },[dispatch]);

  const validation = ()=>(Yup.object({
    email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
    password: Yup.string()
    .min(6, 'At least 6 combination of letter, number or symbol')
    .required('Required')
  }))

  const formik = useFormik({
    initialValues:{
      email: '',
      password: '',
    },
    validationSchema: validation,
    onSubmit:(values,{setSubmitting}) => {
      dispatch(LoginStart(values.email, values.password));
      setSubmitting(true);
    },
  });

  if(loginError && formik.isSubmitting) formik.setSubmitting(false);

  return(
    <form 
    className={classes.form}
    onSubmit={formik.handleSubmit}
    >
      {loginError?
      <div className={classes.error}>
        <Typography variant='h6'>{loginError}</Typography>
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
      <InputField 
      id="password"
      name="password"
      type="password" 
      labelText='Password'
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      disabled={formik.isSubmitting}
      defaultValue={formik.values.password}
      endAdornment={<Lock />}
      errorText={formik.touched.password && formik.errors.password?formik.errors.password:null}
      />
      {
      formik.isSubmitting?<CircularProgress color='secondary' />:
      <Button
        variant="contained"
        color="secondary"
        disabled={formik.isSubmitting}
        type='submit'
      >
        <Typography variant='h5'>Login</Typography>
      </Button>
      }
      </form>

  )
};

export default LoginForm;
