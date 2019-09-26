import {
  SET_ROUNDLINE_SUBSCRIPTION,
  SET_STRAIGHTLINE_SUBSCRIPTION,
  SET_BAR_SUBSCRIPTION,
  SET_COLOUREDLINE_SUBSCRIPTION,
  SET_PIE_SUBSCRIPTION,
  SET_MULTIPLEBAR_SUBSCRIPTION,
  SET_COLOUREDLINES_SUBSCRIPTION,
  SET_SPEEDOMETER_SUBSCRIPTION,
  SET_DONUT_SUBSCRIPTION,
  SET_PLAINMESSAGES_SUBSCRIPTION
} from "./types";

export const setSubscriptions = (chart, itsData) => dispatch => {
  console.log(chart, itsData);
  switch (chart) {
    case "0":
      dispatch({ type: SET_ROUNDLINE_SUBSCRIPTION, payload: itsData });
      break;
    case "1":
      dispatch({ type: SET_STRAIGHTLINE_SUBSCRIPTION, payload: itsData });
      break;
    case "2":
      dispatch({ type: SET_BAR_SUBSCRIPTION, payload: itsData });
      break;
    case "3":
      dispatch({ type: SET_COLOUREDLINE_SUBSCRIPTION, payload: itsData });
      break;
    case "4":
      dispatch({ type: SET_PIE_SUBSCRIPTION, payload: itsData });
      break;
    case "5":
      dispatch({ type: SET_MULTIPLEBAR_SUBSCRIPTION, payload: itsData });
      break;
    case "6":
      dispatch({ type: SET_COLOUREDLINES_SUBSCRIPTION, payload: itsData });
      break;
    case "7":
      dispatch({ type: SET_SPEEDOMETER_SUBSCRIPTION, payload: itsData });
      break;
    case "8":
      dispatch({ type: SET_DONUT_SUBSCRIPTION, payload: itsData });
      break;
    case "9":
      dispatch({ type: SET_PLAINMESSAGES_SUBSCRIPTION, payload: itsData });
      break;
    default:
      return;
  }
};
