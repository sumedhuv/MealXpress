/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {fontfamily, bgcolor, yellow, width} from '../../Constants';
import Header from '../../components/Header';
import ProfileCard from '../../components/ProfileCard';
import PersonPin from '../../components/PersonPin';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../../authentication/AuthProvider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {EditFields, EditModal} from '../../components/EditModal';
import {updateProfile} from '../common/getProfile';
import {USER_TYPES} from '../../controllers/types';
import API, {ENDPOINTS} from '../../api/apiService';
import Loading from '../../components/Loading';

const ProfileScreen = () => {
  const [editAccount, setEditAccount] = useState(false);
  const [editDelivery, setEditDelivery] = useState(false);
  const [loading, setLoading] = useState(false);
  const {currentUser, setCurrentUser, signOut, userType} =
    useContext(AuthContext);
  const [deliveryCharge, setDeliveryCharge] = useState('');

  const AccountModal = () => {
    const [name, setName] = useState(currentUser.name);

    return (
      <EditModal
        visible={editAccount}
        setVisible={setEditAccount}
        title={'Account Details'}
        onpress={async () => {
          await updateProfile(userType === USER_TYPES.VENDOR, setCurrentUser, {
            name,
          });
        }}>
        <EditFields title={'Name'} n={name} setN={setName} />
      </EditModal>
    );
  };

  const getDeliveryCharge = async () => {
    setLoading(true);
    try {
      let res = await API.get(ENDPOINTS.DELIVERY_CHARGE_ACTIONS, false);
      setDeliveryCharge(res.deliveryCharge);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getDeliveryCharge();
  }, []);

  const DeliveryChargeModal = () => {
    const [charge, setCharge] = useState(deliveryCharge);

    return (
      <EditModal
        visible={editDelivery}
        setVisible={setEditDelivery}
        title={'Delivery Charges'}
        onpress={async () => {
          try {
            let res = await API.post(
              ENDPOINTS.DELIVERY_CHARGE_ACTIONS,
              {
                deliveryCharge: charge,
              },
              true,
            );
            setDeliveryCharge(res.deliveryCharge);
          } catch (error) {
            console.log(error);
          }
        }}>
        <EditFields
          title={'Charge'}
          n={charge}
          setN={setCharge}
          isNumeric={true}
        />
      </EditModal>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            editAccount || editDelivery ? 'rgba(0,0,0,0.15)' : bgcolor,
        },
      ]}>
      <Header isRounded={true}>
        <Text style={styles.title}>{currentUser.name}</Text>
        <View style={{height: 50}} />
      </Header>

      <ProfileCard
        title={'account details'}
        editable={true}
        onPress={() => setEditAccount(true)}>
        <View style={styles.section}>
          <PersonPin />
          <Text style={styles.subtext}>{currentUser.name}</Text>
        </View>
        <View
          style={[
            styles.section,
            {
              marginTop: 10,
              marginBottom: 25,
              marginLeft: 4,
            },
          ]}>
          <FontAwesome name={'phone'} style={styles.icon} />
          <Text style={styles.subtext}>{currentUser.mobile}</Text>
        </View>
      </ProfileCard>

      <ProfileCard
        title={'delivery charges'}
        editable={true}
        onPress={() => setEditDelivery(true)}>
        <View
          style={[
            styles.section,
            {
              marginTop: 10,
              marginBottom: 25,
              marginLeft: 4,
            },
          ]}>
          <FontAwesome name={'rupee'} style={styles.icon} />
          {loading ? (
            <Loading />
          ) : (
            <Text style={styles.subtext}>{deliveryCharge}</Text>
          )}
        </View>
      </ProfileCard>

      <ProfileCard title={'settings'}>
        <TouchableOpacity
          style={[styles.section, {marginTop: 10, marginBottom: 30}]}
          onPress={signOut}>
          <MaterialIcons name={'logout'} style={styles.icon} />
          <Text style={styles.subtext}>Log Out</Text>
        </TouchableOpacity>
      </ProfileCard>
      <AccountModal />
      <DeliveryChargeModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: fontfamily,
  },
  title: {
    color: bgcolor,
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    top: 20,
    letterSpacing: 3,
  },
  icon: {
    fontSize: 26,
    color: yellow,
    marginLeft: 20,
  },
  subtext: {
    marginLeft: 20,
    fontSize: 18,
    width: width / 1.8,
  },
  section: {
    flexDirection: 'row',
  },
});

export default ProfileScreen;
