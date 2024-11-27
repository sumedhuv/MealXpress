/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {
  width,
  height,
  yellow,
  sbgcolor,
  bgcolor,
  textColor,
} from '../Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import API, {ENDPOINTS} from '../api/apiService';
import {AuthContext} from '../authentication/AuthProvider';

const DuesCard = ({item}) => {
  const [paid, setPaid] = useState(item.isVendorPaid);
  const date = new Date(item.createdAt);
  const name = item.orderedFrom.registeredRestaurant.name;
  const [paidDate, setPaidDate] = useState(new Date(item.updatedAt));
  const MarkPaid = () => {
    Alert.alert(
      'Are you sure ?',
      `you want to mark this order as "PaidToVendor"  ${name} the amount of ₹ ${item.totalPrice}`,
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
                  order_id: item._id,
                  isVendorPaid: true,
                },
                true,
              );
              if (res.success) {
                setPaid(true);
                setPaidDate(new Date(res.data.updatedAt));
              }
            } catch (e) {
              console.log(e);
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.cost}>Rs {item.totalPrice}</Text>
        <View>
          <Text style={{fontSize: 15, color: 'grey', marginRight: 10}}>
            bill amount : ₹{item.totalPrice + parseInt(item.deliveryCharged)}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: textColor,
              marginRight: 10,
              fontWeight: 'bold',
            }}>
            Payment Mode : {item.paymentMode}
          </Text>
        </View>
      </View>
      <Text style={{fontSize: 17, marginBottom: 10, color: textColor}}>
        Delivery charged:- ₹ {item.deliveryCharged}
      </Text>
      {item.createdBy && (
        <Text style={{fontSize: 17, marginBottom: 10, color: textColor}}>
          <Text style={{color: textColor}}>Ordered by </Text>
          <Text style={{fontWeight: 'bold', color: textColor}}>
            {item.createdBy.name} at {date.toLocaleTimeString()}
            {'\n'}
            on {date.toLocaleDateString('en-GB')}
          </Text>
        </Text>
      )}
      {/* <View style={{marginBottom: 10, flexDirection: 'row'}}>
        <Text style={styles.payment}>Payment To: </Text>
        <Text style={[styles.cost, {fontSize: 20}]}>{name}</Text>
      </View> */}

      {paid ? (
        <View style={{marginTop: 10, flexDirection: 'row'}}>
          <FontAwesome name={'check-circle'} color={yellow} size={30} />
          <View style={{width: 10}} />
          <Text style={styles.paidIcon}>PAID</Text>

          <Text style={styles.text}>
            on {paidDate.toLocaleDateString('en-GB')} at{' '}
            {paidDate.toLocaleTimeString()}
          </Text>
        </View>
      ) : (
        <TouchableOpacity onPress={MarkPaid} style={styles.paidButton}>
          <Text style={styles.paidText}>MARK AS PAID</Text>
        </TouchableOpacity>
      )}

      <View
        style={{
          paddingTop: 20,
          borderBottomColor: '#DDDDDD',
          borderBottomWidth: 1,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: bgcolor,
    paddingLeft: 20,
    //alignSelf: 'center',
  },
  cost: {
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 10,
    color: textColor,
  },
  payment: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 10,
    color: textColor,
  },
  paidButton: {
    width: width * 0.9,
    height: height * 0.06,
    borderWidth: 2,
    borderColor: sbgcolor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: bgcolor,
  },
  paidText: {
    fontSize: 19,
    color: sbgcolor,
  },
  paidIcon: {
    fontSize: 20,
    color: yellow,
  },
  text: {
    fontSize: 16,
    color: textColor,
    marginLeft: 20,
  },
});

export default DuesCard;
