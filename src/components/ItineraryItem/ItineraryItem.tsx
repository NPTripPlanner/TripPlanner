import React from "react";

import {
    Card,
    CardMedia,
    CardContent,
    CardActionArea,
    CardActions,
    Typography,
    IconButton,
} from "@material-ui/core";
import {Delete, Edit, AirportShuttle, Home, DateRangeRounded} from '@material-ui/icons';

import { makeStyles, createStyles } from "@material-ui/core/styles";

import defaultImage from '../../assets/images/TripManage/map.svg';

type IProps = {
    width?: number;
    image?: string;
    bgColor?: string;
    title: string;
    startDate: string;
    endDate: string;
    totalDays: string;
    onClick?: ()=>void;
    onDelete: ()=>void;
    onUpdate: ()=>void;
}
type Ref = HTMLDivElement;

const style = createStyles({
    main:(props:IProps)=>({
        padding: '2%',
        backgroundColor: props.bgColor,
    }),
    card:(props:IProps)=>({
        width: props.width,
    }),
    content: {
        display: "flex",
        flexDirection:'column',
        justifyContent: "center",
        alignItems: "center",
    },
    title:{
        textAlign: 'center',
    },
    date:{
        display:'flex',
        alignItems:'center',
    }
});


const ItineraryItem = React.forwardRef<Ref,IProps>((props, ref) => {
    const {
        width = 150,
        image = defaultImage,
        bgColor = 'transparent',
        title,
        startDate = '',
        endDate = '',
        totalDays = '',
        onClick = null,
        onDelete,
        onUpdate,
    } = props;

    const classes = makeStyles(style)({
        width,
        image,
        bgColor
    });

    const handleClick = ()=>{
        if(onClick) onClick();
    }

    const handleDelete = ()=>{
        if(onDelete) onDelete();
    }

    const handleUpdate = ()=>{
        if(onUpdate) onUpdate();
    }

    return (
        <div ref={ref} className={classes.main}>
            <Card raised className={classes.card}>
                <CardActionArea onClick={handleClick}>
                    <CardMedia
                    component="img"
                    alt="Travel Image"
                    image={image}
                    title="Travel Image"
                    />
                    <CardContent>
                        <div className={classes.content}>
                            <div className={classes.title}>
                                <Typography variant='h6'>{title}</Typography>
                            </div>
                            <div className={classes.date}>
                                <AirportShuttle />
                                <Typography>{startDate}</Typography>
                            </div>
                            <div className={classes.date}>
                                <Home />
                                <Typography>{endDate}</Typography>
                            </div>
                            <div className={classes.date}>
                                <DateRangeRounded />
                                <Typography>{totalDays}</Typography>
                            </div>
                        </div>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <IconButton onClick={handleDelete}>
                        <Delete />
                    </IconButton>
                    <IconButton onClick={handleUpdate}>
                        <Edit />
                    </IconButton>
                </CardActions>
            </Card>
      </div>
    );
  }
);

export default ItineraryItem;
