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
  SET_PLAINMESSAGES_SUBSCRIPTION,
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
} from "./types";

//graphQL 
import { onCreateFilm } from '../graphql/queries';

//import Clients for subscription.
import { client, Appclient } from '../subscribeClient';

export const setSubscriptions = (chart, itsData) => dispatch => {
  switch (chart) {
    case "0":
      dispatch({ type: SET_ROUNDLINE_SUBSCRIPTION, payload: itsData });
      // subscription and saving messages to action happens here
      if (itsData.type === "Live Data") {
        client.subscribe(itsData.topic);
        client.on("message", (topic, messageInAscii) => {
          if (topic === itsData.topic) {
            const messageInCharacter = messageInAscii.toString();
            dispatch({ type: SET_ROUNDLINE_DATA, payload: messageInCharacter });
          }
        });
      }else{
        
        Appclient.hydrated().then(function (client) {          
          const observable = client.subscribe({ query: onCreateFilm});
          const realtimeResults = function realtimeResults(data) {
              console.log('(Realtime Subscription) Subscribing posts -----------> ', data.data.onCreateFilm);
              let obj = { "sale" : data.data.onCreateFilm.episodeId, "year" : "1" };
              obj = JSON.stringify(obj);
              
              dispatch({ type: SET_ROUNDLINE_DATA, payload: obj });
          };
          observable.subscribe({
              next: realtimeResults,
              complete: console.log,
              error: console.log,
          }); 
        });
         
      }
      break;
    case "1":
      dispatch({ type: SET_STRAIGHTLINE_SUBSCRIPTION, payload: itsData });
      // subscription and saving messages to action happens here
      if (itsData.type === "Live Data") {
        client.subscribe(itsData.topic);
        client.on("message", (topic, messageInAscii) => {
          if (topic === itsData.topic) {
            const messageInCharacter = messageInAscii.toString();
            dispatch({ type: SET_STRAIGHTLINE_DATA, payload: messageInCharacter });
          }
        });
      }else{
        
        Appclient.hydrated().then(function (client) {          
          const observable = client.subscribe({ query: onCreateFilm});
          const realtimeResults = function realtimeResults(data) {
              console.log('(Realtime Subscription) Subscribing posts -----------> ', data.data.onCreateFilm);
              let obj = { "sale" : data.data.onCreateFilm.episodeId, "year" : "1" };
              obj = JSON.stringify(obj);
              
              dispatch({ type: SET_ROUNDLINE_DATA, payload: obj });
          };
          observable.subscribe({
              next: realtimeResults,
              complete: console.log,
              error: console.log,
          }); 
        });
         
      }
      break;
    case "2":
      dispatch({ type: SET_BAR_SUBSCRIPTION, payload: itsData });
      // subscription and saving messages to action happens here
      if (itsData.type === "Live Data") {
        client.subscribe(itsData.topic);
        client.on("message", (topic, messageInAscii) => {
          if (topic === itsData.topic) {
            const messageInCharacter = messageInAscii.toString();
            dispatch({ type: SET_BAR_DATA, payload: messageInCharacter });
          }
        });
      }
      break;
    case "3":
      dispatch({ type: SET_COLOUREDLINE_SUBSCRIPTION, payload: itsData });
      // subscription and saving messages to action happens here
      if (itsData.type === "Live Data") {
        client.subscribe(itsData.topic);
        client.on("message", (topic, messageInAscii) => {
          if (topic === itsData.topic) {
            const messageInCharacter = messageInAscii.toString();
            dispatch({ type: SET_COLOUREDLINE_DATA, payload: messageInCharacter });
          }
        });
      }
      break;
    case "4":
      dispatch({ type: SET_PIE_SUBSCRIPTION, payload: itsData });
      // subscription and saving messages to action happens here
      if (itsData.type === "Live Data") {
        client.subscribe(itsData.topic);
        client.on("message", (topic, messageInAscii) => {
          if (topic === itsData.topic) {
            const messageInCharacter = messageInAscii.toString();
            dispatch({ type: SET_PIE_DATA, payload: messageInCharacter });
          }
        });
      }
      break;
    case "5":
      dispatch({ type: SET_MULTIPLEBAR_SUBSCRIPTION, payload: itsData });
      // subscription and saving messages to action happens here
      if (itsData.type === "Live Data") {
        client.subscribe(itsData.topic);
        client.on("message", (topic, messageInAscii) => {
          if (topic === itsData.topic) {
            const messageInCharacter = messageInAscii.toString();
            dispatch({ type: SET_MULTIPLEBAR_DATA, payload: messageInCharacter });
          }
        });
      }
      break;
    case "6":
      dispatch({ type: SET_COLOUREDLINES_SUBSCRIPTION, payload: itsData });
      // subscription and saving messages to action happens here
      if (itsData.type === "Live Data") {
        client.subscribe(itsData.topic);
        client.on("message", (topic, messageInAscii) => {
          if (topic === itsData.topic) {
            const messageInCharacter = messageInAscii.toString();
            dispatch({ type: SET_COLOUREDLINES_DATA, payload: messageInCharacter });
          }
        });
      }
      break;
    case "7":
      dispatch({ type: SET_SPEEDOMETER_SUBSCRIPTION, payload: itsData });
      // subscription and saving messages to action happens here
      if (itsData.type === "Live Data") {
        client.subscribe(itsData.topic);
        client.on("message", (topic, messageInAscii) => {
          if (topic === itsData.topic) {
            const messageInCharacter = messageInAscii.toString();
            dispatch({ type: SET_SPEEDOMETER_DATA, payload: messageInCharacter });
          }
        });
      }
      break;
    case "8":
      dispatch({ type: SET_DONUT_SUBSCRIPTION, payload: itsData });
      // subscription and saving messages to action happens here
      if (itsData.type === "Live Data") {
        client.subscribe(itsData.topic);
        client.on("message", (topic, messageInAscii) => {
          if (topic === itsData.topic) {
            const messageInCharacter = messageInAscii.toString();
            dispatch({ type: SET_DONUT_DATA, payload: messageInCharacter });
          }
        });
      }
      break;
    case "9":
      dispatch({ type: SET_PLAINMESSAGES_SUBSCRIPTION, payload: itsData });
      // subscription and saving messages to action happens here
      if (itsData.type === "Live Data") {
        client.subscribe(itsData.topic);
        client.on("message", (topic, messageInAscii) => {
          if (topic === itsData.topic) {
            const messageInCharacter = messageInAscii.toString();
            dispatch({ type: SET_PLAINMESSAGES_DATA, payload: messageInCharacter });
          }
        });
      }
      break;
    default:
      return;
  }
};
