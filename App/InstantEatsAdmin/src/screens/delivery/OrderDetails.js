import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  ToastAndroid,
} from 'react-native';
import {bgcolor, width, yellow, textColor, sbgcolor} from '../../Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';
import BillComponent from '../../components/BillComponent';
import Button from '../../components/Button';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import API, {ENDPOINTS} from '../../api/apiService';

const OrderDetails = ({navigation, route}) => {
  const {order} = route.params;
  const [hasDelivered, setHasDelivered] = useState(order.status === 'finished');
  const {name, address, number} = order.orderedFrom.registeredRestaurant;
  const [isAccepted, setIsAccepted] = useState(order.status === 'accepted');
  const markAsDelievered = () => {
    Alert.alert('Are you sure ?', 'You want to mark this order as delivered.', [
      {
        text: 'cancel',
        style: 'cancel',
      },
      {
        text: 'ok',
        onPress: async () => {
          try {
            let res = await API.put(
              ENDPOINTS.MARK_ORDER_COMPLETE + `/${order._id}`,
              {},
              true,
            );

            setHasDelivered(true);
          } catch (error) {
            console.log(error);
          }
        },
      },
    ]);
  };

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
              let res = await API.post(
                ENDPOINTS.MODIFY_ORDER,
                {
                  order_id: order._id,
                  status: accepting ? 'accepted' : 'rejected',
                },
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
        <View
          style={{
            marginHorizontal: 10,
            borderBottomColor: '#666666',
            borderBottomWidth: 1,
          }}>
          <Text style={styles.category}>restaurant details</Text>
          <View style={[styles.section, {marginTop: 15}]}>
            <MaterialIcons name={'restaurant'} style={styles.icon} />
            <Text style={[styles.subtext, {marginLeft: 20}]}>{name}</Text>
          </View>
          <TouchableOpacity
            style={styles.section}
            onPress={() => {
              let phoneNumber = '';
              if (Platform.OS !== 'android') {
                phoneNumber = `telprompt:+91${number}`;
              } else {
                phoneNumber = `tel:+91${number}`;
              }
              Linking.openURL(phoneNumber);
            }}>
            <MaterialIcons name={'call'} style={styles.icon} />
            <Text style={styles.subtext}>{number}</Text>
          </TouchableOpacity>
          <View style={[styles.section, {marginLeft: 15}]}>
            <MaterialIcons name={'location-on'} style={styles.icon} />
            <Text style={[styles.subtext, {marginLeft: 20}]}>{address}</Text>
          </View>
          <Text style={styles.payment}>Payment Mode:- {order.paymentMode}</Text>
        </View>

        <BillComponent order={order}>
          <View style={{alignItems: 'center'}}>
            {isAccepted ? null : (
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 10,
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {borderWidth: 1, borderColor: sbgcolor},
                  ]}
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
            {!isAccepted ? null : hasDelivered ? (
              <TouchableOpacity style={styles.bigButton}>
                <View style={{flexDirection: 'row'}}>
                  <Entypo
                    name="check"
                    style={[
                      styles.buttonText,
                      {color: textColor, paddingTop: 4, paddingRight: 5},
                    ]}
                  />
                  <Text style={[styles.buttonText, {color: textColor}]}>
                    delivered
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <Button label={'MARK DELIVERED'} onpress={markAsDelievered} />
            )}
          </View>
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
    fontSize: 24,
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
  bigButton: {
    width: '100%',
    borderRadius: 30,
    height: 60,
    backgroundColor: yellow,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {
    color: bgcolor,
    fontSize: 30,
    marginLeft: 10,
    marginTop: 2,
  },
  payment: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  button: {
    height: 60,
    width: width / 2.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrderDetails;
