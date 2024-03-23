import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MapView, { Circle } from 'react-native-maps';

import FriendMarker from '../../components/FriendMarker';
import { useUserStore, useLocationStore } from '../../store/store';
import { findNearbyFriends, adjustRadius } from '../../utils/helpers';

export default function Map() {
  const location = useLocationStore((state) => state.location);
  const radius = useLocationStore((state) => state.radius);
  const allFriends = useUserStore((state) => state.allFriends);
  const nearbyFriends = useUserStore((state) => state.nearbyFriends);
  const setRadius = useLocationStore((state) => state.setRadius);

  useEffect(() => {
    console.log(radius);
    findNearbyFriends(allFriends, location, radius);
  }, [location, radius]);

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
          return <FriendMarker key={friend.first_name} friend={friend} />;
        })}
      </MapView>
      <View style={styles.radiusButtonContainer}>
        <TouchableOpacity
          style={styles.radiusButtonLeft}
          onPress={() => {
            setRadius(adjustRadius('decrease', radius));
          }}
        >
          <Text style={styles.radiusButtonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radiusButtonRight}
          onPress={() => setRadius(adjustRadius('increase', radius))}
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
