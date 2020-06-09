import React from 'react';

import {
    AppBar,
    Toolbar,
    Typography
} from '@material-ui/core';

const Header = React.forwardRef(({
    ref,
    brand,
    title,
    rightButtons
}) => {
    const renderRightButtons = (buttons)=>{
        return (
            <div>
            {buttons.map((btn,i)=><div key={i}>{btn}</div>)}
            </div>
        );
    }
    return (
        <AppBar ref={ref}>
            <Toolbar>
                {
                    !brand?null
                    :
                    <div>{brand}</div>
                }
                {
                    !title?null
                    :
                    <div>{title}</div>
                }
                {
                    !rightButtons?null
                    :
                    renderRightButtons(rightButtons)
                }
            </Toolbar>
        </AppBar>
    );
});

export default Header;