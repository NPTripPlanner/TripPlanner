import React from 'react';
import { useDispatch } from "react-redux";
import StaticBG from "../../components/StaticBG/StaticBG";
import ManagerTool from './ManagerTool';
import { Fab } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';
import { CreateDialog } from '../../dialogs/CreateDialog';
import CreateTripArchiveForm from '../../forms/CreateTripArchiveForm';
import { StartChangeHeaderTitle } from '../../redux/header/header.actions';

const TripArchives = () => {
    const [dialog, setDialog] = React.useState(null);
    const dispatch = React.useCallback(useDispatch(), []);

    React.useEffect(()=>{
        dispatch(StartChangeHeaderTitle('Trip Archives'));
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
            </StaticBG>
            {dialog?dialog:null}
        </React.Fragment>
    );
};

export default TripArchives;