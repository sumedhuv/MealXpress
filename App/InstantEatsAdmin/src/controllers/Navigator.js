import React, {useEffect, useContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStackScreen from './RootStackScreen';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../authentication/AuthProvider';
import MainTabDelivery from './MainTabDelivery';
import {USER_TYPES} from './types';
import StorageManager from '../storage/StorageManager';
import {API_TOKEN, USER, USER_TYPE} from '../storage/StorageKeys';
import MainTabAdmin from './MainTabAdmin';
import MainTabVendor from './MainTabVendor';
import Loading from '../components/Loading';
import Verification from '../screens/common/Verification';

const Navigator = ({fcmToken}) => {
  const {
    userType,
    fbUser,
    setfbUser,
    token,
    setToken,
    setUserType,
    setCurrentUser,
    isVerified,
    setFcm,
  } = useContext(AuthContext);
  const [loading, setIsLoading] = useState(false);

  const hasSignedIn = async () => {
    setIsLoading(true);
    try {
      const tkn = await StorageManager.get(API_TOKEN);
      setToken(tkn);
      //console.log(tkn);
      const user = await StorageManager.get(USER_TYPE);
      setUserType(user ? user : userType);
      //setUserType(USER_TYPES.DELIVERY_MAN);
      const temp = await StorageManager.get(USER);
      setCurrentUser(temp);
    } catch (error) {
      console.log('no user:- ' + error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setFcm(fcmToken);
  }, [fcmToken]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setfbUser(user);
    });
    hasSignedIn();
    console.log('jwt:- ' + token);

    return subscriber;
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <NavigationContainer>
      {fbUser && token ? (
        userType === USER_TYPES.DELIVERY_MAN ? (
          isVerified ? (
            <MainTabDelivery />
          ) : (
            <Verification />
          )
        ) : userType === USER_TYPES.ADMIN ? (
          <MainTabAdmin />
        ) : isVerified ? (
          <MainTabVendor />
        ) : (
          <Verification />
        )
      ) : (
        <RootStackScreen />
      )}
    </NavigationContainer>
  );
};

export default Navigator;
