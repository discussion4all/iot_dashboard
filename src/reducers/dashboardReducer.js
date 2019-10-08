import { GET_DASHBOARD_LAYOUT, SAVE_DASHBOARD_LAYOUT, 
         SAVE_CHARTS_CONFIG, GET_CHARTS_CONFIG } from "../actions/types";

const initialState = {
  layout: [],
  config:[],
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
    case SAVE_CHARTS_CONFIG:
      return {
        ...state,
        layout: action.payload
      };
    case GET_CHARTS_CONFIG:
      return {
        ...state,
        config: action.payload
      };    
    default:
      return state;
  }
}
