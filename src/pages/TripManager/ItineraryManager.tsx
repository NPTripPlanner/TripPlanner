import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from 'react-router-dom';
import LayoutTool from './LayoutTool';
import StaticBG from "../../components/StaticBG/StaticBG";
import { Fab, CircularProgress, Button, Typography} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { PostAdd, ArrowBack, Search } from '@material-ui/icons';
import { StartChangeHeaderTitle } from '../../redux/header/header.actions';
import {motion} from 'framer-motion';
import {slideInOut} from '../../motions/motions';
import { selectUnderTripArchive, selectItineraries, selectFetchingItineraries, selectMoreItineraries } from '../../redux/itinerary/itinerary.selector';
import {ClearAllItineraryState, StartFetchItineraries, StartFetchMoreItineraries} from '../../redux/itinerary/itinerary.actions';
import Collection from '../../components/Collection/Collection';
import ItineraryItem from '../../components/ItineraryItem/ItineraryItem';
import { Itinerary } from '../../schema/firestore.schema';
import CreateItineraryForm from '../../forms/CreateItineraryForm';
import { CreateDialog } from '../../dialogs/CreateDialog';
import DeleteItineraryForm from '../../forms/DeleteItineraryForm';
import UpdateItineraryForm from '../../forms/UpdateItineraryForm';
import { getLocalDateFromUTCFormat } from '../../utils/datetime.utils';
import InputField from '../../components/InputField/InputField';
import { SetItinerary } from '../../redux/schedule/schedule.actions';

const style= createStyles({
    main:{
        height:'100%',
    },
    moreBtn:{
        width: '100%',
        textAlign: 'center',
        paddingBottom: '1%',
    }
});

const renderItineraries = (
    fetching:boolean, 
    itineraries:Array<Itinerary>,
    moreItineraries:boolean,
    handleItineraryClick:(itinerary:Itinerary)=>void,
    handleDelete:(itinerary:Itinerary)=>void,
    handleItineraryUpdate:(itinerary:Itinerary)=>void,
    handleFetchMore:()=>void
    )=>{

    const classes = makeStyles(style)();

    if(!itineraries && fetching) return (<CircularProgress color="secondary" />);

    return( 
        <Collection>
        {
            itineraries.map((itinerary,i)=>{
                return(
                    <ItineraryItem 
                    key={i}
                    width={200}
                    title={itinerary.name}
                    startDate={getLocalDateFromUTCFormat(itinerary.startDateUTC)}
                    endDate={getLocalDateFromUTCFormat(itinerary.endDateUTC)}
                    totalDays={`${itinerary.totalDays.toString()} Days`}
                    onClick={()=>handleItineraryClick(itinerary)}
                    onDelete={()=>handleDelete(itinerary)}
                    onUpdate={
                        ()=>handleItineraryUpdate(itinerary)
                    }
                    />
                );
            })
        }
        {moreItineraries && !fetching?
            <div className={classes.moreBtn}>
            <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleFetchMore}
            >
                <Typography variant="h6">{'More Itineraries'}</Typography>
            </Button>
            </div>
            :
            fetching?
            <div className={classes.moreBtn}>
                <CircularProgress color="secondary" />
            </div>
            :
            null 
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
    const moreItineraries = useSelector(selectMoreItineraries);
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

    const handleSearch = (event)=>{
        const keyword:string = event.target.value;
        if(searchkeyword !== keyword) setSearchKeyword(keyword);
    }

    const handleGoBack = ()=>{
        history.push('/TripManager');
    }

    const handleFetchMore = ()=>{
        dispatch(StartFetchMoreItineraries(fetchAmount));
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

    const handleItineraryClick = (itinerary:Itinerary)=>{
        dispatch(SetItinerary(itinerary));
        history.push(`/TripManager/${underTripArchive.id}/${itinerary.id}`);
    }

    const deleteForm = (itinerary:Itinerary)=>(
        <DeleteItineraryForm 
        itinerary={itinerary}
        onCancel={()=>setDialog(null)}
        onSuccess={()=>setDialog(null)}
        />
    );
    const handleDelete = (itinerary:Itinerary)=>{
        setDialog(
            CreateDialog(
                'Delete itinerary',
                deleteForm(itinerary),
                'lg',
                [],
                ()=>setDialog(null)
            )
        );
    }

    const updateForm = (itinerary:Itinerary)=>(
        <UpdateItineraryForm
        itinerary={itinerary}
        onSuccess={()=>setDialog(null)}
        />
    );
    const handleItineraryUpdate = (itinerary)=>{
        setDialog(
            CreateDialog(
                'Update itinerary',
                updateForm(itinerary),
                'lg',
                [],
                ()=>setDialog(null)
            )
        );
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

    const searchInput = (
        <InputField
        placeholder="Trip name"
        variant="outlined"
        labelBgColor="rgba(0,0,0,0)"
        startAdornment={<Search />}
        onChange={handleSearch}
        />
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
                <LayoutTool
                rightTools={[additineraryFab]}
                centerTools={[searchInput]}
                leftTools={[backFab]}
                />
                {
                renderItineraries(fetching, itineraries,
                    moreItineraries, handleItineraryClick,
                    handleDelete, handleItineraryUpdate,
                    handleFetchMore
                )
                }
            </StaticBG>
            {dialog?dialog:null}
        </motion.div>
    );
};

export default ItinerayManager;