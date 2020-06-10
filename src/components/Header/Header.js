import React from 'react';

import {
    AppBar,
    Toolbar,
    Typography
} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';

const style = {
    group:{
        width:'100%',
        display:'flex',
        justifyContent:'left',
        alignItems:'center'
    },
    buttonGroup:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        padding:'0 1%',
        flex:'1',
    },
    titleTypo:{
        fontSize:'2.2rem',
        fontWeight:'900'
    }
}

const Header = React.forwardRef(({
    brand,
    title,
    rightButtons
}, ref) => {
    const classes = makeStyles(style)();

    const renderRightButtons = (buttons)=>{
        return (
            <div className={classes.buttonGroup}>
            {buttons.map((btn,i)=><div key={i}>{btn}</div>)}
            </div>
        );
    }
    return (
        <AppBar ref={ref} color='primary'>
            <Toolbar>
                <div className={classes.group}>
                {
                    !brand?null
                    :
                    <div>{brand}</div>
                }
                {
                    !title?null
                    :
                    <div className={classes.title}>
                        <Typography 
                        className={classes.titleTypo} 
                        variant='h3'>
                        {title}
                        </Typography>
                    </div>
                }
                {
                    !rightButtons?null
                    :
                    renderRightButtons(rightButtons)
                }
                </div>
            </Toolbar>
        </AppBar>
    );
});

export default Header;