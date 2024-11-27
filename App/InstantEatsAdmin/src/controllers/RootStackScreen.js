import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/common/Login';
import SignUp from '../screens/common/Signup';
import OtpScreen from '../screens/common/OtpScreen';
import Bankdetails from '../screens/common/Bankdetails';
import {useContext} from 'react';
import {AuthContext} from '../authentication/AuthProvider';
import {USER_TYPES} from './types';
import RestaurantDetailsForm from '../screens/vendor/RestaurantDetailsForm';
import VerificationMedium from '../screens/vendor/Verificationmedium';

const SignUpStack = createStackNavigator();
const RootStackScreen = () => {
  const RootStack = createStackNavigator();
  const {userType} = useContext(AuthContext);

  return (
    <RootStack.Navigator headerMode={false} initialRouteName="Login">
      <RootStack.Screen name="Login" component={Login} />
      <RootStack.Screen
        name="SignUp"
        children={() => <SignUpStackScreen type={userType} />}
      />
      <RootStack.Screen name="Otp" component={OtpScreen} />
    </RootStack.Navigator>
  );
};

const SignUpStackScreen = ({type}) => {
  return (
    <SignUpStack.Navigator initialRouteName={'SignUp'} headerMode={false}>
      <SignUpStack.Screen name={'SignUp'} component={SignUp} />
      <SignUpStack.Screen name={'BankDetails'} component={Bankdetails} />
      {type === USER_TYPES.VENDOR ? (
        <SignUpStack.Screen
          name={'RestaurantDetails'}
          component={RestaurantDetailsForm}
        />
      ) : null}
      {type === USER_TYPES.VENDOR ? (
        <SignUpStack.Screen
          name={'Verification'}
          component={VerificationMedium}
        />
      ) : null}
    </SignUpStack.Navigator>
  );
};

export default RootStackScreen;
