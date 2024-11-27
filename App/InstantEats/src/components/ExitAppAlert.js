import {BackHandler, Alert} from 'react-native';

function ExitAppAlert() {
  Alert.alert('Are you sure ?', 'You want to exit the app.', [
    {
      text: 'cancel',
      style: 'cancel',
    },
    {
      text: 'ok',
      onPress: () => BackHandler.exitApp(),
    },
  ]);
}

export default ExitAppAlert;
