import { useEffect, useState, useRef } from 'react';
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
import { useUserStore } from '../../store/store';

export default function ChatUser() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');

  const user = useUserStore((state) => state.user);

  const flatListRef = useRef();

  const local = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    console.log('in use effect');
    navigation.setOptions({ title: local.friend });
    socket.connect();
    socket.on('message', (message) => {
      console.log('socket message:', message);
      setMessages((prev) => [
        ...prev,
        {
          sender: `${user}`,
          message: message.message,
          time: message.time,
        },
      ]);
    });
    getMessages();
    setCurrentMessage('');
    return () => {
      socket.off('message');
      socket.disconnect();
    };
  }, [local.friend]);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const getMessages = async () => {
    console.log('getting messages');
    try {
      const response = await fetch(
        'http://192.168.1.169:3000/api/messages/getall',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sender: `${user}`,
            receiver: local.friend,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const messages = await response.json();
      setMessages(messages);
    } catch (err) {
      console.log('Error:', err);
    }
  };

  const sendMessage = async () => {
    message = {
      sender: `${user}`,
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
    <KeyboardAvoidingView
      style={{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
      }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          width: '100%',
          marginBottom: 10,
        }}
      >
        <FlatList
          data={messages}
          ref={flatListRef}
          onContentSizeChange={() =>
            flatListRef.current.scrollToEnd({ animated: false })
          }
          ListFooterComponent={<View style={{ height: 20 }}></View>}
          // style={{
          //   backgroundColor: 'white',
          //   width: '100%',
          //   marginBottom: 10,
          // }}
          renderItem={({ item, index }) => {
            const id = item._id ? item._id.toString() : item.time.toString();
            if (item.sender === `${user}`) {
              return (
                <ChatBubble
                  sender="user"
                  message={item.message}
                  index={id}
                  key={id}
                />
              );
            }
            return (
              <ChatBubble
                sender="friend"
                message={item.message}
                index={id}
                key={id}
              />
            );
          }}
          scrollEnabled={true}
        />
      </View>
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
          onFocus={() => {
            setTimeout(() => {
              flatListRef.current.scrollToEnd({ animated: true });
            }, 100);
          }}
        />
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
    </KeyboardAvoidingView>
  );
}
