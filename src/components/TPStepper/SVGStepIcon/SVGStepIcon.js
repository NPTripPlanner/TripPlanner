import React from 'react';

import {ReactComponent as Create} from '../../../assets/images/Landing/create-journey.svg';
import {ReactComponent as Plan} from '../../../assets/images/Landing/organize-locations.svg';
import {ReactComponent as Travel} from '../../../assets/images/Landing/start-journey.svg';
import {Zoom,Typography} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';

const style ={
    main:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    icon:{
        textAlign:'center'
    },
    title:{
        textAlign:'center'
    }
}

const icons = {
    1:{
        title:'Create',
        comp:<Create />
    },
    2:{
        title:'Plan',
        comp:<Plan />
    },
    3:{
        title:'Travel',
        comp:<Travel />
    }
}

const animWithContent = (content)=>{
    return(
        <Zoom in>
        {content}
        </Zoom>
    );
}

const getContent = (comp, title)=>{
    const classes = makeStyles(style)();

    return (
        <div className={classes.main}>
            <div className={classes.icon}>{comp}</div>
            <div className={classes.title}>
                <Typography variant='h6'>{title}</Typography>
            </div>
        </div>
    );
}

const SVGStepIcon = ({
    completed,
    icon
}) => {
    

    if(completed){
        const comp = icons[icon].comp;
        const title = icons[icon].title;
        if(icon > 1){
            return animWithContent(getContent(comp, title));
        }
        return getContent(comp, title);
    }
    return (<div></div>)
};

export default SVGStepIcon;