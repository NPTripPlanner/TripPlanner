import React from "react";

import {Fab} from '@material-ui/core';
import {
  AddBox,
  PostAdd,
  ArrowBack
} from '@material-ui/icons';
import StaticBG from "../../components/StaticBG/StaticBG";
import ManagerTool from './ManagerTool';
import {CreateTripArchive} from '../../redux/dialog/dialog.actions';
import { useDispatch } from "react-redux";

const renderTripArchiveTool = (
  onArchiveSearch:(keyword)=>void,
  onCreateTripArchive:()=>void,
  )=>{
  const addArchiveFab = (
    <Fab color="secondary" aria-label="add trip archive" onClick={onCreateTripArchive}>
      <AddBox />
    </Fab>
  )
  return (
    <ManagerTool 
    title='Trip Archives'
    rightToolButtons={[addArchiveFab]}
    onSearchChanged={onArchiveSearch}
    />
  )
}

const renderTripCollection = (
  onTripSearch:(keyword)=>void,
  onBack:()=>void)=>{
  const addTripFab = (
    <Fab color="secondary" aria-label="add trip">
      <PostAdd />
    </Fab>
  )
  const backFab = (
    <Fab color="secondary" aria-label="back" onClick={onBack}>
      <ArrowBack />
    </Fab>
  )
  return (
    <ManagerTool 
    title='Trip Collection'
    rightToolButtons={[addTripFab]}
    leftToolButtons={[backFab]}
    onSearchChanged={onTripSearch}
    />
  )
}

const TripManager = () => {

  const [isTripArchive, setIsTripArchive] = React.useState(true);
  const dispatch = useDispatch();

  const handleArchiveSearch = (keyword)=>{
    console.log(keyword);
  }

  const handleCreateTripArchive = ()=>{
    dispatch(CreateTripArchive());
  }

  const handleTripSearch = (keyword)=>{
    console.log(keyword);
  }

  const handleBackToTripArchive = ()=>{
    setIsTripArchive(true);
  }

  const handlRenderTool = ()=>{
    if(isTripArchive){
      return renderTripArchiveTool(handleArchiveSearch, handleCreateTripArchive);
    }
    else{
      return renderTripCollection(handleTripSearch, handleBackToTripArchive);
    }
  }

  return (
    <StaticBG backgroundColor="rgba(166,166,166,0.5)">
      {handlRenderTool()}
    </StaticBG>
  );
};

export default TripManager;
