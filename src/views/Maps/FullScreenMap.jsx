import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import PropTypes from "prop-types";
//import socketIOClient from "socket.io-client";




class FullScreenMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: "http://localhost:3000/",
      topic: '',
      msg: '',
      Topic: [],
      myArr: [],
      word: 'downlink',
      word1: 'rxinfo',
      //word1: 'stats',
      marker1: '',
      url: 'http://elancethemes.com/28/publishing_company/wp-content/uploads/2018/11/1-stage-3.gif',



    }
  }




  componentDidMount() {

  //  console.log('xxxx', this.state.url);


   // const { endpoint } = this.state;
   // const socket = socketIOClient(endpoint);
  //  socket.on('message', (data) => {

      // this.setState({
      //   topic: data.topic,
      //   msg: data.message,

      // });



      // if (this.state.topic.includes('downlink')) {


      //   this.setState({
      //     url: 'http://elancethemes.com/28/publishing_company/wp-content/uploads/2018/11/3-stage.gif'
      //   })
      //   console.log('xxxxx xxxxxxx xxxxxxx 3', this.state.url)

      // } else if (this.state.topic.includes('rxinfo')) {

      //   this.setState({
      //     url: 'http://elancethemes.com/28/publishing_company/wp-content/uploads/2018/11/2-stage.gif'
      //   })

      //   console.log('xxxxx xxxxxxx xxxxxxx 2', this.state.url)

      // }




  //  });
  }

  onMarkerClick = () => {

    console.log('xxxxxxx xxxxxx xxx');
   
  }


  render() {
    const CustomSkinMap = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap ref={(c) => this.marker = c}
          defaultZoom={13}
          defaultCenter={{ lat: 39.9075, lng: 116.39723 }}
          defaultOptions={{
            scrollwheel: false,
            zoomControl: true,
            styles: [
              {
                featureType: "water",
                stylers: [
                  { saturation: 43 },
                  { lightness: -11 },
                  { hue: "#0088ff" }
                ]
              },
              {
                featureType: "road",
                elementType: "geometry.fill",
                stylers: [
                  { hue: "#ff0000" },
                  { saturation: -100 },
                  { lightness: 99 }
                ]
              },
              {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#808080" }, { lightness: 54 }]
              },
              {
                featureType: "landscape.man_made",
                elementType: "geometry.fill",
                stylers: [{ color: "#ece2d9" }]
              },
              {
                featureType: "poi.park",
                elementType: "geometry.fill",
                stylers: [{ color: "#ccdca1" }]
              },
              {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#767676" }]
              },
              {
                featureType: "road",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#ffffff" }]
              },
              { featureType: "poi", stylers: [{ visibility: "off" }] },
              {
                featureType: "landscape.natural",
                elementType: "geometry.fill",
                stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
              },
              { featureType: "poi.park", stylers: [{ visibility: "on" }] },
              {
                featureType: "poi.sports_complex",
                stylers: [{ visibility: "on" }]
              },
              { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
              {
                featureType: "poi.business",
                stylers: [{ visibility: "simplified" }]
              }
            ]
          }}

        >
          <Marker onClick={this.onMarkerClick}
            name={'Current location1'}
            icon={{ url: this.state.url }}
            position={{ lat: 39.902679, lng: 116.364183 }} />
          <Marker onClick={this.onMarkerClick}
            name={'Current location2'}
            icon={{ url: this.state.url }}
            position={{ lat: 39.907288, lng: 116.422720 }} />
         

          {/* <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>eeee</h1>
            </div>
          </InfoWindow> */}
        </GoogleMap>
      ))

    );

    const { classes } = this.props;
    return (
      <div>
        <CustomSkinMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBZMFhAEFBEZJXqSE651aFhgYwmeSPBYBo"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />

      </div>
    );

  }
}




//export default withStyles(TestPageStyle)(TestPage);

export default FullScreenMap;
