import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { router } from 'expo-router';
import { useUserStore } from '../../store/store';
import { auth } from '../../firebaseConfig';

export default function Settings() {
  const setUser = useUserStore((state) => state.setUser);
  const setUserEmail = useUserStore((state) => state.setUserEmail);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      if (!auth.currentUser) {
        setUser(null);
        setUserEmail(null);
        router.replace('/');
      }
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});
