/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import API, {ENDPOINTS} from '../../api/apiService';
import {AuthContext} from '../../authentication/AuthProvider';
import {bgcolor} from '../../Constants';
import {USER_TYPES} from '../../controllers/types';
import {getProfile} from '../common/getProfile';
import Header from '../../components/Header';
import PeopleTopTabs from './PeopleTopTabs';

const PeopleScreen = () => {
  const {currentUser, setCurrentUser, userType} = useContext(AuthContext);

  useEffect(() => {
    getProfile(userType === USER_TYPES.VENDOR, setCurrentUser);
  }, []);
  return (
    <View style={styles.container}>
      <Header>
        <Text style={styles.title}>People</Text>
        <View style={{height: 15}} />
      </Header>
      <PeopleTopTabs screen1={'Vendors'} screen2={'Delivery'} />
    </View>
  );
};
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
export default PeopleScreen;
