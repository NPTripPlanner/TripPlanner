import React from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import {
    selectFetchingTripArchives,
    selectMoreTripArchives,
    // selectFetchingTripArchiveError,
    selectTripArchives,
} from '../../redux/tripArchive/tripArchive.selector';
import StaticBG from "../../components/StaticBG/StaticBG";
import ManagerTool from './ManagerTool';
import { Fab, CircularProgress, makeStyles, Button, Typography } from '@material-ui/core';
import {createStyles} from '@material-ui/core/styles';
import { AddBox } from '@material-ui/icons';
import { CreateDialog } from '../../dialogs/CreateDialog';
import Collection from '../../components/Collection/Collection';
import TripArchiveItem from '../../components/TripArchiveItem/TripArchiveItem';
import CreateTripArchiveForm from '../../forms/CreateTripArchiveForm';
import DeleteTripArchiveForm from '../../forms/DeleteTripArchiveForm';
import { StartChangeHeaderTitle } from '../../redux/header/header.actions';
import {
    StartFetchTripArchives, ClearTripArchiveStart, StartFetchMoreTripArchives,
    // StartDeleteTripArchive
} from '../../redux/tripArchive/tripArchive.actions';
import UpdateTripArchiveForm from '../../forms/UpdateTripArchiveForm';
import { TripArchive } from '../../schema/firestore.schema';
import {motion} from 'framer-motion';
import {slideInOut, dropIn} from '../../motions/motions';
import { SetTripArchive } from '../../redux/itinerary/itinerary.actions';

const style = (theme) => createStyles({
    main:{
        height:'100%',
    },
    tool:{
        width:'100%'
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    moreBtn:{
        width: '100%',
        textAlign: 'center',
        paddingBottom: '1%',
    },
});

const renderTripArchives = (
    fetching:boolean,
    archives:Array<TripArchive>,
    moreArchives:boolean,
    handleArchiveClick:(tripArchive:TripArchive)=>void,
    handleDelete:(tripArchive:TripArchive)=>void,
    handleUpdateTripArchiveName:(tripArchive:TripArchive)=>void,
    handleFetchMore:()=>void
     )=>{
    const classes = makeStyles(style)();

    if(!archives && fetching) return (<CircularProgress color="secondary" />);

    return(
    <Collection>
        {
            archives.map((tripArchive,i)=>{
                return(
                    <TripArchiveItem 
                    key={i}
                    title={tripArchive.name}
                    onClick={()=>handleArchiveClick(tripArchive)}
                    onDelete={()=>handleDelete(tripArchive)}
                    onChangeName={
                        ()=>handleUpdateTripArchiveName(tripArchive)
                    }
                    />
                );
            })
        }
        {moreArchives && !fetching?
            <div className={classes.moreBtn}>
            <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleFetchMore}
            >
                <Typography variant="h6">{'More Collections'}</Typography>
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

const ArchiveManager = () => {
    const classes = makeStyles(style)();

    const [dialog, setDialog] = React.useState(null);
    const [searchkeyword, setSearchKeyword] = React.useState(''); 
    const fetching = useSelector(selectFetchingTripArchives);
    // const fetchingError = useSelector(selectFetchingTripArchiveError);
    const archives = useSelector(selectTripArchives);
    const moreArchives = useSelector(selectMoreTripArchives);
    const fetchAmount = 6;
    const dispatch = React.useCallback(useDispatch(), []);
    const history = useHistory();

    React.useEffect(()=>{
        dispatch(StartChangeHeaderTitle('Collection'));
    }, [dispatch])

    React.useEffect(()=>{
        dispatch(StartFetchTripArchives(fetchAmount, true, searchkeyword));
    }, [dispatch, searchkeyword]);

    React.useEffect(()=>{
        return ()=>dispatch(ClearTripArchiveStart());
    }, [dispatch])

    const handleSearch = (keyword)=>{
        if(searchkeyword !== keyword) setSearchKeyword(keyword);
    }

    const createform = (
    <CreateTripArchiveForm
    onSuccess={()=>setDialog(null)} 
    />
    );
    const handleCreateTripArchive = ()=>{
        setDialog(
          CreateDialog(
            'New collection',
            createform,
            'lg',
            [],
            ()=>setDialog(null)
          )
        );
    }

    const updateForm = (tripArchive:TripArchive) => (
        <UpdateTripArchiveForm 
        tripArchive={tripArchive}
        onSuccess={()=>setDialog(null)} 
        />
    );
    const handleUpdateTripArchiveName = (tripArchive:TripArchive)=>{
        setDialog(
            CreateDialog(
              'Change name',
              updateForm(tripArchive),
              'lg',
              [],
              ()=>setDialog(null)
            )
        );
    }

    const deleteForm = (tripArchive:TripArchive) => (
        <DeleteTripArchiveForm 
        tripArchive={tripArchive} 
        onSuccess={()=>setDialog(null)}
        onCancel={()=>setDialog(null)}
        />
    )
    const handleDelete = (tripArchive:TripArchive)=>{
        // dispatch(StartDeleteTripArchive(tripArchive.id, tripArchive.name));
        setDialog(
            CreateDialog(
              'Delete collection',
              deleteForm(tripArchive),
              'lg',
              [],
              ()=>setDialog(null)
            )
        );
    }

    const handleFetchMore = ()=>{
        dispatch(StartFetchMoreTripArchives(fetchAmount));
    }

    const handleArchiveClick = (tripArchive) =>{
        dispatch(SetTripArchive(tripArchive));
        history.push(`/TripManager/${tripArchive.id}`);
    }

    const addArchiveFab = (
        <Fab color="secondary" aria-label="add trip archive" onClick={handleCreateTripArchive}>
          <AddBox />
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
                <motion.div
                className={classes.tool}
                initial='initial' 
                // animate='enter' 
                exit='exit' 
                variants={dropIn(200, 13)}
                >
                    <ManagerTool
                    rightToolButtons={[addArchiveFab]}
                    onSearchChanged={handleSearch}
                    />
                </motion.div>
                {
                renderTripArchives(fetching, archives,
                    moreArchives, handleArchiveClick,
                    handleDelete, handleUpdateTripArchiveName,
                    handleFetchMore
                )
                }
            </StaticBG>
            {dialog?dialog:null}
        </motion.div>
    );
};

export default ArchiveManager;