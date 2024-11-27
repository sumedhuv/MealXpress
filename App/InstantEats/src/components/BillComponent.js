import React, {useState, useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import {bgcolor, height, sbgcolor, textColor, width} from '../Constants';
import {RadioButton} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../authentication/AuthProvider';
import Modal from 'react-native-modal';
import {ScrollView} from 'react-native-gesture-handler';

const BillComponent = ({
  children,
  address,
  order,
  changeAddr,
  setAddress,
  deliveryCharge,
}) => {
  const {currentUser} = useContext(AuthContext);
  const [changing, setChanging] = useState(false);
  // const [selectedAddress, setSelectedAddress] = useState(
  //   currentUser.addresses[0],
  // );

  const AddressModal = () => {
    const [tempAddress, setTempAddress] = useState(address);
    return (
      <Modal visible={changing} useNativeDriver>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text
              style={{
                fontSize: 20,
                textAlign: 'center',
              }}>
              Change Address
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              marginBottom: 15,
              marginLeft: 15,
            }}>
            <FlatList
              data={currentUser.addresses}
              keyExtractor={(x, i) => i.toString()}
              style={{minHeight: height / 40}}
              renderItem={({item}) => {
                return (
                  <View style={styles.addr}>
                    <RadioButton
                      color={sbgcolor}
                      status={tempAddress === item ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setTempAddress(item);
                        setAddress(item);
                      }}
                    />
                    <Text style={styles.selection}>{item}</Text>
                  </View>
                );
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setAddress(tempAddress);
              setChanging(false);
            }}>
            <Text style={[styles.buttonText, {color: bgcolor}]}>Done</Text>
          </TouchableOpacity>
          <View style={{height: 20}} />
        </View>
      </Modal>
    );
  };

  return (
    <ScrollView>
      <View
        style={[
          styles.container,
          {backgroundColor: changing ? 'rgba(0,0,0,0.15)' : bgcolor},
        ]}>
        <View>
          <View style={[styles.top, {height: 130}]}>
            <Text style={styles.category}>Deliver To</Text>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Ionicons name={'location'} style={styles.icon} />
              <Text style={styles.address} numberOfLines={2}>
                {changeAddr ? address : order.address}
              </Text>
            </View>
            {changeAddr ? (
              <TouchableOpacity onPress={() => setChanging(true)}>
                <Text style={styles.changeText}>Change Address</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <View
            style={[
              styles.top,
              {height: children ? height / 2.3 : height / 2.1},
            ]}>
            <Text style={styles.category}>Your Bill</Text>
            <AddressModal />
            <FlatList
              data={order.contents}
              keyExtractor={(x, i) => i.toString()}
              style={{marginTop: 15}}
              renderItem={({item}) => {
                let subtotal = item.item.price * item.quantity;
                //setTotal(total => total + subtotal);
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 5,
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.billText}>{item.item.name}</Text>
                      <Text style={[styles.billText, {marginLeft: 10}]}>
                        (x{item.quantity})
                      </Text>
                    </View>
                    <Text style={styles.billText}>₹ {subtotal}</Text>
                  </View>
                );
              }}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: textColor}}>Delivery Charges</Text>
            <Text style={{color: textColor}}>+ ₹ {deliveryCharge}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.category}>Your Total</Text>
            <Text style={{fontSize: 16, marginTop: 10, color: textColor}}>
              ₹ {order.totalPrice + deliveryCharge}
            </Text>
          </View>
        </View>
        <View>{children}</View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: width / 1.1,
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  top: {
    marginTop: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  selection: {
    fontSize: 16,
    marginLeft: 10,
    maxWidth: '85%',
    color: textColor,
  },
  addr: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'flex-start',
    margin: 10,
  },
  icon: {
    fontSize: 20,
    color: sbgcolor,
    padding: 3,
    paddingRight: 5,
  },
  category: {
    textTransform: 'uppercase',
    color: '#666666',
    fontSize: 18,
    marginTop: 10,
  },
  address: {
    fontSize: 16,
    width: '90%',
    color: textColor,
  },
  changeText: {
    color: '#666666',
    textDecorationLine: 'underline',
    textAlign: 'right',
  },
  billText: {
    fontSize: 15,
    color: textColor,
  },
  button: {
    height: 60,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    backgroundColor: sbgcolor,
  },
  buttonText: {
    fontSize: 18,
  },
  modalView: {
    height: 'auto',
    maxHeight: height / 1.4,
    backgroundColor: bgcolor,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: '90%',
    //position: 'absolute',
  },
  modalHeader: {
    height: 60,
    borderBottomColor: sbgcolor,
    borderBottomWidth: 1,
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default BillComponent;
