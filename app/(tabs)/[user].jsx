import { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';

export default function ChatUser() {
  const local = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: local.user });
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>User: {local.user}</Text>
    </View>
  );
}
