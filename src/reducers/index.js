import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import dashboardReducer from "./dashboardReducer";
import chartReducer from "./chartDataBindReducer";

export default combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  errors: errorReducer,
  chartsData: chartReducer
});
