import React from "react";

import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../redux/user/user.selector";

const TripManager = () => {
  const history = useHistory();
  const user = useSelector(selectUserInfo);

  if (!user) history.push("/");

  return <div style={{ height: "100%" }}>This is trip management page</div>;
};

export default TripManager;
