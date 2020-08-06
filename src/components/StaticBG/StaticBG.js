import React from 'react';

import {makeStyles} from '@material-ui/core/styles';

const style = {
    main:props=>({
        backgroundRepeat:'no-repeat',
        backgroundAttachment:'fixed',
        backgroundPosition:'center',
        backgroundSize:'cover',
        backgroundImage:props.src?`url(${props.src})`:'',
        height:'inherit'
    }),
    content:props=>({
        padding:'2%',
        height:'100%',
        display:'flex',
        flexDirection:props.flexDirection==='vertical'?'column':'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:`${props.backgroundColor}`
    }),
}

const StaticBG = React.forwardRef(({
    src,
    backgroundColor='rgba(255,255,255,0.5)',
    flexDirection='vertical',
    children
},ref) => {
    const styleProps = {src, backgroundColor, flexDirection}
    const classes = makeStyles(style)(styleProps);

    return (
        <div ref={ref} className={classes.main}>
            <div className={classes.content}>{children}</div>
        </div>
    );
});

export default StaticBG;