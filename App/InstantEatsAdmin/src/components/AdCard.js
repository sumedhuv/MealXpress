/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {height, width, sbgcolor, yellow} from '../Constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AdCard = ({name, image, line1, line2, line3, deleteFunc}) => {
  return (
    <ImageBackground
      imageStyle={{borderRadius: 20}}
      source={{
        uri: image,
      }}
      style={styles.imgBg}>
      {/* <View
        style={{
          ...StyleSheet.absoluteFill,
          backgroundColor: 'rgba(0,0,0,0.4)',
          borderRadius: 20,
        }}
      />
      <View
        style={{margin: 20, justifyContent: 'space-between', height: '76%'}}>
        <Text style={styles.title}>{name}</Text>
        <View style={{height: '60%', justifyContent: 'space-evenly'}}>
          {line1 ? <Text style={styles.text}>{line1}</Text> : null}
          <Text style={styles.deal}>{line2}</Text>
          {line3 ? <Text style={styles.text}>{line3}</Text> : null}
        </View>
      </View> */}
      {deleteFunc ? (
        <TouchableOpacity style={styles.delete} onPress={deleteFunc}>
          <MaterialCommunityIcons name="delete" size={30} color={yellow} />
        </TouchableOpacity>
      ) : null}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imgBg: {
    height: height * 0.3,
    width: width * 0.95,
    alignSelf: 'center',
    marginVertical: 10,
  },
  // title: {
  //   fontWeight: 'bold',
  //   fontSize: 34,
  //   color: sbgcolor,
  //   letterSpacing: 4,
  // },
  // text: {
  //   fontSize: 18,
  //   color: 'white',
  //   letterSpacing: 2,
  // },
  // deal: {
  //   fontWeight: 'bold',
  //   fontSize: 30,
  //   color: 'white',
  //   letterSpacing: 3,
  //   textTransform: 'uppercase',
  // },
  delete: {
    backgroundColor: '#666666',
    position: 'absolute',
    bottom: 25,
    right: 25,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
});

export default AdCard;
