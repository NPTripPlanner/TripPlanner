import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const style={
    form:{
        padding:'1%'
    },
    error:{
        textAlign:'center'
    },
    fieldGroup:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        '& .MuiFormControl-root:not(:last-child)':{
            marginBottom:'1%'
        },
        marginBottom:'1%'
    },
    buttonGroup:{
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        padding:'0 1%'
    }
}

const addPropsToComponent = (component, props)=>{
    return React.cloneElement(component, props);
}

const TPLoginForm = React.forwardRef(({
    error,
    formData,
    formFields,
    submitButton,
    clearButton,
    onSubmit,
    onClear,
    onValidateForm,
    onFormDataChanged
},ref) => {
    const classes = makeStyles(style)();

    const [data, setData] = React.useState(formData);

    const handleChange = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        const oldData = {...data};
        const newData = {...data, [name]:value};
        setData(newData);
        
        if(onFormDataChanged) onFormDataChanged(oldData, newData);
    }

    const handleClear = ()=>{
        setData(formData);
        if(onClear) onClear();
    }

    const handleFormSubmit = (event)=>{
        event.preventDefault();
        let pass = true;
        if(onValidateForm){
            pass = onValidateForm({...data});
        } 
        if(onSubmit && pass) onSubmit({...data});
    }

    return (
        <form ref={ref} className={classes.form} onSubmit={handleFormSubmit}>
            {
                !error?null
                :
                <div className={classes.error}>
                    <Typography variant='h6' color='error'>{error}</Typography>
                </div>
            }
            <div className={classes.fieldGroup}>
            {
                formFields.map((field, i)=>{
                    return addPropsToComponent(field.inputField, {
                        key:`${field.id}-${i}`,
                        name:field.id,
                        value:data[field.id],
                        onChange:handleChange
                    })
                })
            }
            </div>
            <div className={classes.buttonGroup}>
            {
                submitButton?
                <div className={classes.button}>
                {addPropsToComponent(submitButton, {type:'submit'})}
                </div>
                :
                null
            }
            {
                clearButton?
                <div className={classes.button}>
                {addPropsToComponent(clearButton, {onClick:handleClear})}
                </div>
                :
                null
            }
            </div>
        </form>
    );
});

export default TPLoginForm;