import React from 'react';

import {makeStyles} from '@material-ui/core/styles';

import TripItem from '../../components/TripItem/TripItem';

import ItemImageUrl from '../../assets/images/TripManage/collection-item.jpeg';

const style = {
    scrollable:{
      height:'100%',
      display:'flex',
      flexWrap:'wrap',
      justifyContent:'center',
      alignItems:'flex-start',
      overflow:'auto',
    }
  }

const TripCollection = React.forwardRef(({
    tripCollection
},ref) => {
    const classes = makeStyles(style)();

    return (
        <div ref={ref} className={classes.scrollable}>
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
    );
});

export default TripCollection;