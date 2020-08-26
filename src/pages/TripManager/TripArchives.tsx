import React from 'react';
import { useDispatch,useSelector } from "react-redux";
import {
    selectFetchingTripArchives,
    selectMoreTripArchives,
    selectFetchingTripArchiveError,
    selectTripArchives,
} from '../../redux/tripArchive/tripArchive.selector';
import StaticBG from "../../components/StaticBG/StaticBG";
import ManagerTool from './ManagerTool';
import { Fab, Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
import {createStyles} from '@material-ui/core/styles';
import { AddBox } from '@material-ui/icons';
import { CreateDialog } from '../../dialogs/CreateDialog';
import Collection from '../../components/Collection/Collection';
import TripArchive from '../../components/TripArchive/TripArchive';
import CreateTripArchiveForm from '../../forms/CreateTripArchiveForm';
import { StartChangeHeaderTitle } from '../../redux/header/header.actions';
import {StartFetchTripArchives} from '../../redux/tripArchive/tripArchive.actions';

const style = (theme) => createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
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

    console.log(fetchingError);
    console.log(archives);
    console.log(moreArchives);

    React.useEffect(()=>{
        dispatch(StartChangeHeaderTitle('Trip Archives'));
        dispatch(StartFetchTripArchives(fetchAmount));
    }, [dispatch]);

    const handleSearch = (keyword)=>{
        console.log('search trip archive ', keyword);
    }

    const handleCreateTripArchive = ()=>{
        setDialog(
          CreateDialog(
            'Create a new trip archive',
            <CreateTripArchiveForm />,
            'lg',
            [],
            ()=>setDialog(null)
          )
        );
    }

    const handleFetchMore = ()=>{
        dispatch(StartFetchTripArchives(fetchAmount, false));
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
                <Collection 
                moreItems={moreArchives}
                onLoadMore={handleFetchMore}
                >
                {
                    archives.map((tripArchive,i)=>{
                        return(
                            <TripArchive key={i} title={tripArchive.name} />
                        );
                    })
                }
                </Collection>
            </StaticBG>
            <Backdrop className={classes.backdrop} open={fetching}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {dialog?dialog:null}
        </React.Fragment>
    );
};

export default TripArchives;