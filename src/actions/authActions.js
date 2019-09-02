import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

import config from "../config";

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post(`https://${config.REST_API_DOMAIN}/user/login`, userData)
    .then(res => {
      // Save to localstorage

      // Set token to local storage
      const { accessToken, user_role } = res.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user_role", user_role);
      // Set token to Auth header
      setAuthToken(accessToken);
      // Decode token to get user data
      const decoded = jwt_decode(accessToken);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors.toString()
      });
    });
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = history => dispatch => {
  // Remove token from localstorage
  localStorage.removeItem("accessToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));

  // history.push("/dashboard");
};
