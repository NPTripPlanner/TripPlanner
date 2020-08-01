import React from 'react';

import {makeStyles} from '@material-ui/core/styles';

const style = {
    main:{
        position:'relative',
        backgroundRepeat:'no-repeat',
        backgroundAttachment:'fixed',
        backgroundPosition:'center',
        backgroundSize:'cover',
        height:'inherit'
    },
    content:{
        // position:'relative',
        height:'100%',
    }
}

const StaticBG = React.forwardRef(({
    src,
    backgroundColor='rgba(255,255,255,0.5)',
    children
},ref) => {
    const newStyle = {
        main:{
            ...style.main,
            backgroundImage:src?`url(${src})`:'',
        },
        content:{...style.content, backgroundColor:`${backgroundColor}`}
    }
    const classes = makeStyles(newStyle)();

    return (
        <div ref={ref} className={classes.main}>
            <div className={classes.content}>{children}</div>
        </div>
    );
});

export default StaticBG;