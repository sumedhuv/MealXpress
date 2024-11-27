import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {fontfamily, width, textColor} from '../Constants';
import {useNavigation} from '@react-navigation/native';
import {VegIcon} from './MenuCard';

const ItemCard = ({vendor, name, price, image, isVeg}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.scontainer}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate('Restaurant', {item: vendor})}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '50%',
          }}>
          <Image style={styles.image} source={{uri: image}} />
          <View style={styles.component}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.vendor} numberOfLines={4}>
              {vendor.registeredRestaurant.name}
            </Text>
          </View>
        </View>
        <View style={styles.component}>
          <Text style={{fontSize: 16, color: textColor}}>₹ {price}</Text>
          <VegIcon isVeg={isVeg} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  scontainer: {
    width: width / 1.1,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 2,
    alignSelf: 'center',
    marginTop: 10,
    paddingVertical: 5,
  },
  container: {
    flexDirection: 'row',
    fontFamily: fontfamily,
    justifyContent: 'space-between',
  },
  vendor: {
    textTransform: 'uppercase',
    color: '#666666',
    //fontSize: 20,
    marginTop: 10,
    color: textColor,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    color: textColor,
  },

  component: {
    marginLeft: 15,
  },
});
export default ItemCard;
