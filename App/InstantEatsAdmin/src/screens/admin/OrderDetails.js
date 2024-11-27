/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {bgcolor, width, yellow} from '../../Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';
import BillComponent from '../../components/BillComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OrderDetails = ({navigation, route}) => {
  const {order} = route.params;
  const {name, address, number} = order.orderedFrom.registeredRestaurant;

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
          <View style={styles.section}>
            <MaterialIcons name={'call'} style={styles.icon} />
            <Text style={styles.subtext}>{number}</Text>
          </View>
          <View style={[styles.section, {marginLeft: 15}]}>
            <MaterialIcons name={'location-on'} style={styles.icon} />
            <Text style={[styles.subtext, {marginLeft: 20}]}>{address}</Text>
          </View>

          <Text style={styles.payment}>Payment Mode:- {order.paymentMode}</Text>
        </View>
        <BillComponent order={order} />
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
    letterSpacing: 4,
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
});

export default OrderDetails;
