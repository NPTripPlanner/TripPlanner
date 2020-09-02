import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from 'react-router-dom';
import ManagerTool from './ManagerTool';
import StaticBG from "../../components/StaticBG/StaticBG";
import { Fab} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { PostAdd, ArrowBack } from '@material-ui/icons';
import { StartChangeHeaderTitle } from '../../redux/header/header.actions';
import {motion} from 'framer-motion';
import {slideInOut} from '../../motions/motions';
import { selectUnderTripArchive } from '../../redux/itinerary/itinerary.selector';
import {ClearAllItineraryState, StartFetchItineraries} from '../../redux/itinerary/itinerary.actions';

const style= createStyles({
    main:{
        height:'100%',
    },
});
const TripCollection = () => {

    const classes = makeStyles(style)();

    const underTripArchive = useSelector(selectUnderTripArchive);
    const fetchAmount = 6;
    const [searchkeyword, setSearchKeyword] = React.useState(''); 

    const history = useHistory();
    const dispatch = React.useCallback(useDispatch(), []);

    React.useEffect(()=>{
        dispatch(StartChangeHeaderTitle(underTripArchive?underTripArchive.name:'Itineraries'));
        
    }, [dispatch, underTripArchive]);

    React.useEffect(()=>{
        dispatch(StartFetchItineraries(fetchAmount, true, searchkeyword));
        return ()=>dispatch(ClearAllItineraryState());
    }, [dispatch, searchkeyword]);

    const handleSearch = (keyword)=>{
        if(searchkeyword !== keyword) setSearchKeyword(keyword);
    }

    const handleGoBack = ()=>{
        history.push('/TripManager');
    }

    const addTripFab = (
        <Fab color="secondary" aria-label="add trip">
          <PostAdd />
        </Fab>
    )
    const backFab = (
        <Fab color="secondary" aria-label="back" onClick={handleGoBack}>
            <ArrowBack />
        </Fab>
    )

    return (
        <motion.div
        className={classes.main}
        initial='initial' 
        animate='enter' 
        exit='exit' 
        variants={slideInOut('x', 200, 20)} 
        >
            <StaticBG backgroundColor="rgba(166,166,166,0.5)">
                <ManagerTool
                rightToolButtons={[addTripFab]}
                leftToolButtons={[backFab]}
                onSearchChanged={handleSearch}
                />
            </StaticBG>
        </motion.div>
    );
};

export default TripCollection;