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
      dispatch({ type: SET_ROUNDLINE_SUBSCRIPTION+itsData.chartID, payload: itsData, chartID:itsData.chartID });
      // subscription and saving messages to action happens here
      if (itsData.type === "Live Data") {
        // client.subscribe(itsData.topic);
        // client.on("message", (topic, messageInAscii) => {
        //   if (topic === itsData.topic) {
        //     const messageInCharacter = messageInAscii.toString();
        //     dispatch({ type: SET_ROUNDLINE_DATA, payload: messageInCharacter });
        //   }
        // });

        let subscibeTopic = '_OVES/V1.1/'+itsData.deviceType;
          if(itsData.deviceID === null || itsData.deviceID === undefined || itsData.deviceID === ''){

            subscibeTopic = subscibeTopic+ '/#';
          }else{

            subscibeTopic = subscibeTopic + '/' + itsData.deviceID + '/#';
          }
          client.subscribe(subscibeTopic);
          client.on("message", (topic, messageInAscii) => {

              var array = topic.split('/');          
              let topicValue = array[array.length - 1];   

              let deviceID = array[3];
              let linetData = { year : deviceID , sale: topicValue};         
              //console.log(barchartData);
              if(topic.indexOf(subscibeTopic.substring(0,subscibeTopic.length - 1)) >= 0){

                 dispatch({ type: SET_ROUNDLINE_DATA+itsData.chartID, payload: JSON.stringify(linetData), chartID: itsData.chartID });  
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
      dispatch({ type: SET_STRAIGHTLINE_SUBSCRIPTION+itsData.chartID, payload: itsData, chartID: itsData.chartID });
      // subscription and saving messages to action happens here
      if (itsData.type === "Live Data") {
        // client.subscribe(itsData.topic);
        // client.on("message", (topic, messageInAscii) => {
        //   if (topic === itsData.topic) {
        //     const messageInCharacter = messageInAscii.toString();
        //     dispatch({ type: SET_STRAIGHTLINE_DATA, payload: messageInCharacter });
        //   }
        // });

        let subscibeTopic = '_OVES/V1.1/'+itsData.deviceType;
          if(itsData.deviceID === null || itsData.deviceID === undefined || itsData.deviceID === ''){

            subscibeTopic = subscibeTopic+ '/#';
          }else{

            subscibeTopic = subscibeTopic + '/' + itsData.deviceID + '/#';
          }
          client.subscribe(subscibeTopic);
          client.on("message", (topic, messageInAscii) => {

              var array = topic.split('/');          
              let topicValue = array[array.length - 1];   

              let deviceID = array[3];
              let linetData = { year : deviceID , sale: topicValue};         
              //console.log(barchartData);
              if(topic.indexOf(subscibeTopic.substring(0,subscibeTopic.length - 1)) >= 0){
                 dispatch({ type: SET_STRAIGHTLINE_DATA+itsData.chartID, payload: JSON.stringify(linetData), chartID: itsData.chartID });  
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
      dispatch({ type: SET_BAR_SUBSCRIPTION+itsData.chartID, payload: itsData, chartID: itsData.chartID });
      // subscription and saving messages to action happens here
      
      // if (itsData.type === "Live Data") {
      //   client.subscribe(itsData.topic);
      //   client.on("message", (topic, messageInAscii) => {
      //     if (topic === itsData.topic) {
      //       const messageInCharacter = messageInAscii.toString();
      //       dispatch({ type: SET_BAR_DATA, payload: messageInCharacter });
      //     }
      //   });
      // }

      if (itsData.type === "Live Data"){
          //console.log('its Data..',itsData);
          let subscibeTopic = '_OVES/V1.1/'+itsData.deviceType;
          if(itsData.deviceID === null || itsData.deviceID === undefined || itsData.deviceID === ''){

            subscibeTopic = subscibeTopic+ '/#';
          }else{

            subscibeTopic = subscibeTopic + '/' + itsData.deviceID + '/#';
          }
          client.subscribe(subscibeTopic);
          client.on("message", (topic, messageInAscii) => {

              var array = topic.split('/');          
              let topicValue = array[array.length - 1];   

              let deviceID = array[3];
              let barchartData = { year : deviceID , value: topicValue/100};         
              //console.log(barchartData);
              if(topic.indexOf(subscibeTopic.substring(0,subscibeTopic.length - 1)) >= 0){

                 dispatch({ type: SET_BAR_DATA+itsData.chartID, payload: JSON.stringify(barchartData), chartID: itsData.chartID });  
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
      dispatch({ type: SET_PIE_SUBSCRIPTION+itsData.chartID, payload: itsData, chartID: itsData.chartID });
      // subscription and saving messages to action happens here
      if (itsData.type === "Live Data") {
        // client.subscribe(itsData.topic);
        // client.on("message", (topic, messageInAscii) => {
        //   if (topic === itsData.topic) {
        //     const messageInCharacter = messageInAscii.toString();
        //     dispatch({ type: SET_PIE_DATA, payload: messageInCharacter });
        //   }
        // });

        let subscibeTopic = '_OVES/V1.1/'+itsData.deviceType;
          if(itsData.deviceID === null || itsData.deviceID === undefined || itsData.deviceID === ''){

            subscibeTopic = subscibeTopic+ '/#';
          }else{

            subscibeTopic = subscibeTopic + '/' + itsData.deviceID + '/#';
          }
          client.subscribe(subscibeTopic);
          client.on("message", (topic, messageInAscii) => {

              var array = topic.split('/');          
              let topicValue = array[array.length - 1];   

              let deviceID = array[3];
              let barchartData = { year : deviceID , value: topicValue/100};         
              //console.log(barchartData);
              if(topic.indexOf(subscibeTopic.substring(0,subscibeTopic.length - 1)) >= 0){

                 dispatch({ type: SET_PIE_DATA+itsData.chartID, payload: JSON.stringify(barchartData), chartID: itsData.chartID });  
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
      dispatch({ type: SET_SPEEDOMETER_SUBSCRIPTION+itsData.chartID, payload: itsData , chartID: itsData.chartID });
      // subscription and saving messages to action happens here
      if (itsData.type === "Live Data") {
        
        let subscibeTopic = '_OVES/V1.1/'+itsData.deviceType;
        if(itsData.deviceID === null || itsData.deviceID === undefined || itsData.deviceID === ''){

            subscibeTopic = subscibeTopic+ '/#';
        }else{

            subscibeTopic = subscibeTopic + '/' + itsData.deviceID + '/#';
        }
        client.subscribe(subscibeTopic);
        client.on("message", (topic, messageInAscii) => {                
          var array = topic.split('/');          
          let topicValue = array[array.length - 1];
          console.log(topic,'subscibeTopic...',subscibeTopic); 
          if(topic.indexOf(subscibeTopic.substring(0,subscibeTopic.length - 1)) >= 0){

            dispatch({ type: SET_SPEEDOMETER_DATA+itsData.chartID, payload: topicValue , chartID: itsData.chartID });  
          }
                  
          
          // if (topic === itsData.topic) {            
          //   const messageInCharacter = messageInAscii.toString();
          //   dispatch({ type: SET_SPEEDOMETER_DATA, payload: messageInCharacter });
          // }
        });
      }
      break;
    case "8":
      dispatch({ type: SET_DONUT_SUBSCRIPTION+itsData.chartID, payload: itsData, chartID: itsData.chartID });
      // subscription and saving messages to action happens here
      if (itsData.type === "Live Data") {

        // client.subscribe(itsData.topic);
        // client.on("message", (topic, messageInAscii) => {
        //   if (topic === itsData.topic) {
        //     const messageInCharacter = messageInAscii.toString();
        //     dispatch({ type: SET_DONUT_DATA, payload: messageInCharacter });
        //   }
        // });

        let subscibeTopic = '_OVES/V1.1/'+itsData.deviceType;
        if(itsData.deviceID === null || itsData.deviceID === undefined || itsData.deviceID === ''){
            subscibeTopic = subscibeTopic+ '/#';
        }else{

            subscibeTopic = subscibeTopic + '/' + itsData.deviceID + '/#';
        }
        client.subscribe(subscibeTopic);
        client.on("message", (topic, messageInAscii) => {                
           var array = topic.split('/');          
              let topicValue = array[array.length - 1];   

              let deviceID = array[3];
              let donutchartData = { name : deviceID , value: topicValue/100};         
              //console.log(barchartData);
              if(topic.indexOf(subscibeTopic.substring(0,subscibeTopic.length - 1)) >= 0){

                 dispatch({ type: SET_DONUT_DATA+itsData.chartID, payload: JSON.stringify(donutchartData), chartID: itsData.chartID });  
              }               
        });
      }
      break;
    case "9":
      dispatch({ type: SET_PLAINMESSAGES_SUBSCRIPTION+itsData.chartID, payload: itsData, chartID: itsData.chartID });
      // subscription and saving messages to action happens here
      if (itsData.type === "Live Data") {
        // client.subscribe(itsData.topic);
        // client.on("message", (topic, messageInAscii) => {
        //   if (topic === itsData.topic) {
        //     const messageInCharacter = messageInAscii.toString();
        //     dispatch({ type: SET_PLAINMESSAGES_DATA+itsData.chartID, payload: messageInCharacter, chartID: itsData.chartID });
        //   }
        // });

        let subscibeTopic = '_OVES/V1.1/'+itsData.deviceType;
        if(itsData.deviceID === null || itsData.deviceID === undefined || itsData.deviceID === ''){
            subscibeTopic = subscibeTopic+ '/#';
        }else{

            subscibeTopic = subscibeTopic + '/' + itsData.deviceID + '/#';
        }
        client.subscribe(subscibeTopic);
        client.on("message", (topic, messageInAscii) => {                
          var array = topic.split('/');          
          let topicValue = array[array.length - 1];
          console.log(topic,'subscibeTopic...',subscibeTopic); 
          if(topic.indexOf(subscibeTopic.substring(0,subscibeTopic.length - 1)) >= 0){

            dispatch({ type: SET_PLAINMESSAGES_DATA+itsData.chartID, payload: topicValue , chartID: itsData.chartID });  
          }                
        });
      }
      break;
    default:
      return;
  }
};
