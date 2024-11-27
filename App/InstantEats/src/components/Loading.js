import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {bgcolor, sbgcolor} from '../Constants';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={sbgcolor} size={'large'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: bgcolor,
  },
});

export default Loading;
