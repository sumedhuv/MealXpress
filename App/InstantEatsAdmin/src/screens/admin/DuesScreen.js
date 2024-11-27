/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {bgcolor, sbgcolor, yellow} from '../../Constants';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Header from '../../components/Header';
import DuesPending from './DuesPending';
import DuesPaid from './DuesPaid';

export default function DuesScreen() {
  const TopTab = createMaterialTopTabNavigator();

  return (
    <View style={styles.container}>
      <Header>
        <Text style={styles.title}>Payment Dues</Text>
        <View style={{height: 15}} />
      </Header>
      <TopTab.Navigator
        tabBarOptions={{
          style: {
            backgroundColor: sbgcolor,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            overflow: 'hidden',
            elevation: 0,
          },
          labelStyle: {
            textTransform: 'uppercase',
            fontSize: 18,
            color: bgcolor,
            fontWeight: '200',
            width: '100%',
          },
          indicatorStyle: {
            backgroundColor: yellow,
            height: 4,
          },
        }}>
        <TopTab.Screen name={'Pending'} component={DuesPending} />
        <TopTab.Screen name={'Paid'} component={DuesPaid} />
      </TopTab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
