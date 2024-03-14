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
  const [currentMessage, setCurrentMessage] = useState('');

  const local = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: local.user });
    getMessages();
    setCurrentMessage('');
    socket.connect();
    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message.message]);
    });
    return () => {
      socket.off('message');
      socket.disconnect();
    };
  }, [local.user]);

  const getMessages = async () => {
    try {
      const response = await fetch(
        'http://192.168.1.169:3000/api/messages/getall',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sender: 'Jake Crawford',
            receiver: local.user,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const messages = data.map((message) => message.message);
      setMessages(messages);
    } catch (err) {
      console.log('Error:', err);
    }
  };

  const sendMessage = async () => {
    message = {
      sender: 'Jake Crawford',
      receiver: local.user,
      message: currentMessage,
      time: Date.now(),
    };
    socket.emit('message', message);
    setCurrentMessage('');
    const response = await fetch(
      'http://192.168.1.169:3000/api/messages/write',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>User: {local.user}</Text>
        {messages.map((message, index) => (
          <Text key={index}>{message}</Text>
        ))}
        <TextInput
          value={currentMessage}
          onChangeText={setCurrentMessage}
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
