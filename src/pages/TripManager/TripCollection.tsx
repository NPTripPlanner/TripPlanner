import React from 'react';
import { useDispatch } from "react-redux";
import {useParams, useHistory} from 'react-router-dom';
import ManagerTool from './ManagerTool';
import StaticBG from "../../components/StaticBG/StaticBG";
import { Fab } from '@material-ui/core';
import { PostAdd, ArrowBack } from '@material-ui/icons';
import { StartChangeHeaderTitle } from '../../redux/header/header.actions';

const TripCollection = () => {

    const params = useParams();
    const history = useHistory();
    console.log(params, history);
    const dispatch = React.useCallback(useDispatch(), []);

    React.useEffect(()=>{
        dispatch(StartChangeHeaderTitle('Trips'));
    }, [dispatch]);

    const handleSearch = (keyword)=>{
        console.log('search trip collection ', keyword);
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
        <React.Fragment>
            <StaticBG backgroundColor="rgba(166,166,166,0.5)">
                <ManagerTool
                rightToolButtons={[addTripFab]}
                leftToolButtons={[backFab]}
                onSearchChanged={handleSearch}
                />
            </StaticBG>
        </React.Fragment>
    );
};

export default TripCollection;