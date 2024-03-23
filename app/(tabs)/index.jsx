import { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useUserStore, useLocationStore } from '../../store/store';
import {
  getLocation,
  getAllFriends,
  findNearbyFriends,
} from '../../utils/helpers';

export default function Home() {
  const user = useUserStore((state) => state.user);
  const email = useUserStore((state) => state.email);
  const radius = useLocationStore((state) => state.radius);
  const nearbyFriends = useUserStore((state) => state.nearbyFriends);
  const setLocation = useLocationStore((state) => state.setLocation);
  const setAllFriends = useUserStore((state) => state.setAllFriends);
  const setNearbyFriends = useUserStore((state) => state.setNearbyFriends);

  useEffect(() => {
    (async () => {
      const friends = await getAllFriends(email);
      const location = await getLocation(email);
      const nearbyFriends = await findNearbyFriends(friends, location, radius);
      setAllFriends(friends);
      setLocation(location);
      setNearbyFriends(nearbyFriends);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello {user}</Text>
      <Link href="/map" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} numberOfLines={2}>
            In a Jam?{'\n'}See who can help!
          </Text>
        </TouchableOpacity>
      </Link>
      <Link Link push href={`/Jarod Crawford`} asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} numberOfLines={2}>
            Chat
          </Text>
        </TouchableOpacity>
      </Link>
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
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
    margin: 10,
    width: 200,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  title: {
    fontSize: 40,
    margin: 20,
  },
});
