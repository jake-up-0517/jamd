import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { router } from 'expo-router';
import { useUserStore } from '../store/store';
import { auth } from '../firebaseConfig';

export default function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(null);
  const setUser = useUserStore((state) => state.setUser);
  const setUserEmail = userUseStore((state) => state.setUserEmail);

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
        setUser(data[0] + ' ' + data[1]);
        setUserEmail(email);
        router.replace('/(tabs)');
      }
    } catch (error) {
      // setError(true);
      console.log('Error signing up: ', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.textBox}
          onChangeText={setFirstName}
          value={firstName}
          placeholder="First Name"
          placeholderTextColor={'#000'}
          autoComplete="given-name"
        />
        <TextInput
          style={styles.textBox}
          onChangeText={setLastName}
          value={lastName}
          placeholder="Last Name"
          placeholderTextColor={'#000'}
          autoComplete="family-name"
        />
        <TextInput
          style={styles.textBox}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          placeholderTextColor={'#000'}
          autoCapitalize="none"
          autoComplete="email"
        />
        <TextInput
          style={styles.textBox}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          placeholderTextColor={'#000'}
          autoCapitalize="none"
          autoComplete="password"
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Back to Login</Text>
        </TouchableOpacity>
        {/* {error && <Text style={styles.error}>Incorrect email or password</Text>} */}
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
    fontSize: 75,
    margin: 20,
  },
});
