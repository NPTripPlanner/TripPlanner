import React from "react";

import {
  OutlinedInput,
  FilledInput,
  Input,
  FormControl,
  InputLabel,
  InputAdornment,
  Typography
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const style = {
  label: props=>({
    backgroundColor: props.labelBgColor,
    padding: "0 3px",
  }),
};

const InputField = React.forwardRef(
  (
    {
      variant = "standard",
      labelText,
      labelBgColor = "#fff",
      htmlFor = "input-field",
      required = false,
      startAdornment,
      endAdornment,
      ...rest
    },
    ref
  ) => {
    const styleProps = {labelBgColor};
    const classes = makeStyles(style)(styleProps);

    const inputProps = {
      id: htmlFor,
      startAdornment: !startAdornment ? null : (
        <InputAdornment position="start">{startAdornment}</InputAdornment>
      ),
      endAdornment: !endAdornment ? null : (
        <InputAdornment position="end">{endAdornment}</InputAdornment>
      ),
      ...rest,
    };

    const standerInput = () => <Input {...inputProps} />;
    const filledInput = () => <FilledInput {...inputProps} />;
    const outlinedInput = () => <OutlinedInput {...inputProps} />;

    const renderInput = () => {
      switch (variant) {
        case "outlined":
          return outlinedInput();
        case "filled":
          return filledInput();
        default:
          return standerInput();
      }
    };

    return (
      <FormControl ref={ref} variant={variant}>
      {
        labelText?
        <InputLabel htmlFor={htmlFor} required={required}>
          <div className={classes.label}>
            <Typography variant='caption'>{labelText}</Typography>
          </div>
        </InputLabel>
        :
        null
      }
        {renderInput()}
      </FormControl>
    );
  }
);

export default InputField;
