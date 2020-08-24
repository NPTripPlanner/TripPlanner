import React from "react";

import {
  OutlinedInput,
  FilledInput,
  Input,
  FormControl,
  InputLabel,
  InputAdornment,
  Typography,
} from "@material-ui/core";

import { makeStyles, createStyles } from "@material-ui/core/styles";

type IProps = {
  [key:string]: {}|string;
  variant: string;
  labelText: string;
  errorText: string;
  labelBgColor: string;
  htmlFor: string;
  required: boolean;
  startAdornment: HTMLElement;
  endAdornment: HTMLElement;
}
type Ref = HTMLDivElement;

const style = createStyles({
  label: (props:IProps) => ({
    backgroundColor: props.labelBgColor,
    padding: "0 3px",
  }),
  errorLabel:{
    color: 'red',
  },
  control:{
    margin:'5%',
  }
});

const InputField = React.forwardRef<Ref, IProps>((props,ref) => {
  const {
    variant = "standard",
    labelText,
    errorText,
    labelBgColor = "#fff",
    htmlFor = "input-field",
    required = false,
    startAdornment,
    endAdornment,
    ...rest
  } = props;  
  
  const classes = makeStyles(style)({labelBgColor});

  const inputProps = {
    id: htmlFor,
    startAdornment: !startAdornment ? null : (
      <InputAdornment position="start">{startAdornment}</InputAdornment>
    ),
    endAdornment: !endAdornment ? null : (
      <InputAdornment position="end">{endAdornment}</InputAdornment>
    ),
    error: errorText?true:false,
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

    //fix issue variant union type cannot pass to compoenet as prop
    //as typescript can not figure it out
    const getVariant = (variantVals:string):{} =>{
      switch(variantVals){
        case 'outlined':{return {variant: 'outlined'}}
        case 'filled':{return {variant: 'filled'}}
        default:{return {variant: 'standard'}}
      }
    }

    return (
      <FormControl className={classes.control} ref={ref} {...getVariant(variant)}>
        {labelText ? (
          <InputLabel htmlFor={htmlFor} required={required}>
            <div className={classes.label}>
              <Typography variant="caption">{labelText}</Typography>
            </div>
          </InputLabel>
        ) : null}
        {renderInput()}
        {
        !errorText?null:
        <div className={classes.errorLabel}>
          <Typography variant="caption">{errorText}</Typography>
        </div>
        }
      </FormControl>
    );
  }
);

export default InputField;