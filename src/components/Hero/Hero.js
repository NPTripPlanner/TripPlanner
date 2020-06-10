import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core'

import style from './Hero.style';


const Hero = React.forwardRef(({
    imageUrl,
    title
},ref) => {
    const classes = makeStyles(style)();

    return (
        <div ref={ref} className={classes.main}>
            <img className={classes.img} src={imageUrl} alt='hero-img' />
            {
                !title?null
                :
                <div className={classes.title}>
                    <Typography className={classes.titleTypo} variant='h4'>{title}</Typography>
                </div>
            }
        </div>
    );
});

export default Hero;