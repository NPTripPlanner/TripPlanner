import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Button, Typography, createStyles, makeStyles} from '@material-ui/core';
import LayoutTool from '../LayoutTool';
import { selectUnderItinerary, selectSortedSchedules } from '../../../redux/schedule/schedule.selector';
import { Itinerary, Schedule } from '../../../schema/firestore.schema';
import { getLocalDateFromUTCFormat } from '../../../utils/datetime.utils';
import { CreateSchedule, StartListenOnSchedules, StopListenOnSchedules } from '../../../redux/schedule/schedule.actions';
import { motion } from 'framer-motion';
import { slideInOut } from '../../../motions/motions';

const style = createStyles({
    main:{
        padding:'2%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    }
});

const ScheduleManager = () => {

    const classes = makeStyles(style)();

    const underItinerary:Itinerary = useSelector(selectUnderItinerary);
    const schedules:Schedule[] = useSelector(selectSortedSchedules);
    const dispatch = React.useCallback(useDispatch(), []);

    React.useEffect(()=>{
        dispatch(StartListenOnSchedules());
        return ()=>dispatch(StopListenOnSchedules());
    },[dispatch]);

    const topCenterTool = underItinerary?[
        <Button variant="contained" color='secondary'>
            <Typography variant='h5'>
            {`${getLocalDateFromUTCFormat(underItinerary.startDateUTC)} 
            - ${getLocalDateFromUTCFormat(underItinerary.endDateUTC)}`}
            </Typography>
        </Button>
    ]:[];

    const handleCreateSchedule = ()=>{
        dispatch(CreateSchedule());
    }
    return (
        <motion.div 
        className={classes.main}
        initial='initial' 
        animate='enter' 
        exit='exit' 
        variants={slideInOut('x', 200, 20)} 
        >
            <LayoutTool
            centerTools={topCenterTool}
            />
            <div>
                <Button 
                variant="contained" 
                color='secondary'
                onClick={handleCreateSchedule}
                >Add</Button>
            </div>
            <div>
            {
                schedules.map((schedule, i)=>{
                    return (
                    <div key={i}>{getLocalDateFromUTCFormat(schedule.date)}</div>
                    )
                })
            }
            </div>    
        </motion.div>
    );
};

export default ScheduleManager;