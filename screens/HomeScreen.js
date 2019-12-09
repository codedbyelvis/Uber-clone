import React from 'react';
import {
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
    Dimensions,
    InteractionManager,
} from 'react-native';
import {
    MapView,
    Constants,
    Location,
    Permissions,
} from 'expo';

import { DestinationButton } from '../components/DestinationButton';
import { CurrentLocationButton } from '../components/CurrentLocationButton';
import { Driver } from '../components/Driver';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);

        this.state = {
            location: null,
            region: {
                latitude: 36.174465,
                longitude: -86.767960,
                latitudeDelta: 0.045,
                longitudeDelta: 0.045,
            },
            drivers: [{uid: 1, location: { latitude: 36.174465, longitude: -86.767960,}}],
            prevDrivers: [],
            route: null,
            coordinate: new MapView.AnimatedRegion({
                latitude: 36.174465,
                longitude: -86.767960,
            })
        };
    }
        componentWillMount() {
            if (Platform.OS === 'android' && !Constants.isDevice) {
                console.log('This sketch may not work on emulators')
            } else {
                this._getLocationAsync(() => {});
            }
        }
    
        render() {
            return(
               <View style={StyleSheet.container}>
                   {/* { this.componentOverlay() } */}
                   <MapView
                   initialRegion={this.state.region}
                   showsCompass={false}
                   showUserLocation={true}
                   followUserLocation={true}
                   rotateEnabled={false}
                   ref={(map) => (this.map = map)}
                   style={styles.map} >

                       <Driver driver={this.state.drivers[0]} />

                   </MapView>
               </View> 
            )
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
        map: {
            width: WIDTH,
            height: HEIGHT,
            zIndex: 0,
        }
    })