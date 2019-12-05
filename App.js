import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView, Permissions, Location } from 'expo';

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

  render() {
  return (
    <View style={styles.container}>
      <Text>Homescreen</Text>
      <MapView 
        initalRegion={this.state.region}
        showsUserLocation={true}
        showsCompass={true}
        rotateEnabled={false}
        style={{flex: 1}}
      />
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
