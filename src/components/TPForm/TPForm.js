import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import { addPropsToComponent } from "../../utils/react.utils";

const style = {
  form: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "1%",
  },
  error: {
    textAlign: "center",
    paddingBottom: "2%",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    "& .MuiFormControl-root:not(:last-child)": {
      marginBottom: "5%",
    },
    marginBottom: "3%",
  },
  buttonGroup: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: "0 1%",
  },
};

const TPLoginForm = React.forwardRef(
  (
    {
      error,
      formData,
      formFields,
      errorFields,
      submitButton,
      clearButton,
      onSubmit,
      onClear,
      onValidateForm,
      onFormDataChanged,
    },
    ref
  ) => {
    const classes = makeStyles(style)();

    const [data, setData] = React.useState(formData);

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      const oldData = { ...data };
      const newData = { ...data, [name]: value };
      setData(newData);

      if (onFormDataChanged) onFormDataChanged(oldData, newData);
    };

    const handleClear = () => {
      setData(formData);
      if (onClear) onClear();
    };

    const handleFormSubmit = (event) => {
      event.preventDefault();

      let pass = true;

      if (onValidateForm) {
        pass = onValidateForm({ ...data });
      }
      if (onSubmit && pass) onSubmit({ ...data });
    };

    return (
      <form ref={ref} className={classes.form} onSubmit={handleFormSubmit}>
        {!error ? null : (
          <div className={classes.error}>
            <Typography variant="h6" color="error">
              {error}
            </Typography>
          </div>
        )}
        <div className={classes.fieldGroup}>
          {formFields.map((field, i) => {
            return addPropsToComponent(field.inputField, {
              key: `${field.id}-${i}`,
              name: field.id,
              value: data[field.id],
              error: errorFields ? errorFields.includes(field.id) : false,
              onChange: handleChange,
            });
          })}
        </div>
        <div className={classes.buttonGroup}>
          {submitButton ? (
            <div className={classes.button}>
              {addPropsToComponent(submitButton, { type: "submit" })}
            </div>
          ) : null}
          {clearButton ? (
            <div className={classes.button}>
              {addPropsToComponent(clearButton, { onClick: handleClear })}
            </div>
          ) : null}
        </div>
      </form>
    );
  }
);

export default TPLoginForm;
