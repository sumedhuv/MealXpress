import React, {useState, useContext} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {AuthContext} from '../../authentication/AuthProvider';
import Button from '../../components/Button';
import {sbgcolor, bgcolor, fontfamily, width, textColor} from '../../Constants';

const RestaurantDetailsForm = ({route, navigation}) => {
  const [contact, setContact] = useState('');
  const [resname, setResName] = useState('');
  const [address, setAddress] = useState('');
  const {name, phone, holdername, IFSC, number} = route.params;
  const {signUp} = useContext(AuthContext);
  const register = () => {
    const reg = /^[789]\d{9}$/;
    if (!reg.test(contact)) {
      Alert.alert('Invalid Number', 'Please enter a valid number to continue', [
        {
          text: 'okay',
          style: 'cancel',
        },
      ]);
    } else {
      //register for vendor
      navigation.navigate('Verification', {
        name,
        phone,
        holdername,
        IFSC,
        number,
        resname,
        address,
        contact,
      });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>RESTAURANT DETAILS</Text>

        <View style={{width: '90%', marginHorizontal: 10, paddingTop: 20}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fontfamily,
              color: 'grey',
            }}>
            Restaurant name
          </Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            value={resname}
            onChangeText={n => setResName(n)}
          />
        </View>

        <View style={{width: '90%', marginHorizontal: 10, paddingTop: 10}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fontfamily,
              color: 'grey',
            }}>
            Contact number
          </Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            keyboardType={'number-pad'}
            style={styles.TextInput}
            onChangeText={value => {
              setContact(value);
            }}
            maxLength={10}
          />
        </View>
        <View style={{width: '90%', marginHorizontal: 10, paddingTop: 20}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fontfamily,
              color: 'grey',
            }}>
            Address
          </Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            value={address}
            placeholder={'Line1, Line2, City:- zip'}
            onChangeText={n => setAddress(n)}
          />
        </View>
        <Button label={'NEXT'} onpress={register} />
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
    marginTop: 100,
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: fontfamily,
    marginBottom: 50,
    color: textColor,
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

export default RestaurantDetailsForm;
