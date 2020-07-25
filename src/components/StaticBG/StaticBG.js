import React from 'react';

import {makeStyles} from '@material-ui/core/styles';

const style = {
    main:{
        position:'relative',
        backgroundRepeat:'no-repeat',
        backgroundAttachment:'fixed',
        backgroundPosition:'center',
        backgroundSize:'cover',
    },
    content:{
        position:'relative'
    }
}

const StaticBG = React.forwardRef(({
    src,
    rgbaColor='rgba(255,255,255,0.5)',
    children
},ref) => {
    const newStyle = {
        main:{
            ...style.main,
            backgroundImage:src?`url(${src})`:'',
        },
        content:{...style.content, backgroundColor:`${rgbaColor}`}
    }
    const classes = makeStyles(newStyle)();

    return (
        <div ref={ref} className={classes.main}>
            <div className={classes.content}>{children}</div>
        </div>
    );
});

export default StaticBG;