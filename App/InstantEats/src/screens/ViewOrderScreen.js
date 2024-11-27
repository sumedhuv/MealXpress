import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {bgcolor, width} from '../Constants';
import Header from '../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BillComponent from '../components/BillComponent';

const ViewOrderScreen = ({navigation, route}) => {
  const {order} = route.params;
  return (
    <View style={styles.container}>
      <Header isRounded={true}>
        <View
          style={{
            flexDirection: 'row',
            top: 10,
            left: 10,
          }}>
          <Ionicons
            name="arrow-back"
            style={styles.back}
            onPress={navigation.goBack}
          />
          <View style={{justifyContent: 'center', width: width / 1.3}}>
            <Text style={styles.title}>Your Order</Text>
          </View>
        </View>

        <View style={{height: 40}} />
      </Header>
      <ScrollView>
        <Text style={styles.payment}>Payment Mode:- {order.paymentMode}</Text>
        <BillComponent
          order={order}
          changeAddr={false}
          deliveryCharge={parseInt(order.deliveryCharged)}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgcolor,
  },
  title: {
    color: bgcolor,
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
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
    fontWeight: 'bold',
  },
});
export default ViewOrderScreen;
