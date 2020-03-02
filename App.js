/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {
  Marker,
  Callout,
  PROVIDER_GOOGLE,
  Polygon,
  Polyline,
} from 'react-native-maps';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/MaterialIcons';

//const GOOGLE_MAPS_APIKEY = 'AIzaSyAGKFNn0Gk9EFj35JTLG5G77RQ3XHD8hH8';
// const origin = {latitude: 24.814783, longitude: 67.07097};
const destination = {latitude: 24.81859, longitude: 67.045441};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        showsUserLocation: true,
      },
    };
  }

  componentWillMount() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            ...this.state.region,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          },
        });
      },
      error => this.setState({error: error.message}),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 2000},
    );
  }

  render() {
    return (
      <View style={styles.Container}>
        <View style={styles.map}>
          <MapView
            provider={PROVIDER_GOOGLE}
            showsUserLocation={this.state.showsUserLocation}
            showsMyLocationButton={true}
            style={{
              flex: 1,
            }}
            region={this.state.region}>
            {/* {<Marker coordinate={this.state} /> } */}

            {
              <MapViewDirections
                origin={this.state.region}
                destination={destination}
                apikey={'AIzaSyAGKFNn0Gk9EFj35JTLG5G77RQ3XHD8hH8'}
                strokeWidth={3}
                strokeColor="blue"
              />
            }
          </MapView>
        </View>

        <View style={styles.locationpickup}>
          <View style={styles.locationicon}>
            <TouchableOpacity
              onPress={() => this.setState({showsUserLocation: true})}>
              <Icon name="my-location" size={30} />
            </TouchableOpacity>
          </View>

          <View style={{alignItems: 'center'}}>
            <TextInput
              style={styles.inputcontainer1}
              placeholder="Enter Pickup"
            />
            <TextInput
              style={styles.inputcontainer2}
              placeholder="Enter Dropoff"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },

  map: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },

  locationpickup: {
    flex: 1,
    justifyContent: 'space-between',
    //alignItems:"center",
    //backgroundColor:'green'
  },

  locationicon: {
    alignItems: 'flex-end',
    marginTop: wp('5%'),
    marginRight: wp('4%'),
  },

  inputcontainer1: {
    width: wp('70%'),
    height: hp('6%'),
    backgroundColor: 'white',
    color: '#7c848b',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    borderColor: '#ddd',
    fontSize: wp('4%'),
    marginBottom: wp('2%'),
    paddingLeft: wp('3%'),
    //marginBottom:hp('4%'),
  },

  inputcontainer2: {
    width: wp('70%'),
    height: hp('6%'),
    backgroundColor: 'white',
    color: '#7c848b',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    borderColor: '#ddd',
    fontSize: wp('4%'),
    marginBottom: wp('2%'),
    paddingLeft: wp('3%'),
    marginBottom: hp('4%'),
  },
});

export default App;
