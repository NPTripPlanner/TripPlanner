import React from 'react';

import {
    Input,
    FormControl,
    InputLabel,
    InputAdornment
} from '@material-ui/core';

const InputField = React.forwardRef(({
    label='Input label',
    htmlFor='input-field',
    ...rest
},ref) => {
    return (
        <FormControl ref={ref}>
            <InputLabel htmlFor={htmlFor}>{label}</InputLabel>
            <Input
            id={htmlFor}
            {...rest}
            />
        </FormControl>
    );
});

export default InputField;