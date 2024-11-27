import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import Navigator from './src/controllers/Navigator';
import {AuthProvider} from './src/authentication/AuthProvider';
import {TextInput, StatusBar} from 'react-native';
import {sbgcolor} from './src/Constants';
import messaging from '@react-native-firebase/messaging';
import NetInfo from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';
import OfflineScreen from './src/screens/OfflineScreen';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');
export const success = new Sound('success.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // success.play(success => {
  //   if (success) {
  //     console.log('successfully finished playing');
  //   } else {
  //     console.log('playback failed due to audio decoding errors');
  //   }
  // });
});

const App = () => {
  const [fcm, setFcm] = useState('');
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    console.disableYellowBox;
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    SplashScreen.hide();
    TextInput.defaultProps.selectionColor = sbgcolor;
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
