import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {fontfamily, sbgcolor, width, textColor} from '../Constants';
import Entypo from 'react-native-vector-icons/Entypo';
import {AuthContext} from '../authentication/AuthProvider';

export const VegIcon = ({isVeg}) => {
  return (
    <View
      style={{
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: isVeg ? '#219653' : '#CF0026',
        borderWidth: 3,
        borderRadius: 3,
        height: 20,
        width: 20,
      }}>
      <View
        style={{
          backgroundColor: isVeg ? '#219653' : '#CF0026',
          height: 8,
          width: 8,
          borderRadius: 10,
        }}
      />
    </View>
  );
};

const MenuCard = ({item, vendor}) => {
  const {
    cart,
    addCartItem,
    reduceCartItem,
    updatingCart,
    setCartVendor,
    updateCart,
  } = useContext(AuthContext);

  const {name, description, image, price, isQuantity} = item;
  const isVeg = item.foodType === 'Non-Veg' ? false : true;

  const adder = () => {
    //setQuantity(quantity => quantity + 1);
    if (cart.contents.length === 0) setCartVendor(vendor);
    addCartItem(item);
  };

  const subtractor = () => {
    //setQuantity(quantity => quantity - 1);
    reduceCartItem(item);
  };

  useEffect(() => {
    updateCart();
  }, [cart]);

  const AdderButton = () => {
    return (cart.contents.find(t => t.item._id === item._id) === undefined
      ? 0
      : 1) === 0 ? (
      <TouchableOpacity
        style={styles.add}
        onPress={adder}
        disabled={updatingCart}>
        <Text style={{...styles.quantity, width: '100%', fontSize: 15}}>
          Add
        </Text>
      </TouchableOpacity>
    ) : (
      <View style={styles.add}>
        <TouchableOpacity onPress={subtractor} disabled={updatingCart}>
          <Entypo name={'minus'} style={styles.quantity} />
        </TouchableOpacity>
        <Text style={[styles.quantity, {marginBottom: 2}]}>
          {cart.contents.find(t => t.item._id === item._id).quantity}
        </Text>
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
        <View style={{...styles.component, width: '70%'}}>
          <Text style={styles.name}>{name}</Text>
          <Text style={{color: '#666666'}} numberOfLines={4}>
            {description}
          </Text>
        </View>
      </View>
      <View style={[styles.component, {alignItems: 'flex-end'}]}>
        <Text style={{fontSize: 16}}>₹ {price}</Text>
        <AdderButton />
        <VegIcon isVeg={isVeg} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 1.1,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 2,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 10,
    fontFamily: fontfamily,
    justifyContent: 'space-between',
    paddingVertical: 5,
    overflow: 'hidden',
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 10,
    top: 5,
  },
  name: {
    fontSize: 18,
    color: textColor,
  },

  component: {
    flexDirection: 'column',
    marginLeft: 15,
  },
  add: {
    width: 85,
    height: 30,
    borderColor: sbgcolor,
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: textColor,
  },
});

export default MenuCard;
