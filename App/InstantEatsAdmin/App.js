import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import Navigator from './src/controllers/Navigator';
import {AuthProvider} from './src/authentication/AuthProvider';
import {StatusBar, TextInput} from 'react-native';
import {sbgcolor} from './src/Constants';
import NetInfo from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';
import OfflineScreen from './src/screens/common/OfflineScreen';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [fcm, setFcm] = useState('');

  useEffect(() => {
    console.disableYellowBox;
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    TextInput.defaultProps.selectionColor = sbgcolor;
    SplashScreen.hide();

    messaging()
      .getToken()
      .then(token => setFcm(token))
      .catch(err => console.log('Notif:- ' + err));

    return unsubscribe;
  }, []);
  return !isConnected ? (
    <OfflineScreen />
  ) : (
    <AuthProvider>
      <StatusBar backgroundColor={sbgcolor} />
      <Navigator fcmToken={fcm} />
    </AuthProvider>
  );
};

export default App;
