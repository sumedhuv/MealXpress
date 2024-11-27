import React, {useState, useContext} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import {Button as PaperButton} from 'react-native-paper';
import {AuthContext} from '../authentication/AuthProvider';
import Button from '../components/Button';
import GreetingHeader from '../components/GreetingHeader';
import {sbgcolor, bgcolor, fontfamily} from '../Constants';

const LoginScreen = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [mode, setMode] = useState(true);
  const {signIn} = useContext(AuthContext);

  const sendOTP = () => {
    const reg = /^[6789]\d{9}$/;
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
      <Image
        style={{alignSelf: 'flex-start', margin: 10, position: 'absolute'}}
        source={require('../images/meal.png')}
      />
      <GreetingHeader />

      <View style={{width: '90%', marginHorizontal: 10, marginTop: 60}}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: fontfamily,
            color: 'grey',
            textAlign: 'center',
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
      <PaperButton
        color={sbgcolor}
        labelStyle={styles.signUp}
        onPress={() => navigation.navigate('SignUp')}>
        Don't have an account? Sign Up!
      </PaperButton>
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
  text: {
    top: 100,
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: fontfamily,
    marginBottom: 70,
    //textAlign: 'center',
  },
  stext: {
    fontSize: 40,
    top: 30,
    fontFamily: fontfamily,
    marginBottom: 10,
    textAlign: 'center',
    color: sbgcolor,
  },
  signUp: {
    fontSize: 16,
    fontFamily: fontfamily,
    color: 'grey',
    textDecorationLine: 'underline',
    textAlign: 'center',
    textTransform: 'none',
  },
});

export default LoginScreen;
