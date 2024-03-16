import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export default function Home() {
  const { username } = useContext(UserContext);
  return (
    <View style={styles.container}>
      <Text>Hello {username}</Text>
      <Link href="/map" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>See who's around</Text>
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
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});
