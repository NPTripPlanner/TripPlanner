import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SignupStart, ClearSignupError } from "../redux/user/user.actions";
import { selectSignupFail } from "../redux/user/user.selector";

import { makeStyles} from '@material-ui/core/styles';
import style from './FormStyle';

import InputField from "../components/InputField/InputField";

import { Button, Typography, CircularProgress } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Email, Lock, Person } from "@material-ui/icons";

const SignupForm = () => {
  const classes = makeStyles(style)();

  const signupError = useSelector(selectSignupFail);
  const dispatch = React.useCallback(useDispatch(),[]);

  React.useEffect(()=>{
    return ()=>dispatch(ClearSignupError());
  },[dispatch]);

  const validation = ()=>(Yup.object({
    email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
    displayName: Yup.string()
    .min(2, 'At least 2 combination of letter, number or symbol')
    .required('Required'),
    password: Yup.string()
    .min(6, 'At least 6 combination of letter, number or symbol')
    .required('Required'),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Password not match')
    .required('Required'),
  }))

  const formik = useFormik({
    initialValues:{
      email: '',
      displayName: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validation,
    onSubmit:(values,{setSubmitting}) => {
      dispatch(SignupStart(values.email, values.password, values.displayName));
      setSubmitting(true);
    },
  });

  if(signupError && formik.isSubmitting) formik.setSubmitting(false);

  return (
    <form 
    className={classes.form}
    onSubmit={formik.handleSubmit}
    >
        {signupError?
        <div className={classes.error}>
          <Typography variant='h6'>{signupError}</Typography>
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
        id="displayName"
        name="displayName"
        type="text" 
        labelText='Display name'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={formik.isSubmitting}
        defaultValue={formik.values.displayName}
        endAdornment={<Person />}
        errorText={formik.touched.displayName && formik.errors.displayName?formik.errors.displayName:null}
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
        <InputField 
        id="confirmPassword"
        name="confirmPassword"
        type="password" 
        labelText='Confirm password'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={formik.isSubmitting}
        defaultValue={formik.values.confirmPassword}
        endAdornment={<Lock />}
        errorText={formik.touched.confirmPassword && formik.errors.confirmPassword?formik.errors.confirmPassword:null}
        />
        {
        formik.isSubmitting?<CircularProgress color='secondary' />:
        <Button
          variant="contained"
          color="secondary"
          disabled={formik.isSubmitting}
          type='submit'
        >
          <Typography variant='h5'>Sign up</Typography>
        </Button>
        }
    </form>
  )
};

export default SignupForm;
