import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Header from '../../components/Header';
import TopTabs from '../../components/TopTabs';
import {bgcolor, fontfamily} from '../../Constants';
import {AuthContext} from '../../authentication/AuthProvider';
import API, {ENDPOINTS} from '../../api/apiService';
import {getProfile} from '../common/getProfile';
import {USER_TYPES} from '../../controllers/types';

const OrderScreen = ({navigation}) => {
  const {currentUser, setCurrentUser, userType} = useContext(AuthContext);

  useEffect(() => {
    getProfile(userType === USER_TYPES.VENDOR, setCurrentUser);
  }, []);

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
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    top: 15,
    letterSpacing: 4,
  },
  back: {
    color: bgcolor,
    fontSize: 30,
    marginLeft: 10,
  },
});

export default OrderScreen;
