import React from "react";

export const addPropsToComponent = (component, props) => {
  return React.cloneElement(component, props);
};
