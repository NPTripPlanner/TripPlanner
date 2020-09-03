import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from 'react-router-dom';
import ManagerTool from './ManagerTool';
import StaticBG from "../../components/StaticBG/StaticBG";
import { Fab, CircularProgress} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { PostAdd, ArrowBack } from '@material-ui/icons';
import { StartChangeHeaderTitle } from '../../redux/header/header.actions';
import {motion} from 'framer-motion';
import {slideInOut} from '../../motions/motions';
import { selectUnderTripArchive, selectItineraries, selectFetchingItineraries } from '../../redux/itinerary/itinerary.selector';
import {ClearAllItineraryState, StartFetchItineraries} from '../../redux/itinerary/itinerary.actions';
import Collection from '../../components/Collection/Collection';
import TripCollection from '../../components/TripCollection/TripCollection';
import { Itinerary } from '../../schema/firestore.schema';

const style= createStyles({
    main:{
        height:'100%',
    },
});

const renderItineraries = (
    fetching:boolean, itineraries:Array<Itinerary>,
    handleItineraryClick:(itinerary:Itinerary)=>void,
    handleDelete:(itinerary:Itinerary)=>void,
    handleUpdateItineraryName:(itinerary:Itinerary)=>void
    )=>{
    if(fetching) return (<CircularProgress color="secondary" />);
    if(!itineraries) return null;

    return( 
        <Collection>
        {
        itineraries.map((itinerary,i)=>{
            return(
                <TripCollection 
                key={i}
                title={itinerary.name}
                onClick={()=>handleItineraryClick(itinerary)}
                onDelete={()=>handleDelete(itinerary)}
                onChangeName={
                    ()=>handleUpdateItineraryName(itinerary)
                }
                />
            );
        })
        }
        </Collection>
    );
}

const ItinerayManager = () => {

    const classes = makeStyles(style)();

    const underTripArchive = useSelector(selectUnderTripArchive);
    const fetching = useSelector(selectFetchingItineraries);
    const itineraries = useSelector(selectItineraries);
    const fetchAmount = 6;
    const [searchkeyword, setSearchKeyword] = React.useState(''); 

    const history = useHistory();
    const dispatch = React.useCallback(useDispatch(), []);

    React.useEffect(()=>{
        dispatch(StartChangeHeaderTitle(underTripArchive?underTripArchive.name:'Itineraries'));
        
    }, [dispatch, underTripArchive]);

    React.useEffect(()=>{
        dispatch(StartFetchItineraries(fetchAmount, true, searchkeyword));
    }, [dispatch, searchkeyword]);

    React.useEffect(()=>{
        return ()=>dispatch(ClearAllItineraryState());
    }, [dispatch]);

    const handleSearch = (keyword)=>{
        if(searchkeyword !== keyword) setSearchKeyword(keyword);
    }

    const handleGoBack = ()=>{
        history.push('/TripManager');
    }

    const handleItineraryClick = (_itinerary)=>{
        //TODO: handle itinerary click
    }

    const handleDelete = (_itinerary)=>{
        //TODO: handle itinerary delete
    }

    const handleUpdateItineraryName = (_itinerary)=>{
        //TODO: handle update itinerary name
    }

    const addTripFab = (
        <Fab color="secondary" aria-label="add itinerary">
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
                {
                renderItineraries(fetching,itineraries, handleItineraryClick,
                    handleDelete, handleUpdateItineraryName
                )
                }
            </StaticBG>
        </motion.div>
    );
};

export default ItinerayManager;