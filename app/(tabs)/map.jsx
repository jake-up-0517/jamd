import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import * as Location from 'expo-location';

import FriendMarker from '../../components/FriendMarker';

export default function App() {
  const [location, setLocation] = useState(null);
  const [radius, setRadius] = useState(1609);
  const [allFriends, setAllFriends] = useState([]);
  const [nearbyFriends, setNearbyFriends] = useState([]);

  //get all friends and watch user location
  useEffect(() => {
    getAllFriends();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (location) => {
          setLocation(location);
          // console.log(location);
        }
      );
    })();
  }, []);

  //find nearby friends on location or radius change
  useEffect(() => {
    if (location) {
      findNearbyFriends();
    }
  }, [radius, location]);

  const getAllFriends = async () => {
    try {
      const response = await fetch(
        'http://192.168.1.169:3000/api/friends/getall',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const friends = await response.json();
      setAllFriends(friends);
    } catch (err) {
      console.log('Error:', err);
    }
  };

  const findNearbyFriends = () => {
    const nearbyFriends = [];
    // console.log('finding nearby friends');
    allFriends.forEach((friend) => {
      let distance = getDistanceFromUser(
        location.coords.latitude,
        location.coords.longitude,
        friend.latitude,
        friend.longitude
      );
      if (distance <= radius) {
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
    return d * 1000; // to meters
  }

  function degToRad(deg) {
    return deg * (Math.PI / 180);
  }

  function adjustRadius(action) {
    if (action === 'increase' && radius < 16093) {
      setRadius(radius + 1609);
    } else if (action === 'decrease' && radius > 1609) {
      setRadius(radius - 1609);
    }
  }

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Finding user location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
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
          return <FriendMarker key={friend.id} friend={friend} />;
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
