import React from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import {
    selectFetchingTripArchives,
    selectMoreTripArchives,
    selectFetchingTripArchiveError,
    selectTripArchives,
} from '../../redux/tripArchive/tripArchive.selector';
import StaticBG from "../../components/StaticBG/StaticBG";
import ManagerTool from './ManagerTool';
import { Fab, CircularProgress, makeStyles, Button, Typography } from '@material-ui/core';
import {createStyles} from '@material-ui/core/styles';
import { AddBox } from '@material-ui/icons';
import { CreateDialog } from '../../dialogs/CreateDialog';
import Collection from '../../components/Collection/Collection';
import TripCollection from '../../components/TripCollection/TripCollection';
import CreateTripArchiveForm from '../../forms/CreateTripArchiveForm';
import { StartChangeHeaderTitle } from '../../redux/header/header.actions';
import {
    StartFetchTripArchives,
    StartDeleteTripArchive
} from '../../redux/tripArchive/tripArchive.actions';
import UpdateTripArchiveForm from '../../forms/UpdateTripArchiveForm';
import { TripArchive } from '../../schema/firestore.schema';

const style = (theme) => createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    moreBtn:{
        width: '100%',
        textAlign: 'center',
        paddingBottom: '1%',
    }
});

const TripArchives = () => {
    const classes = makeStyles(style)();

    const [dialog, setDialog] = React.useState(null);
    const fetching = useSelector(selectFetchingTripArchives);
    const fetchingError = useSelector(selectFetchingTripArchiveError);
    const archives = useSelector(selectTripArchives);
    const moreArchives = useSelector(selectMoreTripArchives);
    const fetchAmount = 6;
    const dispatch = React.useCallback(useDispatch(), []);
    const history = useHistory();

    console.log(fetchingError);
    console.log(archives);
    console.log(moreArchives);

    React.useEffect(()=>{
        dispatch(StartChangeHeaderTitle('Collection'));
        dispatch(StartFetchTripArchives(fetchAmount));
    }, [dispatch]);

    const handleSearch = (keyword)=>{
        console.log('search trip archive ', keyword);
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

    const handleDelete = (tripArchive:TripArchive)=>{
        dispatch(StartDeleteTripArchive(tripArchive.id, tripArchive.name));
    }

    const handleFetchMore = ()=>{
        dispatch(StartFetchTripArchives(fetchAmount, false));
    }

    const handleArchiveClick = (archiveId) =>{
        history.push(`/TripManager/${archiveId}`);
    }

    const addArchiveFab = (
        <Fab color="secondary" aria-label="add trip archive" onClick={handleCreateTripArchive}>
          <AddBox />
        </Fab>
    )

    return (
        <React.Fragment>
            <StaticBG backgroundColor="rgba(166,166,166,0.5)">
                <ManagerTool
                rightToolButtons={[addArchiveFab]}
                onSearchChanged={handleSearch}
                />
                <Collection>
                {
                    archives.map((tripArchive,i)=>{
                        return(
                            <TripCollection 
                            key={i}
                            title={tripArchive.name}
                            onClick={()=>handleArchiveClick(tripArchive.id)}
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
                        <Typography variant="h6">More Collections</Typography>
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
            </StaticBG>
            {dialog?dialog:null}
        </React.Fragment>
    );
};

export default TripArchives;