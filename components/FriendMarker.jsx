import { Marker, Callout } from 'react-native-maps';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';

export default function FriendMarker({ friend }) {
  return (
    <Marker
      key={friend.name}
      coordinate={{
        latitude: friend.location.latitude,
        longitude: friend.location.longitude,
      }}
      title={friend.name}
    >
      <Callout>
        <View style={styles.callout}>
          <Text style={styles.calloutText}>{friend.name}</Text>
          <Link push href={`/${friend.name}`} asChild>
            <TouchableOpacity
              onPress={() => console.log('callout button pressed')}
              style={styles.calloutButton}
            >
              <Text style={styles.calloutButtonText}>Chat</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </Callout>
    </Marker>
  );
}

const styles = StyleSheet.create({
  callout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calloutText: {
    fontSize: 20,
  },
  calloutButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  calloutButtonText: {
    color: 'white',
  },
});
