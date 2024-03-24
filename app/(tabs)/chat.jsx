import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useUserStore } from '../../store/store';

export default function ChatHome() {
  const user = useUserStore((state) => state.user);
  return (
    <View style={styles.container}>
      <Link href="/map" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} numberOfLines={2}>
            Chat with nearby friends!
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
    width: 250,
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
