import React, {useState, useContext} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {AuthContext} from '../../authentication/AuthProvider';
import Button from '../../components/Button';
import {sbgcolor, bgcolor, fontfamily, width, textColor} from '../../Constants';
import {RadioButton} from 'react-native-paper';
import {USER_TYPES} from '../../controllers/types';

const Bankdetails = ({navigation, route}) => {
  const [number, setNumber] = useState('');
  const [holdername, setHolderName] = useState('');
  const [IFSC, setIFSC] = useState('');
  const {userType, signUp} = useContext(AuthContext);
  const isDelivery = userType === USER_TYPES.DELIVERY_MAN;
  const {phone, name} = route.params;

  const register = () => {
    if (isDelivery) {
      console.log(phone);
      const body = {
        name,
        mobile: phone,
        role: userType, // Either of ‘user’, ‘admin’, ‘delivery’
        holderName: holdername, // Only for ‘delivery’
        accountNumber: number, // Only for ‘delivery’
        IFSC, // Only for ‘delivery’
      };
      signUp(phone, () =>
        navigation.navigate('Otp', {registering: true, body, phone}),
      );
    } else {
      //proceed to restaurant details filling
      navigation.navigate('RestaurantDetails', {
        name,
        phone,
        holdername,
        IFSC,
        number,
      });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <Text style={styles.text}> BANK{'\n'} DETAILS</Text>

        <View style={{width: '90%', marginHorizontal: 10, paddingTop: 20}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fontfamily,
              color: 'grey',
            }}>
            Account holder name
          </Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            value={holdername}
            onChangeText={n => setHolderName(n)}
          />
        </View>

        <View style={{width: '90%', marginHorizontal: 10, paddingTop: 10}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fontfamily,
              color: 'grey',
            }}>
            Account number
          </Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            keyboardType={'number-pad'}
            style={styles.TextInput}
            onChangeText={value => {
              setNumber(value);
            }}
            maxLength={18}
          />
        </View>
        <View style={{width: '90%', marginHorizontal: 10, paddingTop: 20}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fontfamily,
              color: 'grey',
            }}>
            IFSC Code
          </Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            value={IFSC}
            onChangeText={n => setIFSC(n)}
          />
        </View>
        <Button label={isDelivery ? 'SIGN UP' : 'NEXT'} onpress={register} />
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

export default Bankdetails;
