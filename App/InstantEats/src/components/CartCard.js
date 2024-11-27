import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {bgcolor, fontfamily, sbgcolor, textColor, width} from '../Constants';
import Entypo from 'react-native-vector-icons/Entypo';
import {AuthContext} from '../authentication/AuthProvider';

const CartCard = ({item, count}) => {
  const {addCartItem, reduceCartItem, updatingCart, updateCart, cart} =
    useContext(AuthContext);
  const {name, image, price} = item;

  const adder = () => {
    addCartItem(item);
  };

  const subtractor = () => {
    reduceCartItem(item);
  };
  useEffect(() => {
    updateCart();
  }, [cart]);

  const AdderButton = () => {
    return (
      <View style={styles.add}>
        <TouchableOpacity onPress={subtractor} disabled={updatingCart}>
          <Entypo name={'minus'} style={styles.quantity} />
        </TouchableOpacity>
        <Text style={[styles.quantity, {marginBottom: 2}]}>{count}</Text>
        <TouchableOpacity onPress={adder} disabled={updatingCart}>
          <Entypo name={'plus'} style={styles.quantity} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', width: '70%'}}>
        <Image style={styles.image} source={{uri: image}} />
        <View style={styles.component}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={[styles.description, {color: '#666666'}]}>
            ₹ {price}
          </Text>
        </View>
      </View>
      <AdderButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: width / 1.05,
    alignSelf: 'center',
    flexDirection: 'row',
    marginVertical: 10,
    fontFamily: fontfamily,
    borderRadius: 10,
    justifyContent: 'space-around',
    backgroundColor: bgcolor,
    elevation: 10,
    shadowColor: textColor,
    alignItems: 'center',
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    color: textColor,
  },
  description: {
    width: width / 2.5,
    color: textColor,
  },
  component: {
    marginLeft: 15,
  },
  add: {
    width: 70,
    height: 28,
    borderColor: sbgcolor,
    borderWidth: 2,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  quantity: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: textColor,
  },
});

export default CartCard;
