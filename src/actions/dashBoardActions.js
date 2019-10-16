import axios from "axios";
import { GET_DASHBOARD_LAYOUT, GET_CHARTS_CONFIG } from "./types";
import config from "../config";

//get Dashboard layout
export const getDashboard = dashboardData => dispatch => {
  axios({
    url: `${config.DYNAMODB_API_DOMAIN}/user/getDashboard`,
    method: "get"
  })
    .then(response => {
      // console.log('Response...',response);
      let Items = response.data.data.Items;

      dispatch(getDashboardLayout(Items));
    })
    .catch(err => {
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data.errors.toString()
      // });
    });
};

//save Dashboard layout
export const saveDashboard = dashboardData => dispatch => {
  axios
    .post(`${config.DYNAMODB_API_DOMAIN}/user/saveDashboard`, dashboardData)
    .then(response => {})
    .catch(err => {
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

export const saveChartConfig = chartConfig => dispatch => {
  if (global.localStorage) {
    global.localStorage.removeItem("chart-config");
    global.localStorage.setItem("chart-config", JSON.stringify(chartConfig));
  }
};

export const getChartConfig = () => dispatch => {
  if (global.localStorage) {
    try {
      let ls = JSON.parse(global.localStorage.getItem("chart-config")) || {};

      dispatch(getChartConfigData(ls));
    } catch (e) {
      /*Ignore*/
    }
  }
};

function getChartConfigData(layout) {
  return {
    type: GET_CHARTS_CONFIG,
    payload: layout
  };
}
