import { View, Text, StyleSheet } from 'react-native';

export default function ChatBubble({ message, sender, index }) {
  if (sender === 'user') {
    return (
      <View
        style={{
          backgroundColor: '#0078fe',
          padding: 10,
          marginLeft: '45%',
          borderRadius: 5,
          //marginBottom: 15,
          marginTop: 5,
          marginRight: '5%',
          // maxWidth: '50%',
          alignSelf: 'flex-end',
          //maxWidth: 500,

          borderRadius: 20,
        }}
        key={index}
      >
        <Text style={{ fontSize: 16, color: '#fff' }}>{message}</Text>

        {/* <View style={styles.rightArrow}></View>

        <View style={styles.rightArrowOverlap}></View> */}
      </View>
    );
  }

  //Recevied Message
  return (
    <View
      style={{
        backgroundColor: '#dedede',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginLeft: '5%',
        maxWidth: '50%',
        alignSelf: 'flex-start',
        //maxWidth: 500,
        //padding: 14,

        //alignItems:"center",
        borderRadius: 20,
      }}
      key={index}
    >
      <Text style={{ fontSize: 16, color: '#000', justifyContent: 'center' }}>
        {' '}
        {message}
      </Text>
      {/* <View style={styles.leftArrow}></View>
      <View style={styles.leftArrowOverlap}></View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  // rightArrow: {
  //   position: 'absolute',
  //   backgroundColor: '#0078fe',
  //   backgroundColor: 'red',
  //   width: 20,
  //   height: 25,
  //   bottom: 0,
  //   borderBottomLeftRadius: 25,
  //   right: -10,
  // },
  // rightArrowOverlap: {
  //   position: 'absolute',
  //   backgroundColor: '#eeeeee',
  //   backgroundColor: 'green',
  //   width: 21,
  //   height: 29,
  //   bottom: -4,
  //   borderBottomLeftRadius: 18,
  //   right: '-12%',
  // },
  /*Arrow head for recevied messages*/
  // leftArrow: {
  //   position: 'absolute',
  //   backgroundColor: '#dedede',
  //   backgroundColor:"red",
  //   width: 20,
  //   height: 25,
  //   bottom: 0,
  //   borderBottomRightRadius: 25,
  //   left: -10,
  // },
  // leftArrowOverlap: {
  //   position: 'absolute',
  //   backgroundColor: '#eeeeee',
  //   backgroundColor:"green",
  //   width: 20,
  //   height: 35,
  //   bottom: -6,
  //   borderBottomRightRadius: 18,
  //   left: -20,
  // },
});
