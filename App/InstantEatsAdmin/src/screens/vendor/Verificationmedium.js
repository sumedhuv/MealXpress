import React, {useState, useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {bgcolor, fontfamily, yellow} from '../../Constants';
import {RadioButton} from 'react-native-paper';
import Button from '../../components/Button';
import {AuthContext} from '../../authentication/AuthProvider';

const VerificationMedium = ({route, navigation}) => {
  const [medium, setMedium] = useState('online');
  const {signUp, userType} = useContext(AuthContext);
  const {name, phone, holdername, IFSC, number, resname, address, contact} =
    route.params;
  const register = () => {
    const body = {
      name,
      mobile: phone,
      role: userType, // ‘vendor’
      restaurantName: resname,
      restaurantNumber: contact,
      restaurantAddress: address,
      holderName: holdername,
      accountNumber: number,
      IFSC,
      verificationType: medium, // Either of ‘online’, ‘person’
    };
    signUp(phone, () =>
      navigation.navigate('Otp', {registering: true, body, phone}),
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>VENDOR VERIFICATION</Text>
      <Text style={styles.choose}>How do you want to verify your account?</Text>
      <View style={{height: '20%', justifyContent: 'space-evenly'}}>
        <View style={{flexDirection: 'row'}}>
          <RadioButton
            status={medium === 'online' ? 'checked' : 'unchecked'}
            onPress={() => setMedium('online')}
            color={yellow}
          />
          <Text style={styles.choose}>Online</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <RadioButton
            status={medium === 'person' ? 'checked' : 'unchecked'}
            onPress={() => setMedium('person')}
            color={yellow}
          />
          <Text style={styles.choose}>In person</Text>
        </View>
      </View>
      <View style={{alignSelf: 'center'}}>
        <Button label={'REGISTER'} onpress={register} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgcolor,
    marginHorizontal: 20,
    //alignItems: 'center',
  },
  text: {
    marginTop: 100,
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: fontfamily,
    marginBottom: 50,
  },
  choose: {fontSize: 20, marginTop: 5, marginRight: 10},
});

export default VerificationMedium;
