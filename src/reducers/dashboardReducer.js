import { GET_DASHBOARD_LAYOUT, SAVE_DASHBOARD_LAYOUT } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  layout: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DASHBOARD_LAYOUT:
      return {
        ...state,
        layout: action.payload
      };
    case SAVE_DASHBOARD_LAYOUT:
      return {
        ...state,
        layout: action.payload
      };
    default:
      return state;
  }
}
