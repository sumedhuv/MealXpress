import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {
  bgcolor,
  fontfamily,
  sbgcolor,
  textColor,
  width,
  yellow,
} from '../Constants';
import Header from '../components/Header';
import BillComponent from '../components/BillComponent';
import Entypo from 'react-native-vector-icons/Entypo';
import {AuthContext} from '../authentication/AuthProvider';
import RazorpayCheckout from 'react-native-razorpay';
import API, {ENDPOINTS} from '../api/apiService';
import {success} from '../../App';

const BillAddressScreen = ({navigation, route}) => {
  const [hasPayed, setHasPayed] = useState(false);
  const [paymentMode, setPaymentMode] = useState('Online');
  const {cart, cartVendor, currentUser, updateCart} = useContext(AuthContext);
  const [address, setAddress] = useState(currentUser.addresses[0]);
  const {deliveryCharge} = route.params;
  const [key, setKey] = useState('');

  const getRazorpayKey = async () => {
    try {
      let res = await API.get(ENDPOINTS.GET_RAZORPAY_KEY, false);
      setKey(res.razorpay);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRazorpayKey();
  }, []);

  const capturePayment = async (id, amount) => {
    try {
      let res = await API.post(ENDPOINTS.RAZORPAY_CAPTURE + id, {amount}, true);
      //console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSuccess = async data => {
    setHasPayed(true);
    //creating order
    let body = {
      orderedFrom: cartVendor._id,
      address,
      contents: cart.contents.map(i => {
        return {item: i.item._id, quantity: i.quantity};
      }),
      paymentMode,
      totalPrice: cart.totalPrice,
      deliveryCharged: deliveryCharge,
    };
    try {
      let resp = await API.post(ENDPOINTS.CREATE_ORDER, body, true);
      //console.log('OrderCreate:- ' + JSON.stringify(resp));
      if (paymentMode === 'Online')
        await capturePayment(
          data.razorpay_payment_id,
          cart.totalPrice + deliveryCharge,
        );
      ToastAndroid.show(
        `Success: Your order has been placed :)`,
        ToastAndroid.SHORT,
      );
      success.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
      setTimeout(() => {
        setHasPayed(false);
        updateCart(true);
        navigation.goBack();
      }, 500);
    } catch (e) {
      console.log('ordercreate error' + e);
    }
  };

  const codChosen = () => {
    Alert.alert(
      'Order Confirmation',
      'Your order will be placed with the restaurant upon confirmation',
      [
        {text: 'cancel', style: 'cancel'},
        {
          text: 'ok',
          onPress: handleSuccess,
        },
      ],
    );
  };

  const pay = async () => {
    //console.log(cart.totalPrice);
    //console.log(address);
    var options = {
      description: cartVendor.registeredRestaurant.address,
      //image: ,
      currency: 'INR',
      key, // Your api key
      amount: (cart.totalPrice + deliveryCharge) * 100,
      name: cartVendor.registeredRestaurant.name,
      prefill: {
        email: currentUser.email,
        contact: currentUser.mobile,
        name: currentUser.name,
      },
      theme: {color: sbgcolor},
    };
    RazorpayCheckout.open(options)
      .then(handleSuccess)
      .catch(error => {
        // handle failure
        //console.log(`Error: ${error.code} | ${error.description}`);
        ToastAndroid.show('Payment Cancelled', ToastAndroid.SHORT);
      });
  };

  return (
    <View style={styles.container}>
      <Header isRounded={true}>
        <Text style={styles.title}>Billing & Address</Text>
        <View style={{height: 50}} />
      </Header>
      <BillComponent
        setAddress={setAddress}
        address={address}
        deliveryCharge={deliveryCharge}
        order={cart}
        changeAddr={true}>
        {hasPayed ? (
          <View
            style={styles.bigButton}
            //onPress={}
          >
            <View style={{flexDirection: 'row'}}>
              <Entypo
                name="check"
                style={[
                  styles.buttonText,
                  {color: textColor, paddingTop: 4, paddingRight: 5},
                ]}
              />
              <Text style={[styles.buttonText, {color: textColor}]}>
                {paymentMode === 'COD' ? 'ORDER CONFIRMED' : 'PAYMENT DONE'}
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <RadioButton.Group
              onValueChange={newValue => setPaymentMode(newValue)}
              value={paymentMode}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginHorizontal: 10,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.choose}>Online Payment</Text>
                  <RadioButton value="Online" color={yellow} />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.choose}>COD</Text>
                  <RadioButton value="COD" color={yellow} />
                </View>
              </View>
            </RadioButton.Group>

            <View
              style={{
                flexDirection: 'row',
                marginVertical: 15,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={[styles.button, {borderWidth: 1, borderColor: sbgcolor}]}
                onPress={() => navigation.goBack()}>
                <Text style={[styles.buttonText, {color: sbgcolor}]}>BACK</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: sbgcolor}]}
                onPress={paymentMode === 'COD' ? codChosen : pay}>
                <Text style={[styles.buttonText, {color: bgcolor}]}>
                  {paymentMode === 'COD' ? 'CONFIRM' : 'PAY'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </BillComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: fontfamily,
    backgroundColor: bgcolor,
  },
  title: {
    color: bgcolor,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    top: 20,
    letterSpacing: 3,
  },
  choose: {
    fontSize: 16,
    textAlignVertical: 'center',
    fontWeight: 'bold',
    width: '50%',
  },
  button: {
    height: 60,
    width: width / 2.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
  bigButton: {
    width: '100%',
    borderRadius: 30,
    height: 60,
    backgroundColor: yellow,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
});

export default BillAddressScreen;
