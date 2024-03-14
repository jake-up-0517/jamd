import { View, Text, Button } from 'react-native';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export default function ChatHome() {
  const { username } = useContext(UserContext);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Main Chat Screen for {username}</Text>
    </View>
  );
}
