import { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Link } from 'expo-router';
import { UserContext } from '../context/UserContext';

export default function Login() {
  const { setUsername, username } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          height: 40,
          width: 100,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        onChangeText={setUsername}
        value={username}
      />
      <Link replace href="/(tabs)" asChild>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setUsername(username)}
        >
          <Text style={styles.buttonText}>Login</Text>
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
