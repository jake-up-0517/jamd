import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from 'react-native';
import { useUserStore } from '../../store/store';

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const userId = useUserStore((state) => state.id);
  const allFriends = useUserStore((state) => state.allFriends);
  const setAllFriends = useUserStore((state) => state.setAllFriends);

  const userSearch = async (filter) => {
    try {
      if (!filter) {
        setSearchResults([]);
        return;
      }
      const response = await fetch(
        'http://192.168.1.169:3000/api/users/getusers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filter }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const users = await response.json();
      // users.forEach((user) => {
      //   console.log([user.first_name, user.last_name]);
      // });
      setSearchResults(users);
    } catch (err) {
      console.log('Error:', err);
    }
  };

  const addFriend = async () => {
    try {
      const response = await fetch(
        'http://192.168.1.169:3000/api/friends/addfriend',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, friendId: selectedUser.id }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const friend = await response.json();
      console.log('friend:', friend);
      setAllFriends([...allFriends, friend[0]]);
    } catch (err) {
      console.log('Error:', err);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                {selectedUser &&
                  `Add ${selectedUser.first_name} ${selectedUser.last_name} to friends list?`}
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    addFriend();
                    setModalVisible(!modalVisible);
                  }}
                  style={styles.button}
                >
                  <Text style={styles.textStyle}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                  style={styles.button}
                >
                  <Text style={styles.textStyle}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <TextInput
          style={styles.input}
          placeholder="Search"
          onChangeText={(text) => {
            userSearch(text);
          }}
        />
        {searchResults.length !== 0 ? (
          <View style={styles.listContainer}>
            <FlatList
              data={searchResults}
              style={{
                width: '100%',
              }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedUser(item);
                    setModalVisible(true);
                    // console.log('userId', userId, 'friendId', item.id);
                  }}
                >
                  <Text
                    key={item.id}
                    style={styles.item}
                  >{`${item.first_name} ${item.last_name}`}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : (
          <View></View>
        )}
        {searchResults.length === 0 && (
          <Text style={styles.placeholder}>Search for users by name...</Text>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
    width: 300,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  placeholder: {
    flex: 1,
    paddingTop: 100,
    textAlign: 'center',
    backgroundColor: '#fff',
    width: 300,
    marginBottom: 20,
    fontSize: 40,
  },
  title: {
    fontSize: 40,
    margin: 20,
  },
  input: {
    height: 50,
    width: 300,
    borderColor: 'gray',
    borderWidth: 2,
    margin: 10,
    marginTop: 30,
    borderRadius: 5,
    paddingLeft: 10,
    textAlign: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: 350,
    maxHeight: 300,
    marginTop: 200,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 2,
  },
  modalView: {
    flex: 1,
    width: '100%',
    margin: 20,
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 50,
    textAlign: 'center',
    borderRadius: 5,
    margin: 10,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
});
