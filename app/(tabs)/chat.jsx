import { View, Text, Button } from 'react-native';
import { useUserStore } from '../../store/store';

export default function ChatHome() {
  const user = useUserStore((state) => state.user);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Main Chat Screen for {user}</Text>
    </View>
  );
}
