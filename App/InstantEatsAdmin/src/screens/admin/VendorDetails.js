import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Alert,
} from 'react-native';
import ProfileCard from '../../components/ProfileCard';
import Header from '../../components/Header';
import PersonPin from '../../components/PersonPin';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {fontfamily, bgcolor, yellow, width} from '../../Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
import API, {ENDPOINTS} from '../../api/apiService';
import {sendNotificationToAll} from '../common/getProfile';

const VendorDetails = ({route, navigation}) => {
  const {item} = route.params;
  const [verified, setVerified] = useState(item.isVerified);
  const {name, address, number} = item.registeredRestaurant;

  const verify = () => {
    Alert.alert('Are you sure?', 'You want to verify this vendor', [
      {
        text: 'cancel',
        style: 'cancel',
      },
      {
        text: 'ok',
        onPress: async () => {
          console.log(item.mobile);
          try {
            let res = await API.post(
              ENDPOINTS.VERIFY_VENDOR,
              {
                mobile: item.mobile,
              },
              false,
            );
            if (res.message == 'success') {
              ToastAndroid.show(
                'Vendor Verified:) , go Back and refresh page to see changes',
                ToastAndroid.SHORT,
              );

              await sendNotificationToAll({
                title: 'Hooray :( ',
                body: 'A new vendor is added',
              });

              setVerified(true);
            }
          } catch (e) {
            console.log(e);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigation.goBack}>
        <Header isRounded={true}>
          <Ionicons name="arrow-back" style={styles.back} />
          <Text style={styles.title}>{item.name}</Text>

          <View style={{height: 50}} />
        </Header>
      </TouchableOpacity>
      <ScrollView>
        <ProfileCard title={'vendor account details'}>
          <View style={styles.section}>
            <PersonPin />
            <Text style={styles.subtext}>{item.name}</Text>
          </View>
          <View
            style={[
              styles.section,
              {
                marginTop: 10,
                marginBottom: 25,
                marginLeft: 6,
              },
            ]}>
            <FontAwesome name={'phone'} style={styles.icon} />
            <Text style={styles.subtext}>{item.mobile}</Text>
          </View>
        </ProfileCard>
        <ProfileCard title={'restaurant details'}>
          <View style={styles.section}>
            <MaterialIcons name={'restaurant'} style={styles.icon} />
            <Text style={[styles.subtext, {marginLeft: 20}]}>{name}</Text>
          </View>
          <View style={{...styles.section, marginTop: 10}}>
            <MaterialIcons name={'call'} style={styles.icon} />
            <Text style={styles.subtext}>{number}</Text>
          </View>
          <View style={{...styles.section, marginTop: 10, marginBottom: 20}}>
            <MaterialIcons name={'location-on'} style={styles.icon} />
            <Text style={[styles.subtext, {marginLeft: 20}]}>{address}</Text>
          </View>
        </ProfileCard>
        {item.bankDetails && (
          <ProfileCard title={'bank details'}>
            <View style={styles.section}>
              <PersonPin />
              <Text style={[styles.subtext, {marginLeft: 23}]}>
                {item.bankDetails.name}
              </Text>
            </View>
            <View style={{...styles.section, marginTop: 10}}>
              <FontAwesome name={'bank'} style={styles.icon} />
              <Text style={styles.subtext}>{item.bankDetails.number}</Text>
            </View>
            <View
              style={[
                styles.section,
                {marginLeft: 5, marginTop: 15, marginBottom: 20},
              ]}>
              <FontAwesome name={'qrcode'} style={styles.icon} />
              <Text style={[styles.subtext, {marginLeft: 24}]}>
                IFSC CODE: {item.bankDetails.IFSC}
              </Text>
            </View>
            <View style={{alignSelf: 'center'}}>
              <Button label={'VERIFY'} disabled={verified} onpress={verify} />
            </View>
          </ProfileCard>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: fontfamily,
    backgroundColor: bgcolor,
  },
  back: {
    color: bgcolor,
    fontSize: 30,
    marginLeft: 20,
    position: 'absolute',
    top: 20,
  },
  title: {
    color: bgcolor,
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 3,
    top: 20,
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

export default VendorDetails;
