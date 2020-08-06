import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    IconButton
} from '@material-ui/core';

import {
    Create,
    Delete
} from '@material-ui/icons';

const style= {
    main:{
        padding:'2%',
        backgroundColor:'transparent'
    },
    card:props=>({
        maxWidth:props.maxWidth,
    }),
    media:props=>({
       width:props.maxWidth
    }),
    content:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    }
}

const TripItem = React.forwardRef(({
    maxWidth=150,
    image='',
    tripName='Unknow',
    startDate='Unknow',
    createDate='Unknow',
    customData,
    onEdit,
    onDelete,
}, ref) => {
    const styleProps = {maxWidth}
    const classes = makeStyles(style)(styleProps);

    const handleEdit = ()=>{
        if(onEdit) onEdit(customData);
    }

    const handleDelete = ()=>{
        if(onDelete) onDelete(customData)
    }

    return (
        <div className={classes.main}>
        <Card ref={ref} className={classes.card}>
            <CardMedia
            className={classes.media}
            component="img"
            alt="Travel Image"
            image={image}
            title="Travel Image"
            />
            <CardContent>
                <div className={classes.content}>
                    <div><Typography variant='h6'>{tripName}</Typography></div>
                    <div><Typography variant='h6'>{startDate}</Typography></div>
                    <div><Typography variant='h6'>{createDate}</Typography></div>
                </div>
            </CardContent>
            <CardActions>
                <IconButton onClick={handleEdit}>
                    <Create color='secondary' />
                </IconButton>
                <IconButton onClick={handleDelete}>
                    <Delete color='error' />
                </IconButton>
            </CardActions>
        </Card>
        </div>
    );
});

export default TripItem;