import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Router from "./router/Router";
import {
  ThemeProvider,
  StylesProvider,
  jssPreset,
} from "@material-ui/core/styles";
import theme from "./themes/defaultTheme";
import { Provider } from "react-redux";
import store from "./redux/Store";
import { InitFirebase } from "./utils/firebase.utils";
import CheckSession from './session/CheckSession';
import * as serviceWorker from "./serviceWorker";

import { create } from "jss";

InitFirebase();

const jss = create({
  plugins: [...jssPreset().plugins],
});



ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CheckSession component={<Router />} />
        </Provider>
      </ThemeProvider>
    </StylesProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
