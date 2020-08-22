import React from "react";

import {
    Card,
    CardMedia,
    CardContent,
    Typography,
} from "@material-ui/core";

import { makeStyles, createStyles } from "@material-ui/core/styles";

import defaultImage from '../../assets/images/TripManage/trip-archive-box.svg';

type IProps = {
    maxWidth?: number;
    image?: string;
    bgColor?: string;
    title: string;
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
});


const TripItem = React.forwardRef<Ref,IProps>((props, ref) => {
    const {
        maxWidth = 150,
        image = defaultImage,
        bgColor = 'transparent',
        title,
    } = props;

    const classes = makeStyles(style)({
        maxWidth,
        image,
        bgColor
    });

    return (
        <div ref={ref} className={classes.main}>
            <Card raised className={classes.card}>
                <CardMedia
                component="img"
                alt="Travel Image"
                image={image}
                title="Travel Image"
                />
                <CardContent>
                    <div className={classes.content}>
                        <div><Typography>{title}</Typography></div>
                    </div>
                </CardContent>
            </Card>
      </div>
    );
  }
);

export default TripItem;
