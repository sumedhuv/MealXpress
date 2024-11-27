import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {AuthContext} from '../../authentication/AuthProvider';
import Button from '../../components/Button';
import {sbgcolor, bgcolor, fontfamily, width, textColor} from '../../Constants';
import {RadioButton} from 'react-native-paper';
import GreetingHeader from '../../components/GreetingHeader';
import {USER_TYPES} from '../../controllers/types';

const SignUp = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const {userType, setUserType} = useContext(AuthContext);

  const register = () => {
    const reg = /^[789]\d{9}$/;
    if (phone === '' || name === '') {
      ToastAndroid.show('No field should be empty :(', ToastAndroid.SHORT);
    } else {
      if (!reg.test(phone)) {
        Alert.alert(
          'Invalid Number',
          'Please enter a valid number to continue',
          [
            {
              text: 'okay',
              style: 'cancel',
            },
          ],
        );
      } else {
        navigation.navigate('BankDetails', {name, phone});
      }
    }
  };

  useEffect(() => {
    if (userType === USER_TYPES.ADMIN) setUserType(USER_TYPES.VENDOR);
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <GreetingHeader />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            justifyContent: 'space-evenly',
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
          {/* <View style={{flexDirection: 'row'}}>
          <RadioButton
            value="first"
            status={userType === USER_TYPES.ADMIN ? 'checked' : 'unchecked'}
            onPress={() => setUserType(USER_TYPES.ADMIN)}
            color="orange"
          />
          <Text style={styles.choose}>Admin</Text>
        </View> */}
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

        <View style={{width: '90%', marginHorizontal: 10, paddingTop: 20}}>
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
        <Button label={'NEXT'} onpress={register} />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <View style={{width: '90%', marginHorizontal: 40}}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: fontfamily,
                color: 'grey',
                textDecorationLine: 'underline',
              }}>
              Already have an account? Login!
            </Text>
          </View>
        </TouchableOpacity>
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
  choose: {fontSize: 20, marginTop: 5, marginRight: 10, color: textColor},
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

  startField: {
    borderRightColor: 'black',
    borderRightWidth: 2,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
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
    fontSize: 30,
    top: 20,
    fontFamily: fontfamily,
    marginBottom: 20,
    color: sbgcolor,
    //textAlign: 'center',
  },
  signUp: {
    fontSize: 20,
    fontFamily: fontfamily,
    color: 'grey',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default SignUp;
