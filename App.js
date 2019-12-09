import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView, Permissions, Location } from 'expo';

import { DestinationButton } from './components/DestinationButton';
import { CurrentLocationButton } from './components/CurrentLocationButton';
import { Driver } from './components/Driver';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: null,
    }

    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if(status !== 'granted')
      console.log('Permission to access location was denied.');
      
   let location = await Location.getCurrentPositionAsync({enabledHighAccuracy: true});
   let region = {
     latitude: location.coords.latitude,
     longitude: location.coords.longitude,
     latitudeDelta: 0.045,
     longitudeDelta: 0.045,
   }
   
   this.setState({region: region})
  }

  centerMap () {
    const { 
      latitude, 
      longitude, 
      latitudeDelta, 
      longitudeDelta} = this.state.region;

    this.map.animateToRegion({
      latitude,
      longitude, 
      latitudeDelta, 
      longitudeDelta
    })
  }

  render() {
  return (
    <View style={styles.container}>
      <Text>Homescreen</Text>
      <DestinationButton />
      <CurrentLocationButton cb={() => { this.centerMap() }}/>
      
      <MapView 
        initalRegion={this.state.region}
        showsUserLocation={true}
        showsCompass={true}
        rotateEnabled={false}
        ref={(map) => {this.map = map}}
        style={{flex: 1}}>
      <Driver driver={{uid: 'null', location: {
        latitude: 36.102820,
        longitude: -86.817040,
      }}} />
      </MapView>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
