import { View, Text, Button } from 'react-native';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export default function Home() {
  const { username } = useContext(UserContext);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello {username}</Text>
    </View>
  );
}
