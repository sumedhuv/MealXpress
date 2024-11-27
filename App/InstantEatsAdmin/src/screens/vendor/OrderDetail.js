import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import {bgcolor, width, yellow, sbgcolor} from '../../Constants';
import Header from '../../components/Header';
import BillComponent from '../../components/BillComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import API, {ENDPOINTS} from '../../api/apiService';
//import SendSMS from 'react-native-sms';

const OrderDetail = ({navigation, route}) => {
  const {order} = route.params;
  const [isAccepted, setIsAccepted] = useState(order.status === 'accepted');
  //const numbers = ['+917820879115', '+918698354545', '+919503704545'];

  const handleAccepReject = accepting => {
    Alert.alert(
      'Are you sure ? ',
      `You want to ${accepting ? 'accept' : 'reject'} this order`,
      [
        {
          text: 'cancel',
          style: 'cancel',
        },
        {
          text: 'ok',
          onPress: async () => {
            try {
              let res = await API.put(
                accepting
                  ? ENDPOINTS.ACCEPT_ORDER + `/${order._id}`
                  : ENDPOINTS.REJECT_ORDER + `/${order._id}`,
                {},
                true,
              );
              setIsAccepted(accepting ? true : false);
              ToastAndroid.show(
                `You ${
                  accepting ? 'accepted' : 'rejected'
                } the order go back and refresh to see changes`,
                ToastAndroid.SHORT,
              );
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
    );
  };

  // const sendSMS = () => {
  //   SendSMS.send(
  //     {
  //       body: `Hey, a new order ID ${order._id} worth ₹${
  //         order.totalPrice + parseInt(order.deliveryCharged)
  //       } has been placed from ${
  //         order.orderedFrom.registeredRestaurant.name
  //       } restaurant, please collect it and deliver it on time. Addr : ${
  //         order.address
  //       }`,
  //       recipients: numbers,
  //       successTypes: ['sent', 'queued'],
  //       allowAndroidSendWithoutReadPermission: true,
  //     },
  //     (completed, cancelled, error) => {
  //       console.log(
  //         'SMS Callback: completed: ' +
  //           completed +
  //           ' cancelled: ' +
  //           cancelled +
  //           'error: ' +
  //           error,
  //       );
  //     },
  //   );
  // };
  // console.log(order.orderedFrom._id);
  return (
    <View style={styles.container}>
      <Header isRounded={true}>
        <View
          style={{
            flexDirection: 'row',
            top: 20,
            left: 10,
          }}>
          <Ionicons
            name="arrow-back"
            style={styles.back}
            onPress={navigation.goBack}
          />
          <View style={{justifyContent: 'center', width: width / 1.3}}>
            <Text style={styles.title}>Order</Text>
            <Text style={{color: bgcolor, fontSize: 18, alignSelf: 'center'}}>
              #{order._id}
            </Text>
          </View>
        </View>

        <View style={{height: 50}} />
      </Header>
      <ScrollView>
        {/* <TouchableOpacity style={styles.send} onPress={sendSMS}>
          <Text style={{color: 'white', fontSize: 16}}>
            Send sms to delivery Boy
          </Text>
        </TouchableOpacity> */}
        <Text style={styles.payment}>Payment Mode:- {order.paymentMode}</Text>
        {/* {<View
          style={{
            marginHorizontal: 10,
            borderBottomColor: '#666666',
            borderBottomWidth: 1,
          }}>
          <Text style={styles.category}>restaurant details</Text>
          <View style={[styles.section, {marginTop: 15}]}>
            <MaterialIcons name={'restaurant'} style={styles.icon} />
            <Text style={[styles.subtext, {marginLeft: 20}]}>McDonald’s</Text>
          </View>
          <View style={styles.section}>
            <MaterialIcons name={'call'} style={styles.icon} />
            <Text style={styles.subtext}>9867547870</Text>
          </View>
          <View style={[styles.section, {marginLeft: 15}]}>
            <MaterialIcons name={'location-on'} style={styles.icon} />
            <Text style={[styles.subtext, {marginLeft: 20}]}>
              Kalpataru Aura, LBS Marg, Mumbai-400055
            </Text>
          </View>
        </View> */}

        <BillComponent order={order}>
          {isAccepted ? null : (
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 10,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={[styles.button, {borderWidth: 1, borderColor: sbgcolor}]}
                onPress={() => handleAccepReject(false)}>
                <Text style={[styles.buttonText, {color: sbgcolor}]}>
                  reject
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: sbgcolor}]}
                onPress={() => handleAccepReject(true)}>
                <Text style={[styles.buttonText, {color: bgcolor}]}>
                  accept
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </BillComponent>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgcolor,
  },
  icon: {
    fontSize: 26,
    color: yellow,
    marginLeft: 10,
  },
  subtext: {
    marginLeft: 20,
    fontSize: 18,
    width: width / 1.8,
  },
  section: {
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 15,
  },
  title: {
    color: bgcolor,
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  category: {
    textTransform: 'uppercase',
    color: '#666666',
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 20,
    textTransform: 'uppercase',
  },
  back: {
    color: bgcolor,
    fontSize: 30,
    marginLeft: 10,
    marginTop: 2,
  },
  button: {
    height: 60,
    width: width / 2.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  send: {
    height: 40,
    backgroundColor: sbgcolor,
    marginTop: 20,
    width: width / 2,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  payment: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  },
});

export default OrderDetail;
