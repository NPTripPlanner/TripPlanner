import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectTripCollection,
  selectFetchingTripCollection,
  selectFilterCollection,
  selectSearchingTripCollection,
} from "../../redux/trip_manager/trip_manager.selector";

import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Fab } from "@material-ui/core";
import { Search, Add } from "@material-ui/icons";
import StaticBG from "../../components/StaticBG/StaticBG";
import InputField from "../../components/InputField/InputField";
import TripCollection from "./TripCollection";

import {
  StartFetchTripItems,
  SearchTripItems,
} from "../../redux/trip_manager/trip_manager.actions";

const imgUrl =
  "https://images.unsplash.com/photo-1502301197179-65228ab57f78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=664&q=80";

const style = {
  toolItems: {
    paddingLeft: "2%",
    paddingRight: "2%",
  },
  tool: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "1%",
  },
};

const TripManager = () => {
  const classes = makeStyles(style)();

  const [keyword, setKeyword] = React.useState("");

  const stableDispatch = React.useCallback(useDispatch(), []);

  const tripCollection = useSelector(selectTripCollection);
  const filterCollection = useSelector(selectFilterCollection);
  const fetching = useSelector(selectFetchingTripCollection);
  const searching = useSelector(selectSearchingTripCollection);

  //fetch trip item collection when component first mounted
  React.useEffect(() => {
    stableDispatch(StartFetchTripItems());
  }, [stableDispatch]);

  const handleCreateTrip = () => {
    console.log("create trip");
  };

  const handleSearchTrip = (event) => {
    const value = event.target.value;
    stableDispatch(
      SearchTripItems(
        tripCollection,
        ["tripName", "createDate", "startDate"],
        value
      )
    );
    setKeyword(value);
  };

  return (
    <StaticBG src={imgUrl} backgroundColor="rgba(166,166,166,0.5)">
      {fetching ? null : (
        <div className={classes.tool}>
          <div className={classes.toolItems}>
            <InputField
              placeholder="Trip name"
              variant="outlined"
              labelBgColor="rgba(0,0,0,0)"
              startAdornment={<Search />}
              onChange={handleSearchTrip}
            />
          </div>
          <div className={classes.toolItems}>
            <Fab color="secondary" onClick={handleCreateTrip}>
              <Add />
            </Fab>
          </div>
        </div>
      )}
      {fetching || searching ? (
        <CircularProgress color="secondary" />
      ) : (
        <TripCollection
          tripCollection={keyword ? filterCollection : tripCollection}
        />
      )}
    </StaticBG>
  );
};

export default TripManager;
