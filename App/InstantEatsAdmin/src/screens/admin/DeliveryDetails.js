import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import {bgcolor, fontfamily, yellow, width} from '../../Constants';
import ProfileCard from '../../components/ProfileCard';
import PersonPin from '../../components/PersonPin';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
import API, {ENDPOINTS} from '../../api/apiService';

const DeliveryDetails = ({route, navigation}) => {
  const {item} = route.params;
  const [verified, setVerified] = useState(item.isVerified);

  const verify = () => {
    Alert.alert('Are you sure?', 'You want to verify this delivery boy', [
      {
        text: 'cancel',
        style: 'cancel',
      },
      {
        text: 'ok',
        onPress: async () => {
          try {
            let res = await API.post(
              ENDPOINTS.VERIFY_DELIVERY,
              {
                mobile: item.mobile,
              },
              false,
            );
            if (res.message == 'success') {
              ToastAndroid.show(
                'Delivery Boy Verified:) , go Back and refresh page to see changes',
                ToastAndroid.SHORT,
              );
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
      <View style={{justifyContent: 'space-between', flex: 1}}>
        <View>
          <ProfileCard title={'Delivery Boy Details'}>
            <View style={styles.section}>
              <PersonPin />
              <Text style={styles.subtext}>{item.name}</Text>
            </View>
            <View
              style={[
                styles.section,
                {
                  marginTop: 10,
                  marginBottom: 10,
                  marginLeft: 4,
                },
              ]}>
              <FontAwesome name={'phone'} style={styles.icon} />
              <Text style={styles.subtext}>{item.mobile}</Text>
            </View>
            <TouchableOpacity>
              <View
                style={{
                  marginTop: 5,
                  marginBottom: 30,
                  marginLeft: 4,
                  flexDirection: 'row',
                }}>
                <Octicons name={'checklist'} style={styles.icon} />
                <Text style={styles.subtext}>Orders Delivered</Text>
                <Entypo name={'chevron-right'} size={25} />
              </View>
            </TouchableOpacity>
          </ProfileCard>
          {item.bankDetails && (
            <ProfileCard title={'bank details'}>
              <View style={styles.section}>
                <PersonPin />
                <Text
                  style={[styles.subtext, {marginLeft: 23, marginBottom: 15}]}>
                  {item.bankDetails.name}
                </Text>
              </View>
              <View style={[styles.section, {marginBottom: 15}]}>
                <FontAwesome name={'bank'} style={styles.icon} />
                <Text style={styles.subtext}>{item.bankDetails.number}</Text>
              </View>
              <View style={[styles.section, {marginLeft: 5, marginBottom: 15}]}>
                <FontAwesome name={'qrcode'} style={styles.icon} />
                <Text style={[styles.subtext, {marginLeft: 26}]}>
                  IFSC CODE: {item.bankDetails.IFSC}
                </Text>
              </View>
            </ProfileCard>
          )}
        </View>
        <Button label={'VERIFY'} disabled={verified} onpress={verify} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  deliveryBoy: {
    fontFamily: fontfamily,
    fontSize: 30,
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
export default DeliveryDetails;
