import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';

import FriendMarker from '../../components/FriendMarker';

import { friends } from '../../data';

export default function App() {
  const [location, setLocation] = useState(null);
  const [radius, setRadius] = useState(1609);
  const [nearbyFriends, setNearbyFriends] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (location) => {
          setLocation(location);
          console.log(location);
        }
      );
    })();
  }, []);

  useEffect(() => {
    if (location) {
      findNearbyFriends();
    }
  }, [radius, location]);

  const findNearbyFriends = () => {
    const nearbyFriends = [];
    friends.forEach((friend) => {
      let distance = getDistanceFromUser(
        location.coords.latitude,
        location.coords.longitude,
        friend.location.latitude,
        friend.location.longitude
      );
      if (distance <= radius) {
        console.log(friend.name + ' is nearby!');
        nearbyFriends.push(friend);
      }
    });
    setNearbyFriends(nearbyFriends);
  };

  function getDistanceFromUser(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = degToRad(lat2 - lat1);
    var dLon = degToRad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) *
        Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    console.log('distance', d, 'km');
    return d * 1000; // to meters
  }

  function degToRad(deg) {
    return deg * (Math.PI / 180);
  }

  function adjustRadius(action) {
    if (action === 'increase') {
      setRadius(radius + 1609);
    } else if (action === 'decrease' && radius > 1609) {
      setRadius(radius - 1609);
    }
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: location ? location.coords.latitude : 37.78825,
          longitude: location ? location.coords.longitude : -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        followsUserLocation={true}
      >
        <Circle
          center={{
            latitude: location ? location.coords.latitude : 37.78825,
            longitude: location ? location.coords.longitude : -122.4324,
          }}
          radius={radius}
          fillColor="rgba(0, 0, 255, 0.1)"
          strokeColor="rgba(0, 0, 255, 0.5)"
        />
        {nearbyFriends.map((friend) => {
          return <FriendMarker friend={friend} />;
        })}
      </MapView>
      <View style={styles.radiusButtonContainer}>
        <TouchableOpacity
          style={styles.radiusButtonLeft}
          onPress={() => adjustRadius('decrease')}
        >
          <Text style={styles.radiusButtonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radiusButtonRight}
          onPress={() => adjustRadius('increase')}
        >
          <Text style={styles.radiusButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  radiusButtonLeft: {
    backgroundColor: 'white',
    padding: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderRightWidth: 1,
    borderColor: 'black',
    width: 50,
  },
  radiusButtonRight: {
    backgroundColor: 'white',
    padding: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    width: 50,
  },
  radiusButtonContainer: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  radiusButtonText: {
    fontSize: 20,
    textAlign: 'center',
  },
});
