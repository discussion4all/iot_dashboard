import {
  SET_ROUNDLINE_DATA,
  SET_STRAIGHTLINE_DATA,
  SET_BAR_DATA,
  SET_COLOUREDLINE_DATA,
  SET_PIE_DATA,
  SET_MULTIPLEBAR_DATA,
  SET_COLOUREDLINES_DATA,
  SET_SPEEDOMETER_DATA,
  SET_DONUT_DATA,
  SET_PLAINMESSAGES_DATA
} from "../actions/types";

const initialState = {
  roundlineData: [],
  straightlineData: [],
  barData: [],
  colouredlineData: [],
  pieData: [],
  multiplebarData: [],
  colouredlinesData: [],
  speedometerData: [],
  donutData: [],
  plainmessagesData: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ROUNDLINE_DATA:
      return {
        ...state,
        roundlineData: [action.payload, ...state.roundlineData]
      };
    case SET_STRAIGHTLINE_DATA:
      return {
        ...state,
        straightlineData: [action.payload, ...state.straightlineData]
      };
    case SET_BAR_DATA:
      return {
        ...state,
        barData: [action.payload, ...state.barData]
      };
    case SET_COLOUREDLINE_DATA:
      return {
        ...state,
        colouredlineData: [action.payload, ...state.colouredlineData]
      };
    case SET_PIE_DATA:
      return {
        ...state,
        pieData: [action.payload, ...state.pieData]
      };
    case SET_MULTIPLEBAR_DATA:
      return {
        ...state,
        multiplebarData: [action.payload, ...state.multiplebarData]
      };
    case SET_COLOUREDLINES_DATA:
      return {
        ...state,
        colouredlinesData: [action.payload, ...state.colouredlinesData]
      };
    case SET_SPEEDOMETER_DATA:
      return {
        ...state,
        speedometerData: [action.payload, ...state.speedometerData]
      };
    case SET_DONUT_DATA:
      return {
        ...state,
        donutData: [action.payload, ...state.donutData]
      };
    case SET_PLAINMESSAGES_DATA:
      return {
        ...state,
        plainmessagesData: [action.payload, ...state.plainmessagesData]
      };
    default:
      return state;
  }
}
