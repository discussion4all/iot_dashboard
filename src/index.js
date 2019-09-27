// React
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

// Utils
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { setCurrentUser, logoutUser } from "./actions/authActions";

// Mqtt
import { Connector } from "mqtt-react";

// components
import indexRoutes from "routes/index.jsx";
import Pages from "layouts/Pages.jsx";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "layouts/Dashboard.jsx";

// Stylesheet
import "assets/scss/material-dashboard-pro-react.css?v=1.4.0";

// import MQTT from "async-mqtt";

const hist = createBrowserHistory();

// Check for token to keep user logged in
if (localStorage.accessToken) {
  // Set auth token header auth
  const token = localStorage.accessToken;
  setAuthToken(token);

  // Decode token to get user info and exp
  const decoded = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // To get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./";
  }
}

// const client = MQTT.connect("ws://admin:admin123@mqtt.omnivoltaic.com:9001");
// console.log(client);

// client.publish("@mqtt/chart/roundline", "Works fine");
// client.subscribe("@mqtt/chart/roundline");

ReactDOM.render(
  <Provider store={store}>
    <Connector mqttProps="ws://admin:admin123@mqtt.omnivoltaic.com:9001">
      <Router history={hist}>
        <Switch>
          {indexRoutes.map(({ component, path }, key) => {
            if (path === "/dashboard") {
              return <PrivateRoute exact path={path} component={component} key={key} />;
            }
            if (!path) {
              return <Route component={localStorage.jwtTokenTeams ? Dashboard : component} />;
            }
            return <Route exact path={path} component={component} key={key} />;
          })}
        </Switch>
      </Router>
    </Connector>
  </Provider>,
  document.getElementById("root")
);
