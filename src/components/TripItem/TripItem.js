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
        maxWidth:150,
    },
    media: {
       width:150
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
    const newStyle = {
        ...style,
        main:{
            ...style.main,
            maxWidth:maxWidth,
        },
        media:{
            ...style.media,
            width:maxWidth
        },
        content:{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center'
        }
    }

    const classes = makeStyles(newStyle)();

    const handleEdit = ()=>{
        if(onEdit) onEdit(customData);
    }

    const handleDelete = ()=>{
        if(onDelete) onDelete(customData)
    }

    return (
        <Card ref={ref} className={classes.main}>
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
    );
});

export default TripItem;