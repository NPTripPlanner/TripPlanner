import React from 'react';

import InputField from '../InputField/InputField';

import {
    Button,
    Typography
} from '@material-ui/core';
import {Email, Https} from '@material-ui/icons';

import {makeStyles} from '@material-ui/core/styles';

const style={
    form:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        '& .MuiFormControl-root:not(:last-child)':{
            marginBottom:'1%'
        },
        padding:'1%'
    },
    buttonGroup:{
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'space-between',
        alignItems:'center'
    }
}

const TPLoginForm = () => {
    const classes = makeStyles(style)();

    const [formData, setFormData] = React.useState({
        email:'',
        password:''
    })

    const handleChange = (event)=>{
        const id = event.target.id;
        const value = event.target.value;

        setFormData({...formData, [id]:value})
    }

    const handleFormSubmit = (event)=>{
        event.preventDefault();
        console.log(formData)
    }

    return (
        <form className={classes.form} onSubmit={handleFormSubmit}>
            <InputField
            id='email' 
            labelText='E-mail'
            variant='outlined' 
            type='email'
            placeholder='awesome@gmail.com'
            value={formData['email']}
            onChange={handleChange}
            endAdornment={<Email />}
            />
            <InputField 
            id='password'
            labelText='Password'
            variant='outlined' 
            type='password'
            placeholder='123456'
            value={formData['password']}
            onChange={handleChange}
            endAdornment={<Https />}
            />
            <div className={classes.buttonGroup}>
                <Button type='submit' variant='contained' color='secondary'>
                    <Typography variant='h6'>Login</Typography>
                </Button>
            </div>
        </form>
    );
};

export default TPLoginForm;