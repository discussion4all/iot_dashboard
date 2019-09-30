import axios from "axios";
import { GET_ERRORS, GET_DASHBOARD_LAYOUT } from "./types";
import config from "../config";

//get Dashboard layout
export const getDashboard = dashboardData => dispatch => {
  axios({
    url: `${config.DYNAMODB_API_DOMAIN}/user/getDashboard`,
    method: "get"
  })
    .then(response => {
      let Items = response.data.data.Items;
      dispatch(getDashboardLayout(Items));
    })
    .catch(err => {
      console.log(err.response);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors.toString()
      });
    });
};

//save Dashboard layout
export const saveDashboard = dashboardData => dispatch => {
  axios
    .post(`${config.DYNAMODB_API_DOMAIN}/user/saveDashboard`, dashboardData)
    .then(response => {})
    .catch(err => {
      console.log(err.response);
      // dispatch({
      //       	type: GET_ERRORS,
      //       	payload: err.response.data.errors.toString()
      //     	});
    });
};

function getDashboardLayout(layout) {
  return {
    type: GET_DASHBOARD_LAYOUT,
    payload: layout
  };
}

// function saveDashboardLayout(data) {
//   return {
//     type: SAVE_DASHBOARD_LAYOUT,
//     payload: data
//   };
// }
