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
  main:{
    padding:'2%'
  },
  toolItems:{
    paddingLeft:'2%',
    paddingRight:'2%'
  },
  search:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  }
}

const TripManager = () => {
  const classes = makeStyles(style)();
  
  const [keyword, setKeyword] = React.useState('');

  return (
    <StaticBG src={imgUrl} backgroundColor='rgba(255,255,255,0.5)'>
      <div className={classes.main}>
        <div className={classes.search}>
          <div className={classes.toolItems}>
            <InputField
              placeholder='Trip name'
              variant='outlined'
              labelBgColor='rgba(0,0,0,0)'
              startAdornment={
                <Search />
              }
              endAdornment={keyword?<CircularProgress size='1rem'/>:null}
            />
          </div>
          <div className={classes.toolItems}>
            <Fab color="secondary">
              <Add />
            </Fab>
          </div>
        </div>
        <div>trip items</div>
      </div>
    </StaticBG>
  );
};

export default TripManager;
