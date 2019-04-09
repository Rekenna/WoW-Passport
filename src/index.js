import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { ThemeProvider } from "emotion-theming";
import * as serviceWorker from "./util/serviceWorker";

import Home from "./pages/Home";
import { theme } from "./util/typography";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
