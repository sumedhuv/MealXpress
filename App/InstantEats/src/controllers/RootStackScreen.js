import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import OtpScreen from '../screens/OtpScreen';

const RootStackScreen = () => {
  const RootStack = createStackNavigator();

  return (
    <RootStack.Navigator headerMode={false} initialRouteName="Login">
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="SignUp" component={SignupScreen} />
      <RootStack.Screen name="Otp" component={OtpScreen} />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
