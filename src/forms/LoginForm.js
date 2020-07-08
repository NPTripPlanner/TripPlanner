import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { LoginStart } from "../redux/user/user.actions";

import TPForm from "../components/TPForm/TPForm";
import TPSpinner from "../components/TPSpinner/TPSpinner";

import { selectLoginFail } from "../redux/user/user.selector";

import { loginFormData, loginFormFields } from "./FormData";

import { Button, Typography } from "@material-ui/core";

const LoginForm = () => {
  const [sent, setSent] = React.useState(false);
  const loginError = useSelector(selectLoginFail);
  const dispatch = useDispatch();

  const handleFormSubmit = (data) => {
    setSent(true);
    dispatch(LoginStart(data.email, data.password));
  };

  if (loginError && sent) setSent(false);

  return (
    <TPSpinner spinTitle="Logging in..." isLoading={sent}>
      <TPForm
        error={loginError}
        formData={loginFormData}
        formFields={loginFormFields}
        submitButton={
          <Button variant="contained" color="secondary">
            <Typography variant="h6">Login</Typography>
          </Button>
        }
        onSubmit={handleFormSubmit}
      />
    </TPSpinner>
  );
};

export default LoginForm;
