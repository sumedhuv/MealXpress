import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Header from '../components/Header';
import TopTabs from '../components/TopTabs';
import {bgcolor, fontfamily} from '../Constants';

const OrderScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header>
        <Text style={styles.title}>Orders</Text>
        <View style={{height: 15}} />
      </Header>
      <TopTabs screen1={'Active'} screen2={'Finished'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: fontfamily,
    backgroundColor: bgcolor,
  },
  title: {
    color: bgcolor,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    top: 15,
    letterSpacing: 3,
  },
});

export default OrderScreen;
