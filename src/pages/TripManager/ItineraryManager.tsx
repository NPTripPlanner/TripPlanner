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
import CreateItineraryForm from '../../forms/CreateItineraryForm';
import { CreateDialog } from '../../dialogs/CreateDialog';
import 'moment-timezone';
import moment from 'moment';

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
            const utcTime = moment.utc(itinerary.startDateUTC);
            console.log('server saved time in js ISO:', itinerary.startDateUTC.toISOString());
            console.log('server saved time in moment:', moment(itinerary.startDateUTC).format('DD-MM-YYYY h:mm:ss A'));
            console.log('UTC:',utcTime.format('DD-MM-YYYY h:mm:ss A'));
            console.log('local:', utcTime.clone().local().format('DD-MM-YYYY h:mm:ss A'));
            console.log('New York:', utcTime.clone().tz('America/New_York').format('DD-MM-YYYY h:mm:ss A'));
            console.log('Melbourne:', utcTime.clone().tz('Australia/Melbourne').format('DD-MM-YYYY h:mm:ss A'));

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

    const [dialog, setDialog] = React.useState(null);
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

    const createform = (
        <CreateItineraryForm
        onSuccess={()=>setDialog(null)} 
        />
    );
    const handleCreateItinerary = ()=>{
        setDialog(
            CreateDialog(
            'New itinerary',
            createform,
            'lg',
            [],
            ()=>setDialog(null)
            )
        );
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

    const additineraryFab = (
        <Fab color="secondary" aria-label="add itinerary" onClick={handleCreateItinerary}>
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
                rightToolButtons={[additineraryFab]}
                leftToolButtons={[backFab]}
                onSearchChanged={handleSearch}
                />
                {
                renderItineraries(fetching,itineraries, handleItineraryClick,
                    handleDelete, handleUpdateItineraryName
                )
                }
            </StaticBG>
            {dialog?dialog:null}
        </motion.div>
    );
};

export default ItinerayManager;