import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList, ToastAndroid} from 'react-native';
import {bgcolor, fontfamily, height, textColor} from '../Constants';
import Header from '../components/Header';
import CartCard from '../components/CartCard';
import Button from '../components/Button';
import {AuthContext} from '../authentication/AuthProvider';
import API, {ENDPOINTS} from '../api/apiService';

const CartScreen = ({navigation}) => {
  const {cart, cartVendor, isLoading, setIsLoading} = useContext(AuthContext);
  const [deliveryCharge, setDeliveryCharge] = useState(0);

  const placeorder = () => {
    if (cart.contents.length === 0) {
      return ToastAndroid.show('Your cart is empty :(', ToastAndroid.SHORT);
    }
    navigation.navigate('Payment', {deliveryCharge});
  };

  const getDeliveryCharge = async () => {
    setIsLoading(true);
    try {
      let res = await API.get(ENDPOINTS.GET_DELIVERY_CHARGE, false);
      setDeliveryCharge(parseInt(res.deliveryCharge));
    } catch (error) {
      console.log(error);
      setDeliveryCharge(20);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getDeliveryCharge();
  }, []);

  return (
    <View style={styles.container}>
      <Header isRounded={true}>
        <Text style={styles.title}>Cart</Text>
        <View style={{height: 50}} />
      </Header>
      <View style={styles.location}>
        <Text style={styles.name}>
          {cartVendor
            ? cartVendor.registeredRestaurant.name
            : 'Your cart is empty :('}
        </Text>
        <Text style={styles.outlet}>
          {cartVendor
            ? cartVendor.registeredRestaurant.address
            : 'Add items to view them here'}
        </Text>
      </View>
      <FlatList
        data={cart.contents}
        style={{height: '57%'}}
        keyExtractor={(x, i) => i.toString()}
        renderItem={({item}) => {
          return <CartCard item={item.item} count={item.quantity} />;
        }}
      />
      {cart.contents.length === 0 ? null : (
        <View style={styles.amountcontainer}>
          <Text style={{fontSize: 14, color: textColor}}>Delivery Charges</Text>
          <Text style={{fontSize: 14, color: textColor}}>
            + ₹ {deliveryCharge}
          </Text>
        </View>
      )}
      <View style={styles.amountcontainer}>
        <Text style={styles.amounttext}>Current Total</Text>
        <Text style={styles.amount}>
          ₹ {cart.totalPrice ? cart.totalPrice + deliveryCharge : 0}
        </Text>
      </View>
      <Button label="PLACE ORDER" onpress={placeorder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: fontfamily,
    backgroundColor: bgcolor,
  },
  clear: {
    color: 'grey',
    textDecorationLine: 'underline',
    fontSize: 15,
    fontWeight: 'bold',
  },
  clearB: {
    position: 'absolute',
    marginTop: height * 0.45,
    alignSelf: 'center',
  },
  title: {
    color: bgcolor,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    top: 20,
    letterSpacing: 3,
  },
  location: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#9F9F9F',
    marginHorizontal: 10,
    paddingVertical: 16,
    // flexDirection: 'row',
    // justifyContent: 'space-evenly',
  },
  name: {fontSize: 18, color: textColor},
  outlet: {fontSize: 12, color: '#666666'},
  amountcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    borderTopColor: '#9F9F9F',
    borderTopWidth: 1,
    marginTop: 10,
  },
  amounttext: {
    textTransform: 'uppercase',
    color: textColor,
    fontSize: 16,
    marginTop: 10,
  },
  amount: {fontSize: 16, marginTop: 10, color: textColor},
});

export default CartScreen;
