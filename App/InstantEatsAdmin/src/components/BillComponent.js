import React from 'react';
import {Linking, Platform, StyleSheet, Text, View} from 'react-native';
import {bgcolor, height, textColor, width, yellow} from '../Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PersonPin from './PersonPin';
import {TouchableOpacity} from 'react-native-gesture-handler';

const BillComponent = ({children, order}) => {
  return (
    <View style={styles.container}>
      <View>
        <View
          style={{
            borderBottomColor: '#666666',
            borderBottomWidth: 1,
          }}>
          <Text style={styles.category}>Deliver To</Text>
          <View style={[styles.section, {marginTop: 15}]}>
            <PersonPin />
            <Text style={[styles.subtext, {marginLeft: 20}]}>
              {order.createdBy.name}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.section}
            onPress={() => {
              let phoneNumber = '';
              let number = order.createdBy.mobile;
              if (Platform.OS !== 'android') {
                phoneNumber = `telprompt:+91${number}`;
              } else {
                phoneNumber = `tel:+91${number}`;
              }
              Linking.openURL(phoneNumber);
            }}>
            <MaterialIcons name={'call'} style={styles.icon} />
            <Text style={styles.subtext}>{order.createdBy.mobile}</Text>
          </TouchableOpacity>
          <View style={[styles.section, {marginLeft: 5}]}>
            <MaterialIcons name={'location-on'} style={styles.icon} />
            <Text style={[styles.subtext, {marginLeft: 20}]}>
              {order.address}
            </Text>
          </View>
        </View>
        <View
          style={[styles.top, {height: children ? height / 3 : height / 2.5}]}>
          <Text style={styles.category}>Items Ordered</Text>
          {order.contents.map((item, index) => {
            let subtotal = item.item.price * item.quantity;
            //setTotal(total => total + subtotal);
            return (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  justifyContent: 'space-between',
                }}
                key={index}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.billText}>{item.item.name}</Text>
                  <Text style={[styles.billText, {marginLeft: 10}]}>
                    (x{item.quantity})
                  </Text>
                </View>
                <Text style={styles.billText}>₹ {subtotal}</Text>
              </View>
            );
          })}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 16, color: textColor}}>Delivery Charges</Text>
          <Text style={{fontSize: 18, color: textColor}}>
            ₹ {order.deliveryCharged}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.category}>Order Total</Text>
          <Text style={{fontSize: 20, marginTop: 10, color: textColor}}>
            ₹ {order.totalPrice + parseInt(order.deliveryCharged)}
          </Text>
        </View>

        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: bgcolor,
    height: '100%',
    width: width / 1.1,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  top: {
    marginTop: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  icon: {
    fontSize: 26,
    color: yellow,
    marginLeft: 20,
  },
  category: {
    textTransform: 'uppercase',
    color: '#666666',
    fontSize: 20,
    marginTop: 10,
  },
  address: {
    fontSize: 18,
    width: '90%',
    marginLeft: 15,
  },
  changeText: {
    color: '#666666',
    textDecorationLine: 'underline',
    textAlign: 'right',
    fontSize: 15,
  },
  billText: {
    fontSize: 18,
    color: textColor,
  },
  subtext: {
    marginLeft: 20,
    fontSize: 18,
    width: width / 1.8,
  },
  section: {
    flexDirection: 'row',
    marginBottom: 10,
    //marginLeft: 10,
  },
});

export default BillComponent;
