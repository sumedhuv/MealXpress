import React, {useState, useContext} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  StatusBar,
  Image,
} from 'react-native';
import {AuthContext} from '../../authentication/AuthProvider';
import Button from '../../components/Button';
import {
  sbgcolor,
  bgcolor,
  fontfamily,
  width,
  yellow,
  textColor,
} from '../../Constants';
import {RadioButton} from 'react-native-paper';
import GreetingHeader from '../../components/GreetingHeader';
import {USER_TYPES} from '../../controllers/types';
import Loading from '../../components/Loading';

const Login = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [mode, setMode] = useState(true);
  const {signIn, userType, setUserType, isLoading} = useContext(AuthContext);

  const sendOTP = () => {
    const reg = /^[789]\d{9}$/;
    if (!reg.test(phone)) {
      Alert.alert('Invalid Number', 'Please enter a valid number to continue', [
        {
          text: 'okay',
          style: 'cancel',
        },
      ]);
    } else {
      signIn(phone, () => navigation.navigate('Otp', {phone}));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={sbgcolor} />
      <Image
        style={{alignSelf: 'flex-start', margin: 10, position: 'absolute'}}
        source={require('../../images/MEALEXPRESS.png')}
      />
      <GreetingHeader />
      <View
        style={{
          flexDirection: 'row',
          marginTop: 30,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}>
          <RadioButton
            value="first"
            status={userType === USER_TYPES.VENDOR ? 'checked' : 'unchecked'}
            onPress={() => setUserType(USER_TYPES.VENDOR)}
            color="orange"
          />
          <Text
            style={styles.choose}
            onPress={() => setUserType(USER_TYPES.VENDOR)}>
            Vendor
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <RadioButton
            value="first"
            status={userType === USER_TYPES.ADMIN ? 'checked' : 'unchecked'}
            onPress={() => setUserType(USER_TYPES.ADMIN)}
            color="orange"
          />
          <Text
            style={styles.choose}
            onPress={() => setUserType(USER_TYPES.ADMIN)}>
            Admin
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <RadioButton
            value="first"
            status={
              userType === USER_TYPES.DELIVERY_MAN ? 'checked' : 'unchecked'
            }
            onPress={() => setUserType(USER_TYPES.DELIVERY_MAN)}
            color="orange"
          />
          <Text
            style={styles.choose}
            onPress={() => setUserType(USER_TYPES.DELIVERY_MAN)}>
            Delivery Boy
          </Text>
        </View>
      </View>

      <View style={{width: '90%', marginHorizontal: 10, paddingTop: 30}}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: fontfamily,
            color: 'grey',
          }}>
          Please enter your mobile number to sign into your account
        </Text>
      </View>
      <View style={styles.inputView}>
        <View style={styles.startField}>
          <Text style={{fontSize: 18}}>+91</Text>
        </View>

        <TextInput
          style={styles.TextInput}
          keyboardType={'number-pad'}
          onChangeText={value => {
            setPhone(value);
            if (value.length == 10) {
              setMode(false);
            } else {
              setMode(true);
            }
          }}
          maxLength={10}
        />
      </View>
      <Button disabled={mode} label={'Send OTP'} onpress={sendOTP} />
      <TouchableOpacity
        onPress={() => navigation.navigate('SignUp')}
        style={{width: '90%', marginHorizontal: 20}}>
        <Text style={styles.signUp}>Don't have an account? Sign Up!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  inputView: {
    backgroundColor: 'lightgrey',
    width: '70%',
    height: 50,
    marginHorizontal: 10,
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    borderBottomColor: sbgcolor,
    borderBottomWidth: 2,
  },
  choose: {fontSize: 20, marginTop: 5, marginRight: 10, color: textColor},
  startField: {
    borderRightColor: 'black',
    borderRightWidth: 2,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
  },

  TextInput: {
    height: 50,
    marginLeft: 10,
    width: '80%',
    fontSize: 18,
    color: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: bgcolor,
    alignItems: 'center',
  },

  signUp: {
    fontSize: 20,
    fontFamily: fontfamily,
    color: 'grey',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default Login;
