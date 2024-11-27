/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {yellow} from '../Constants';
const PersonPin = () => {
  return (
    <View>
      <Ionicons name={'chatbox-outline'} style={styles.icon} />
      <Ionicons
        name={'person'}
        style={{
          position: 'absolute',
          color: yellow,
          fontSize: 14,
          left: 25,
          top: 4,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 26,
    color: yellow,
    marginLeft: 20,
  },
});

export default PersonPin;
