import React from 'react';

import InputField from './InputField';

import {action} from '@storybook/addon-actions';

export default {
    title:'InputField'
}

export const Default = ()=>{
    return <InputField labelText='Name' onChange={(event)=>action(event.target.value)()} />
}

export const outlined = ()=>{
    return <InputField labelText='Name' variant='outlined' onChange={(event)=>action(event.target.value)()} />
}

export const filled = ()=>{
    return <InputField labelText='Name' variant='filled' onChange={(event)=>action(event.target.value)()} />
}