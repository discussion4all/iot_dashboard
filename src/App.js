import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
// import { renderRoutes } from 'react-router-config';
import "./App.scss";

// utils
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./PrivateRoute";

import AWSAppSyncClient from 'aws-appsync';
import { ApolloProvider } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/Pages/Login"));
const Register = React.lazy(() => import("./views/Pages/Register"));
const Page404 = React.lazy(() => import("./views/Pages/Page404"));
const Page500 = React.lazy(() => import("./views/Pages/Page500"));

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



// const client = new AWSAppSyncClient({
//   url: 'https://4urrtrh5cbek5e7tefv6qmku2i.appsync-api.ap-southeast-1.amazonaws.com/graphql',
//   region: 'ap-southeast-1',
//   auth: {
//     type: 'API_KEY',
//     apiKey: 'da2-uybvqvefkfdzvior3cddv4h4gu',
//     // jwtToken: async () => token, // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
//   }
// })


class App extends Component {
  render() {
    return (
     
        <Provider store={store} >
          <HashRouter>
            <React.Suspense fallback={loading()}>
              <Switch>
                <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
                <Route
                  exact
                  path="/register"
                  name="Register Page"
                  render={props => <Register {...props} />}
                />
                <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
                <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
                <PrivateRoute path="/" name="Home" component={DefaultLayout} />
              </Switch>
            </React.Suspense>
          </HashRouter>

        </Provider>
          
    );
  }
}

export default App;
