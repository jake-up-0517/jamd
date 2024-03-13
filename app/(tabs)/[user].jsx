import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import socket from '../../utils/socket';

export default function ChatUser() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const local = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: local.user });
    setMessages([]);
    setMessage('');
    socket.connect();
    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => {
      socket.off('message');
      socket.disconnect();
    };
  }, [local.user]);

  const sendMessage = () => {
    socket.emit('message', message);
    setMessage('');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>User: {local.user}</Text>
        {messages.map((message, index) => (
          <Text key={index}>{message}</Text>
        ))}
        <TextInput
          value={message}
          onChangeText={setMessage}
          style={{
            height: 40,
            width: 100,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          autoFocus={false}
        />
        <Button title="Send Message" onPress={sendMessage} />
      </View>
    </TouchableWithoutFeedback>
  );
}
