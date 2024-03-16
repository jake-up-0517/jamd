import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { router } from 'expo-router';
import { UserContext } from '../context/UserContext';
import { auth } from '../firebaseConfig';

export default function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(null);
  const { setUsername } = useContext(UserContext);

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        const response = await fetch(
          'http://192.168.1.169:3000/api/users/signup',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, email }),
          }
        );
        const data = await response.json();
        console.log('name', data);
        setUsername(data);
        router.replace('/(tabs)');
      }
    } catch (error) {
      // setError(true);
      console.log('Error signing up: ', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TextInput
          style={{
            height: 40,
            width: 100,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          onChangeText={setFirstName}
          value={firstName}
        />
        <TextInput
          style={{
            height: 40,
            width: 100,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          onChangeText={setLastName}
          value={lastName}
        />
        <TextInput
          style={{
            height: 40,
            width: 100,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={{
            height: 40,
            width: 100,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        {/* {error && <Text style={styles.error}>Incorrect email or password</Text>} */}
      </View>
    </TouchableWithoutFeedback>
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
  error: {
    color: 'red',
    fontSize: 20,
  },
});
