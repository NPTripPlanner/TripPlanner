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
import {Delete, Edit} from '@material-ui/icons';

import { makeStyles, createStyles } from "@material-ui/core/styles";

import defaultImage from '../../assets/images/TripManage/trip-archive-box.svg';

type IProps = {
    maxWidth?: number;
    image?: string;
    bgColor?: string;
    title: string;
    onClick?: ()=>void;
    onDelete: ()=>void;
    onChangeName: ()=>void;
}
type Ref = HTMLDivElement;

const style = createStyles({
    main:(props:IProps)=>({
        padding: '2%',
        backgroundColor: props.bgColor,
    }),
    card:(props:IProps)=>({
        maxWidth: props.maxWidth,
    }),
    content: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    title:{
        textAlign: 'center',
    }
});


const TripCollection = React.forwardRef<Ref,IProps>((props, ref) => {
    const {
        maxWidth = 150,
        image = defaultImage,
        bgColor = 'transparent',
        title,
        onClick = null,
        onDelete,
        onChangeName,
    } = props;

    const classes = makeStyles(style)({
        maxWidth,
        image,
        bgColor
    });

    const handleClick = ()=>{
        if(onClick) onClick();
    }

    const handleDelete = ()=>{
        if(onDelete) onDelete();
    }

    const handleChangeName = ()=>{
        if(onChangeName) onChangeName();
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
                                <Typography>{title}</Typography>
                            </div>
                        </div>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <IconButton onClick={handleDelete}>
                        <Delete />
                    </IconButton>
                    <IconButton onClick={handleChangeName}>
                        <Edit />
                    </IconButton>
                </CardActions>
            </Card>
      </div>
    );
  }
);

export default TripCollection;
