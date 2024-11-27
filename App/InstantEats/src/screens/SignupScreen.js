import React, {useState, useContext} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import {Button as PaperButton} from 'react-native-paper';
import {sbgcolor, bgcolor, fontfamily} from '../Constants';
import Button from '../components/Button';
import {AuthContext} from '../authentication/AuthProvider';
import GreetingHeader from '../components/GreetingHeader';

const SignupScreen = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [password, setPassword] = useState('');
  const {signUp} = useContext(AuthContext);

  const register = () => {
    const reg = /^[6789]\d{9}$/;
    setDisabled(true);
    if (name === '' || phone === '' || address === '') {
      Alert.alert(
        'Incomplete Data!',
        'Please make sure every field is complete before proceeding',
        [
          {
            text: 'okay',
            style: 'cancel',
          },
        ],
      );
    } else if (!reg.test(phone)) {
      Alert.alert('Invalid Number', 'Please enter a valid number to continue', [
        {
          text: 'okay',
          style: 'cancel',
        },
      ]);
    } else {
      signUp(phone, () =>
        navigation.navigate('Otp', {registering: true, name, phone, address}),
      );
    }
    setDisabled(false);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <Image
          style={{alignSelf: 'flex-start', margin: 10, position: 'absolute'}}
          source={require('../images/meal.png')}
        />
        <GreetingHeader />
        <View style={{width: '90%', marginHorizontal: 10, paddingTop: 60}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fontfamily,
              color: 'grey',
            }}>
            Name
          </Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            value={name}
            onChangeText={n => setName(n)}
          />
        </View>

        <View style={{width: '90%', marginHorizontal: 10, paddingTop: 10}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fontfamily,
              color: 'grey',
            }}>
            Phone Number
          </Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            keyboardType={'number-pad'}
            style={styles.TextInput}
            onChangeText={value => {
              setPhone(value);
            }}
            maxLength={10}
          />
        </View>

        <View style={{width: '90%', marginHorizontal: 10, paddingTop: 10}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fontfamily,
              color: 'grey',
            }}>
            Address
          </Text>
        </View>
        <View style={styles.AddressInputView}>
          <TextInput
            style={styles.TextInput}
            value={address}
            placeholder={'Line1, Line2, City:- zip'}
            placeholderTextColor={'#666666'}
            onChangeText={add => setAddress(add)}
            onSubmitEditing={() => console.log(address)}
          />
        </View>
        <Button label={'SIGN UP'} onpress={register} disabled={disabled} />

        <PaperButton
          color={sbgcolor}
          labelStyle={styles.signUp}
          onPress={() => navigation.navigate('Login')}>
          Already have an account? Login!
        </PaperButton>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  inputView: {
    backgroundColor: 'lightgrey',
    width: '90%',
    height: 'auto',
    marginHorizontal: 10,
    alignItems: 'center',
  },

  TextInput: {
    height: 'auto',
    textAlign: 'left',
    marginHorizontal: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    width: '100%',
    fontSize: 18,
    color: 'black',
  },
  AddressInputView: {
    backgroundColor: 'lightgrey',
    width: '90%',
    height: 'auto',
    marginHorizontal: 10,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: bgcolor,
  },
  button: {
    width: '90%',
    margin: 10,
    backgroundColor: sbgcolor,
    height: 50,
    borderRadius: 10,
  },
  text: {
    top: 100,
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: fontfamily,
    marginBottom: 70,

    textAlign: 'center',
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

export default SignupScreen;
