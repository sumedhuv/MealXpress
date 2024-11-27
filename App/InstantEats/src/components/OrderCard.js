import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {bgcolor, sbgcolor, fontfamily, width, textColor} from '../Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OrderCard = ({
  name,
  location,
  timestamp,
  address,
  price,
  isActive,
  status,
  mode,
}) => {
  const date = new Date(timestamp);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={{marginLeft: 17, width: '70%'}}>
          <Text style={{fontSize: 20, color: textColor}}>{name}</Text>
          <Text style={styles.subText}>{location}</Text>
          <Text style={styles.subText}>
            Ordered at {date.toLocaleTimeString()} on{' '}
            {date.toLocaleDateString('en-GB')}
          </Text>
        </View>
        <View style={{marginRight: 17}}>
          <Text
            style={{
              fontSize: 16,
              color: textColor,
              textAlign: 'right',
            }}>
            ₹ {price}
          </Text>
          {isActive || status === 'rejected' ? (
            <View>
              <View
                style={{
                  height: 22,
                  width: 90,
                  backgroundColor:
                    status === 'pending'
                      ? '#9F9F9F'
                      : status === 'accepted'
                      ? '#219653'
                      : '#CF0026',
                  marginTop: 5,
                  borderRadius: 5,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    letterSpacing: 2,
                    fontSize: 12,
                  }}>
                  {status === 'pending'
                    ? 'PENDING'
                    : status === 'accepted'
                    ? 'ACCEPTED'
                    : 'REJECTED'}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  color: textColor,
                  fontWeight: 'bold',
                  marginTop: 5,
                  textAlign: 'right',
                }}>
                {mode}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 17}}>
        <Ionicons name={'location-outline'} style={styles.icon} />
        <Text
          style={{
            marginTop: 5,
            width: width / 1.2,
            color: textColor,
          }}
          numberOfLines={1}>
          Delivering to :- {address}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 130,
    width,
    backgroundColor: bgcolor,
    alignSelf: 'center',
    fontFamily: fontfamily,
    borderBottomColor: '#9F9F9F',
    borderBottomWidth: 1,
  },
  subContainer: {
    paddingTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  subText: {color: '#666666', marginTop: 5},
  star: {
    color: '#FEC671',
    fontSize: 22,
    marginLeft: 6.5,
  },
  icon: {
    fontSize: 18,
    color: '#666666',
    marginTop: 5,
    marginRight: 5,
  },
});
export default OrderCard;
