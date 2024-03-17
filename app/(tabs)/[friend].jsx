import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import socket from '../../utils/socket';
import ChatBubble from '../../components/ChatBubble';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export default function ChatUser() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const { username } = useContext(UserContext);

  const local = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: local.friend });
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
  }, [local.friend]);

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
            sender: `${username[0]} ${username[1]}`,
            receiver: local.friend,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const messages = await response.json();
      // console.log('data:', data);
      // const messages = data.map((message) => message.message);
      // console.log('messages:', messages);
      setMessages(messages);
    } catch (err) {
      console.log('Error:', err);
    }
  };

  const sendMessage = async () => {
    message = {
      sender: `${username[0]} ${username[1]}`,
      receiver: local.friend,
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
    // const data = await response.json();
    // console.log(data);
    Keyboard.dismiss();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FlatList
        data={messages}
        style={{ backgroundColor: '#eeeeee', width: '100%', marginBottom: 10 }}
        renderItem={({ item, index }) => {
          if (item.sender === `${username[0]} ${username[1]}`) {
            console.log(item);
            return (
              <ChatBubble
                sender="user"
                message={item.message}
                index={item._id}
                key={item._id}
              />
            );
          }
          return (
            <ChatBubble
              sender="friend"
              message={item.message}
              index={item._id}
              key={item._id}
            />
          );
        }}
        keyExtractor={(item) => {
          return item._id;
        }}
        scrollEnabled={true}
      ></FlatList>
      <KeyboardAvoidingView
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          flexDirection: 'row',
        }}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <TextInput
          value={currentMessage}
          onChangeText={setCurrentMessage}
          style={{
            height: 40,
            width: '80%',
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 20,
            backgroundColor: 'white',
            paddingVertical: 10,
            paddingHorizontal: 20,
            margin: 10,
          }}
          autoFocus={false}
        />
        {/* <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 5,
            margin: 10,
            height: 60,
            width: 200,
          }}
          title="Send Message"
          onPress={sendMessage}
        >
          <Text style={{ color: 'white', fontSize: 20 }}>Send Message</Text>
        </TouchableOpacity> */}
        <Pressable
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            backgroundColor: 'blue',
            padding: 10,
            paddingRight: 11,
            borderRadius: 999,
            margin: 10,
            // height: 60,
            // width: 200,
          }}
          onPress={sendMessage}
        >
          <FontAwesome size={20} name="paper-plane" color={'white'} />
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
}
