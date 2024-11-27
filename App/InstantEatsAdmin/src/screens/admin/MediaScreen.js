/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {fontfamily, bgcolor} from '../../Constants';
import Header from '../../components/Header';
import MediaTopTabs from './MediaTopTabs';

export default function MediaScreen() {
  return (
    <View style={styles.container}>
      <Header>
        <Text style={styles.title}>Media</Text>
        <View style={{height: 15}} />
      </Header>
      <MediaTopTabs screen1={'Ads'} screen2={'News'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: fontfamily,
    backgroundColor: bgcolor,
  },
  title: {
    color: bgcolor,
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    top: 15,
    letterSpacing: 4,
  },
});
