import React from "react";

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

import ItemImageUrl from '../../assets/images/TripManage/collection-item.jpeg';
import TripItem from '../../components/TripItem/TripItem';

const imgUrl = 'https://images.unsplash.com/photo-1502301197179-65228ab57f78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=664&q=80';

const mockTripItems = [
  {
    id:'tp1',
    tripName:'My first trip',
    startDate:'02/Jun/2020',
    createDate:'01/Jun/2020',
    imageUrl:ItemImageUrl
  },
  {
    id:'tp2',
    tripName:'My first trip',
    startDate:'02/Jun/2020',
    createDate:'01/Jun/2020',
    imageUrl:ItemImageUrl
  },
  {
    id:'tp3',
    tripName:'My first trip',
    startDate:'02/Jun/2020',
    createDate:'01/Jun/2020',
    imageUrl:ItemImageUrl
  },
  {
    id:'tp4',
    tripName:'My first trip',
    startDate:'02/Jun/2020',
    createDate:'01/Jun/2020',
    imageUrl:ItemImageUrl
  },
  {
    id:'tp4',
    tripName:'My first trip',
    startDate:'02/Jun/2020',
    createDate:'01/Jun/2020',
    imageUrl:ItemImageUrl
  },
  {
    id:'tp4',
    tripName:'My first trip',
    startDate:'02/Jun/2020',
    createDate:'01/Jun/2020',
    imageUrl:ItemImageUrl
  },
  {
    id:'tp4',
    tripName:'My first trip',
    startDate:'02/Jun/2020',
    createDate:'01/Jun/2020',
    imageUrl:ItemImageUrl
  },
  {
    id:'tp4',
    tripName:'My first trip',
    startDate:'02/Jun/2020',
    createDate:'01/Jun/2020',
    imageUrl:ItemImageUrl
  },
  {
    id:'tp4',
    tripName:'My first trip',
    startDate:'02/Jun/2020',
    createDate:'01/Jun/2020',
    imageUrl:ItemImageUrl
  },
  {
    id:'tp4',
    tripName:'My first trip',
    startDate:'02/Jun/2020',
    createDate:'01/Jun/2020',
    imageUrl:ItemImageUrl
  },
]

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
  const [tripItems, setTripItems] = React.useState(mockTripItems);
  const [searching, setSearching] = React.useState(false);
  React.useEffect(()=>{
    
    setSearching(true);
    let timer = null;
    const p = new Promise((res, rej)=>{
      timer = setTimeout(()=>{
        res('successful');
      }, 3000);
    });

    p.then((value)=>{
      setSearching(false);
      console.log(value);
    })
    .catch((err)=>{
      setSearching(false);
      console.log(err);
    })

    return ()=>{
      clearTimeout(timer);
    }

  }, [keyword]);

  const handleCreateTrip = ()=>{
    console.log('create trip');
  }

  const handleSearchTrip = (event)=>{
    setKeyword(event.target.value);
  }

  return (
    <StaticBG src={imgUrl} backgroundColor='rgba(255,255,255,0.5)'>
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
            endAdornment={searching?<CircularProgress size='1rem'/>:null}
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
        tripItems.map((item, i)=>{
          return (
            <TripItem 
            key={i}
            maxWidth={300}
            image={item.imageUrl}
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
