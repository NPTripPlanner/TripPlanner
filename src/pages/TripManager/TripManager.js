import React from "react";
import {
  useDispatch,
  useSelector
} from 'react-redux';

import {
  selectTripCollection,
  selectFetchingTripCollection
} from '../../redux/trip_manager/trip_manager.selector';

import {makeStyles} from '@material-ui/core/styles'; 
import {
  CircularProgress, 
  Fab 
} from "@material-ui/core";
import {
  Search, 
  Add
} from "@material-ui/icons";
import StaticBG from '../../components/StaticBG/StaticBG';
import InputField from '../../components/InputField/InputField';
import TripItem from '../../components/TripItem/TripItem';

import ItemImageUrl from '../../assets/images/TripManage/collection-item.jpeg';

import {StartFetchTripItems} from '../../redux/trip_manager/trip_manager.actions';


const imgUrl = 'https://images.unsplash.com/photo-1502301197179-65228ab57f78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=664&q=80';

const style = {
  toolItems:{
    paddingLeft:'2%',
    paddingRight:'2%'
  },
  tool:{
    display:'flex',
    flexGrow:'1',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:'1%'
  },
  scrollable:{
    height:'100%',
    display:'flex',
    flexGrow:'0',
    flexWrap:'wrap',
    justifyContent:'center',
    alignItems:'flex-start',
    overflow:'auto',
  }
}

const TripManager = () => {
  const classes = makeStyles(style)();
  
  const [keyword, setKeyword] = React.useState('');

  const stableDispatch = React.useCallback(useDispatch(), []);
  const fetching = useSelector(selectFetchingTripCollection);
  const tripCollection = useSelector(selectTripCollection(keyword));


  //fetch trip item collection when component first mounted
  React.useEffect(()=>{
    stableDispatch(StartFetchTripItems());
  }, [stableDispatch]);

  const handleCreateTrip = ()=>{
    console.log('create trip');
  }

  const handleSearchTrip = (event)=>{
    setKeyword(event.target.value);
  }

  return (
    <StaticBG src={imgUrl} backgroundColor='rgba(232,231,229,0.5)'>
      <div className={classes.tool}>
        <div className={classes.toolItems}>
          <InputField
            placeholder='Trip name'
            variant='outlined'
            labelBgColor='rgba(0,0,0,0)'
            startAdornment={
              <Search />
            }
            onChange={handleSearchTrip}
            endAdornment={fetching?<CircularProgress size='2rem'/>:null}
          />
        </div>
        <div className={classes.toolItems}>
          <Fab color="secondary" onClick={handleCreateTrip}>
            <Add />
          </Fab>
        </div>
      </div>
      <div className={classes.scrollable}>
      {
        tripCollection.map((item, i)=>{
          return (
            <TripItem 
            key={i}
            maxWidth={300}
            image={ItemImageUrl}
            tripName={item.tripName}
            startDate={item.startDate}
            createDate={item.createDate}
            customData={{
                id:item.id
            }}
            onEdit={(data)=>console.log(`edit trip with id ${data.id}`)}
            onDelete={(data)=>console.log(`delete trip with id ${data.id}`)}
            />
          )
        })
      }
      </div>
    </StaticBG>
  );
};

export default TripManager;
