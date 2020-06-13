import React from 'react';

import {ReactComponent as Create} from '../../assets/images/Landing/create-journey.svg';
import {ReactComponent as Plan} from '../../assets/images/Landing/organize-locations.svg';
import {ReactComponent as Travel} from '../../assets/images/Landing/start-journey.svg';

import TPMobileStepper from './TPMobileStepper';

import {ThemeProvider} from '@material-ui/core/styles';
import theme from '../../themes/defaultTheme';

export default{
    title:'Mobile Stepper'
}

const steps = [
    {
        label:'Create',
        icon:<Create />
    },
    {
        label:'Plan',
        icon:<Plan />
    },
    {
        label:'Travel',
        icon:<Travel />
    },
]

export const Default = ()=>{
    return (
        <ThemeProvider theme={theme}>
            <TPMobileStepper steps={steps} />
        </ThemeProvider>
    )
}