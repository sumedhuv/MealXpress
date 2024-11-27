import React, {useEffect, useContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabScreen from './MainTabScreen';
import RootStackScreen from './RootStackScreen';
import Loading from '../components/Loading';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../authentication/AuthProvider';
import API, {ENDPOINTS} from '../api/apiService';
import StorageManager from '../storage/StorageManager';
import {API_TOKEN} from '../storage/StorageKeys';
import {getCart} from '../screens/HomeScreen';
const Navigator = ({fcmToken}) => {
  const {
    setToken,
    token,
    fbUser,
    setfbUser,
    fcm,
    setFcm,
    setCurrentUser,
    setCart,
    setCartVendor,
  } = useContext(AuthContext);
  const Stack = createStackNavigator();
  const [loading, setIsLoading] = useState(false);

  const hasSignedIn = async () => {
    setIsLoading(true);
    try {
      const tkn = await StorageManager.get(API_TOKEN);
      setToken(tkn);
      //console.log(tkn);
      let user = await API.get(ENDPOINTS.GET_CURRENT_USER, true);
      setCurrentUser(user);
    } catch (error) {
      console.log('no user:- ' + error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setFcm(fcmToken);
  }, [fcmToken]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async user => {
      setfbUser(user);
    });
    hasSignedIn();
    //console.log(token);
    return subscriber;
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <NavigationContainer>
      {token && fbUser ? (
        <Stack.Navigator headerMode={false}>
          <Stack.Screen name="MainTab" component={MainTabScreen} />
        </Stack.Navigator>
      ) : (
        <RootStackScreen />
      )}
    </NavigationContainer>
  );
};

export default Navigator;
