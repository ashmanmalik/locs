

import React, { Component } from 'react';
import {
  Text,
  View, 
  Button
} from 'react-native';


export default class App extends Component<{}> {
  
  constructor(props) { 
    super(props);
    this.state = { 
      latitude: null, 
      longitude: null, 
      error: null, 
      currentlat: null, 
      currentlon: null,
      distance: null  
    };
  }

  componentDidMount() {
 
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({ 
          latitude : position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
         });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 500, maximumAge: 500, distanceFilter: 0.1}, 
    //  { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000, distanceFilter: 10},
    );
    
    this.distance();
    this.distance();
    // Calculating the Second Geographical position

}

   distance = () => { 
    const Dams = { 
      latitude: -27.463950, 
      longitude: 153.035773
    }
    //const currentpos = this.state.position.coords.latitude;
    this.setState({ currentlat: this.state.latitude, currentlon: this.state.longitude });
    
    console.log(this.state.currentlat);
    console.log(this.state.currentlon);
    console.log(Dams.latitude);
    console.log(Dams.longitude);
    
    //return this.distcalculate(Dams.latitude, Dams.longitude, this.state.currentlat, this.state.currentlon);
    this.setState({ distance: this.distcalculate(Dams.latitude, Dams.longitude, this.state.currentlat, this.state.currentlon)});
  }
  /* 
  // This Algorithm is working but The results works on the basis of earth surface.

  // Calculate the distance between two Coordinates
   distcalculate = (lat1, lon1, lat2, lon2 ) => {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;

    var finaldistanceinmiles = dist.toFixed(2);
    //alert(finaldistanceinmiles);

    // Convert distance from miles to kilometers.
    // Can use another algorithm later as well.

    var kilometers = finaldistanceinmiles / 0.62137; 
    alert( kilometers);

    return kilometers;
  }
  */

  distcalculate = (lat1, lon1, lat2, lon2 ) => {
    /*
    // This Algorithm works under the 
    var _radtokm = 6317;
    
    var dlat = lat2 - lat1;
    var dlon = lon2 - lon1;
    
    dlat = dlat * Math.PI/180;
    dlon = dlon * Math.PI/180;

    var dist = Math.sin(dlat/2) * Math.sin(dlat/2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon/2) * Math.sin(dlon/2);
    var distinometers = 2 * Math.atan2(Math.sqrt(dist), Math.sqrt(1 - dist));
    var distinkilometers = _radtokm * distinometers;
    
    alert(distinkilometers);

    return distinkilometers;
    */
    
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
    //var test = 12742 * Math.asin(Math.sqrt(a)); 
    
    var test = 12742 * Math.asin(Math.sqrt(a));
    //alert(test);
    return test;

  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }
  
  onButtonPress = () => {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({ 
          latitude : position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
         });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 500, maximumAge: 500}, 
    //  { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000, distanceFilter: 10},
    );
    //alert("Latitude" + this.state.latitude + " Longitude " +  this.state.longitude);

    this.distance();
  }

  render() {
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>

      <Text> My Current Location </Text>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        <Text> {this.state.error ? this.state.error : null } </Text>

        <Text> Distance : { this.state.distance } km </Text>

        <Button
          onPress = { this.onButtonPress }
          title = "Update Location"
          color = "#841584"
        />

     </View>
    );
  }
}
