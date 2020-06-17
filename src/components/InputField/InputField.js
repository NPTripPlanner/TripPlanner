import React from 'react';

import {
    OutlinedInput,
    FilledInput,
    Input,
    FormControl,
    InputLabel,
    InputAdornment
} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';

const style={
    label:{
        backgroundColor:'#fff',
        padding:'0 3px'
    }
}

const InputField = React.forwardRef(({
    variant='standard',
    labelText='Input label',
    labelBgColor='#fff',
    htmlFor='input-field',
    startAdornment,
    endAdornment,
    ...rest
},ref) => {
    const newStyle = {
        ...style,
        label:{
            ...style.label, 
            backgroundColor:labelBgColor
        }
    }
    const classes = makeStyles(newStyle)();

    const standerInput = ()=>(
        <Input
            id={htmlFor}
            startAdornment={
                !startAdornment?null
                :
                <InputAdornment position='start'>{startAdornment}</InputAdornment>
            }
            endAdornment={
                !endAdornment?null
                :
                <InputAdornment position='end'>{endAdornment}</InputAdornment>
            }
            {...rest}
        />
    )

    const filledInput = ()=>(
        <FilledInput
            id={htmlFor}
            startAdornment={
                !startAdornment?null
                :
                <InputAdornment position='start'>{startAdornment}</InputAdornment>
            }
            endAdornment={
                !endAdornment?null
                :
                <InputAdornment position='end'>{endAdornment}</InputAdornment>
            }
            {...rest}
        />
    )

    const outlinedInput = ()=>(
        <OutlinedInput
            id={htmlFor}
            startAdornment={
                !startAdornment?null
                :
                <InputAdornment position='start'>{startAdornment}</InputAdornment>
            }
            endAdornment={
                !endAdornment?null
                :
                <InputAdornment position='end'>{endAdornment}</InputAdornment>
            }
            {...rest}
        />
    )

    const renderInput = ()=>{
        switch (variant) {
            case 'outlined':
                return outlinedInput();
            case 'filled':
                return filledInput();
            default:
                return standerInput();
        }
    }

    return (
        <FormControl ref={ref} variant={variant}>
            <InputLabel htmlFor={htmlFor}>
                <div className={classes.label}>{labelText}</div>
            </InputLabel>
            {renderInput()}
        </FormControl>
    );
});

export default InputField;