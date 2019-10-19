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
  plainmessagesData: [],
  chartID: 0,
  newData: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ROUNDLINE_DATA+action.chartID:
      let roundlinekey = action.chartID;
      let roundlineArr = state.roundlineData;     
      let linekeyArr = Object.keys(roundlineArr)
      if(linekeyArr.indexOf(roundlinekey) !== -1){        
        roundlineArr[roundlinekey] = [action.payload, ...roundlineArr[roundlinekey]];
      }else{       
        roundlineArr[roundlinekey] = [action.payload];
      }
      return {
        ...state,
        //roundlineData: [action.payload, ...state.roundlineData]
        roundlineData: roundlineArr
      };
    case SET_STRAIGHTLINE_DATA+action.chartID:
      let straightlinekey = action.chartID;
      let straightlineArr = state.straightlineData;     
      let straightlinekeyArr = Object.keys(straightlineArr)
      if(straightlinekeyArr.indexOf(straightlinekey) !== -1){        
        straightlineArr[straightlinekey] = [action.payload, ...straightlineArr[straightlinekey]];
      }else{       
        straightlineArr[straightlinekey] = [action.payload];
      }
      return {
        ...state,
        //straightlineData: [action.payload, ...state.straightlineData]
        straightlineData: straightlineArr
      };
    case SET_BAR_DATA+action.chartID:
      let barkey = action.chartID;
      let barDataArr = state.barData;     
      let keyArr = Object.keys(barDataArr)
      if(keyArr.indexOf(barkey) !== -1){        
        barDataArr[barkey] = [action.payload, ...barDataArr[barkey]];
      }else{       
        barDataArr[barkey] = [action.payload];
      }
      return {
        ...state,
        //barData: [action.payload, ...state.barData]
        barData: barDataArr
      };
    case SET_COLOUREDLINE_DATA:
      return {
        ...state,
        colouredlineData: [action.payload, ...state.colouredlineData]
      };
    case SET_PIE_DATA+action.chartID:
      let piekey = action.chartID;
      let pieDataArr = state.pieData;     
      let piekeyArr = Object.keys(pieDataArr)
      if(piekeyArr.indexOf(piekey) !== -1){        
        pieDataArr[piekey] = [action.payload, ...pieDataArr[piekey]];
      }else{       
        pieDataArr[piekey] = [action.payload];
      }
      return {
        ...state,
        //pieData: [action.payload, ...state.pieData]
        pieData: pieDataArr
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
    case SET_SPEEDOMETER_DATA+action.chartID:
      let speedkey = action.chartID;
      let Speedometerarr = { [speedkey] : [action.payload] }
      return {
        ...state,
        //speedometerData: [action.payload, ...state.speedometerData],
        speedometerData: Speedometerarr
      };
    case SET_DONUT_DATA+action.chartID:
      let donutkey = action.chartID;
      let donutDataArr = state.donutData;     
      let donutkeyArr = Object.keys(donutDataArr)
      if(donutkeyArr.indexOf(donutkey) !== -1){        
        donutDataArr[donutkey] = [action.payload, ...donutDataArr[donutkey]];
      }else{       
        donutDataArr[donutkey] = [action.payload];
      }
      return {
        ...state,
        //donutData: [action.payload, ...state.donutData]
        donutData: donutDataArr
      };
    case SET_PLAINMESSAGES_DATA+action.chartID:
      let msgkey = action.chartID;
      let msgDataArr = state.plainmessagesData;     
      let msgkeyArr = Object.keys(msgDataArr)
      if(msgkeyArr.indexOf(msgkey) !== -1){        
        msgDataArr[msgkey] = [action.payload, ...msgDataArr[msgkey]];
      }else{       
        msgDataArr[msgkey] = [action.payload];
      }
      return {
        ...state,
        //plainmessagesData: [action.payload, ...state.plainmessagesData]
        plainmessagesData: msgDataArr
      };
    default:
      //state.chartID = action.chartID;
      return state;
  }
}
