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

const imgUrl = 'https://images.unsplash.com/photo-1502301197179-65228ab57f78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=664&q=80';

const style = {
  toolItems:{
    paddingLeft:'2%',
    paddingRight:'2%'
  },
  tool:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  scrollable:{
    overflow:'scroll',
  }
}

const TripManager = () => {
  const classes = makeStyles(style)();
  
  const [keyword, setKeyword] = React.useState('');
  const [tripItems, setTripItems] = React.useState([]);
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
    <div className={classes.scrollable}>trip items</div>
    </StaticBG>
  );
};

export default TripManager;
