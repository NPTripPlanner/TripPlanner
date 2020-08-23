import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { LoginStart } from "../redux/user/user.actions";

// import TPForm from "../components/TPForm/TPForm";
// import TPSpinner from "../components/TPSpinner/TPSpinner";

// import { selectLoginFail } from "../redux/user/user.selector";

// import { loginFormData, loginFormFields } from "./FormData";

import { Button, Typography, CircularProgress } from "@material-ui/core";
import { makeStyles, createStyles} from '@material-ui/core/styles';
import {Lock, Email} from '@material-ui/icons';
import { Formik, Form } from 'formik';
import InputField from '../components/InputField/InputField';
import * as Yup from 'yup';

const style = createStyles({
  form:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
  }
});

const LoginForm = () => {
  // const [sent, setSent] = React.useState(false);
  // const loginError = useSelector(selectLoginFail);
  // const dispatch = useDispatch();

  // const handleFormSubmit = (data) => {
  //   setSent(true);
  //   dispatch(LoginStart(data.email, data.password));
  // };

  

  // if (loginError && sent) setSent(false);

  // return (
  //   <TPSpinner spinTitle="Logging in..." isLoading={sent}>
  //     <TPForm
  //       error={loginError}
  //       formData={loginFormData}
  //       formFields={loginFormFields}
  //       submitButton={
  //         <Button variant="contained" color="secondary">
  //           <Typography variant="h6">Login</Typography>
  //         </Button>
  //       }
  //       onSubmit={handleFormSubmit}
  //     />
  //   </TPSpinner>
  // );

  // const handleSubmit = (values, { setSubmitting }) => {
  //   setTimeout(() => {
  //     setSubmitting(false);
  //     alert(JSON.stringify(values, null, 2));
  //   }, 500);
  // }
  const classes = makeStyles(style)();

  const validation = ()=>(Yup.object({
    email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
    password: Yup.string()
    .min(6, 'At least 6 combination of letter, number or symbol')
    .required('Required')
  }))

  return(
    <Formik
    initialValues={{
      email: '',
      password: '',
    }}
    validationSchema={validation}
    onSubmit={(_values, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false);
        // alert(JSON.stringify(values, null, 2));
      }, 3000);
    }}
    >
      {
        (formik)=>(
          <Form 
          className={classes.form}
          onSubmit={formik.handleSubmit}
          >
            <InputField
            id="email"
            name="email"
            type="text" 
            labelText='Email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
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
            endAdornment={<Lock />}
            errorText={formik.touched.password && formik.errors.password?formik.errors.password:null}
            />
            {
            formik.isSubmitting?<CircularProgress color='secondary' />:
            <Button
              variant="contained"
              color="secondary"
              disabled={formik.isSubmitting}
              onClick={formik.submitForm}
            >
              <Typography variant='h5'>Submit</Typography>
            </Button>
            }
          </Form>
        )
      }
    </Formik>
  )
};

export default LoginForm;
