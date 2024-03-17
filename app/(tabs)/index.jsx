import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export default function Home() {
  const { username } = useContext(UserContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello {username[0]}</Text>
      <Link href="/map" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} numberOfLines={2}>
            In a Jam?{'\n'}See who can help!
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
    fontSize: 50,
    margin: 20,
  },
});
