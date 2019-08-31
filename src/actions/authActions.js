import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

import config from "../config";

// Login - get user token
export const loginUser = userData => dispatch => {
  console.log(userData);
  axios
    .post(`https://${config.REST_API_DOMAIN}/user/login`, userData)
    .then(res => {
      // Save to localstorage
      console.log(res.data);
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
        payload: err.errors[0]
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
