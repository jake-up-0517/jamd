import { Marker, Callout } from 'react-native-maps';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';

export default function FriendMarker({ friend }) {
  const fullName = `${friend.first_name} ${friend.last_name}`;
  return (
    <Marker
      key={friend.last_name}
      coordinate={{
        latitude: friend.latitude,
        longitude: friend.longitude,
      }}
      title={fullName}
    >
      <Callout>
        <View style={styles.callout}>
          <Text style={styles.calloutText}>{fullName}</Text>
          <Link push href={`/${fullName}`} asChild>
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
    marginBottom: 10,
  },
  calloutButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
  },
  calloutButtonText: {
    color: 'white',
  },
});
