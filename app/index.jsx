import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { router } from 'expo-router';
import { UserContext } from '../context/UserContext';
import { auth } from '../firebaseConfig';

export default function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const { setUsername } = useContext(UserContext);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        const response = await fetch(
          'http://192.168.1.169:3000/api/users/signin',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          }
        );
        const data = await response.json();
        console.log('name', data);
        setUsername(data);
        router.replace('/(tabs)');
      }
    } catch (error) {
      setError(true);
      console.log('Error signing in: ', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.title}>Jamd</Text>
        <TextInput
          style={styles.textBox}
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
          autoComplete="email"
          placeholder="Email"
          placeholderTextColor={'#000'}
        />
        <TextInput
          style={styles.textBox}
          onChangeText={setPassword}
          value={password}
          autoCapitalize="none"
          autoComplete="password"
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor={'#000'}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/signup')}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        {error && <Text style={styles.error}>Incorrect email or password</Text>}
      </KeyboardAvoidingView>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    height: 60,
    width: 200,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  error: {
    color: 'red',
    fontSize: 20,
  },
  textBox: {
    height: 50,
    width: 250,
    borderColor: 'gray',
    borderWidth: 2,
    margin: 10,
    borderRadius: 5,
    paddingLeft: 10,
  },
  title: {
    fontSize: 100,
    margin: 20,
  },
});
