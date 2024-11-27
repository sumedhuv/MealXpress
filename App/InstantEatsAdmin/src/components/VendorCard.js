/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {textColor, width, yellow} from '../Constants';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

const VendorCard = ({item, isVendor}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{width: '70%'}}>
        {isVendor ? (
          <View>
            <Text style={styles.heading}>{item.registeredRestaurant.name}</Text>
            <Text style={styles.subheading}>{item.name}</Text>
          </View>
        ) : (
          <Text style={styles.heading}>{item.name}</Text>
        )}
      </View>
      <View style={{justifyContent: 'space-between'}}>
        <View style={styles.verifyButtonTouch}>
          {item.isVerified ? (
            <View style={styles.verifyButton}>
              <Text style={styles.verify}>VERIFIED</Text>
            </View>
          ) : (
            <View style={styles.pendingButton}>
              <Text style={styles.verify}>PENDING</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              isVendor ? 'VendorDetails' : 'DeliveryDetails',
              {item},
            )
          }
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-end',
            marginRight: 25,
            marginVertical: 5,
          }}>
          <Text style={styles.view}>View</Text>
          <Entypo name={'chevron-right'} style={styles.arrow} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 1.05,
    backgroundColor: 'white',
    shadowColor: textColor,
    elevation: 5,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  heading: {
    fontSize: 20,
  },
  subheading: {
    fontSize: 14,
    color: '#666666',
    marginTop: 10,
  },
  verifyButton: {
    backgroundColor: 'green',
    height: 25,
    width: width * 0.26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  pendingButton: {
    backgroundColor: '#9f9f9f',
    height: 25,
    width: width * 0.26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  verifyButtonTouch: {
    alignSelf: 'flex-end',
    marginLeft: 10,
  },
  verify: {
    color: 'white',
    letterSpacing: 2,
  },
  view: {
    color: yellow,
    fontSize: 16,
  },
  arrow: {
    color: yellow,
    fontSize: 20,
  },
});

export default VendorCard;
