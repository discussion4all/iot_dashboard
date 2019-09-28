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
} from "../actions/types";

const initialState = {
  roundline: null,
  straightline: null,
  bar: null,
  colouredline: null,
  pie: null,
  multiplebar: null,
  colouredlines: null,
  speedometer: null,
  donut: null,
  plainmessages: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ROUNDLINE_SUBSCRIPTION:
      return {
        ...state,
        roundline: action.payload
      };
    case SET_STRAIGHTLINE_SUBSCRIPTION:
      return {
        ...state,
        straightline: action.payload
      };
    case SET_BAR_SUBSCRIPTION:
      return {
        ...state,
        bar: action.payload
      };
    case SET_COLOUREDLINE_SUBSCRIPTION:
      return {
        ...state,
        colouredline: action.payload
      };
    case SET_PIE_SUBSCRIPTION:
      return {
        ...state,
        pie: action.payload
      };
    case SET_MULTIPLEBAR_SUBSCRIPTION:
      return {
        ...state,
        multiplebar: action.payload
      };
    case SET_COLOUREDLINES_SUBSCRIPTION:
      return {
        ...state,
        colouredlines: action.payload
      };
    case SET_SPEEDOMETER_SUBSCRIPTION:
      return {
        ...state,
        speedometer: action.payload
      };
    case SET_DONUT_SUBSCRIPTION:
      return {
        ...state,
        donut: action.payload
      };
    case SET_PLAINMESSAGES_SUBSCRIPTION:
      return {
        ...state,
        plainmessages: action.payload
      };
    default:
      return state;
  }
}
