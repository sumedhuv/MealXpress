import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {bgcolor, fontfamily, height, sbgcolor, width} from '../Constants';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

const CartCard = ({name, image, price}) => {
  const [quantity, setQuantity] = useState(1);

  const adder = () => {
    setQuantity(quantity => quantity + 1);
  };

  const subtractor = () => {
    setQuantity(quantity => quantity - 1);
  };

  const AdderButton = () => {
    return (
      <View style={styles.add}>
        <Entypo name={'minus'} style={styles.quantity} onPress={subtractor} />
        <Text style={[styles.quantity, {marginBottom: 2}]}>{quantity}</Text>
        <Entypo name={'plus'} style={styles.quantity} onPress={adder} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', top: 5}}>
        <Image style={styles.image} source={image} />
        <View style={styles.component}>
          <Text style={styles.name}>{name}</Text>
          <Text style={[styles.description, {color: '#666666'}]}>{price}</Text>
        </View>
      </View>
      <AdderButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: width / 1.05,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 10,
    fontFamily: fontfamily,
    borderRadius: 10,
    justifyContent: 'space-around',
    backgroundColor: bgcolor,
    elevation: 10,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 10,
    top: 5,
  },
  name: {
    fontSize: 22,
  },
  description: {
    fontSize: 15,
    width: width / 2.5,
  },
  component: {
    marginLeft: 15,
    top: 5,
  },
  add: {
    width: 85,
    height: 30,
    borderColor: sbgcolor,
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CartCard;
