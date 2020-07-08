import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SignupStart } from "../redux/user/user.actions";
import { selectSignupFail } from "../redux/user/user.selector";

import TPForm from "../components/TPForm/TPForm";
import TPSpinner from "../components/TPSpinner/TPSpinner";

import { signupFormData, signupFormFields } from "./FormData";

import { Button, Typography } from "@material-ui/core";

const SignupForm = () => {
  const [sent, setSent] = React.useState(false);
  const [data, setData] = React.useState(signupFormData);
  const [passNotMatch, setPassNotMatch] = React.useState(null);
  const signupError = useSelector(selectSignupFail);
  const dispatch = useDispatch();

  const handleDataChanged = (_, nData) => {
    setData(nData);
    if (nData.password !== nData.cPassword && nData.cPassword) {
      setPassNotMatch("Password not match");
    } else {
      setPassNotMatch(null);
    }
  };

  const handleFormSubmit = (data) => {
    setSent(true);
    dispatch(SignupStart(data.email, data.password, data.displayName));
  };

  if ((passNotMatch || signupError) && sent) setSent(false);

  return (
    <TPSpinner spinTitle="Signing you up..." isLoading={sent}>
      <TPForm
        error={passNotMatch || signupError}
        formData={data}
        formFields={signupFormFields}
        errorFields={passNotMatch ? ["password", "cPassword"] : null}
        submitButton={
          <Button variant="contained" color="secondary">
            <Typography variant="h6">Sign up</Typography>
          </Button>
        }
        onSubmit={handleFormSubmit}
        onFormDataChanged={handleDataChanged}
      />
    </TPSpinner>
  );
};

export default SignupForm;
