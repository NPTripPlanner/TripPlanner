import React from 'react';

import {makeStyles} from '@material-ui/core/styles';

const style={
    form:{
        padding:'1%'
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
    formData,
    formFields,
    submitButton,
    clearButton,
    onSubmit,
    onClear
},ref) => {
    const classes = makeStyles(style)();

    const [data, setData] = React.useState(formData);

    const handleChange = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData({...data, [name]:value})
    }

    const handleClear = ()=>{
        setData(formData);
        if(onClear) onClear();
    }

    const handleFormSubmit = (event)=>{
        event.preventDefault();
        if(onSubmit) onSubmit({...data});
    }

    return (
        <form ref={ref} className={classes.form} onSubmit={handleFormSubmit}>
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