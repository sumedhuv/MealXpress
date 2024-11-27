/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  LogBox,
  TextInput,
} from 'react-native';
import {bgcolor, fontfamily, width, yellow, textColor} from '../../Constants';
import Header from '../../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProfileCard from '../../components/ProfileCard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../../authentication/AuthProvider';
import PersonPin from '../../components/PersonPin';
import {updateProfile} from '../common/getProfile';
import {USER_TYPES} from '../../controllers/types';
import {EditModal} from '../../components/EditModal';

// const useForceUpdate = () => {
//   const [value, setValue] = useState(0); // integer state
//   return () => setValue(value => value + 1); // update the state to force render
// };

const ProfileScreen = () => {
  const {currentUser, setCurrentUser, signOut, userType} =
    useContext(AuthContext);
  const [editAccount, setEditAccount] = useState(false);
  const [editBank, setEditBank] = useState(false);

  const PrivacyIcon = () => {
    return (
      <View>
        <Ionicons name={'shield-outline'} style={styles.icon} />
        <Ionicons
          name={'information'}
          style={{
            position: 'absolute',
            fontSize: 20,
            color: yellow,
            top: 2,
            left: 23,
          }}
        />
      </View>
    );
  };

  const EditFields = ({title, n, setN}) => {
    // const [n, setN] = useState(prev);

    return (
      <View style={{marginBottom: 15}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
          }}>
          <Text style={styles.modalText}>{title}</Text>
        </View>
        <TextInput
          style={styles.textInput}
          value={n}
          onChangeText={n => setN(n)}
          keyboardType={
            title === 'Phone' || title.includes('Acc') ? 'phone-pad' : 'default'
          }
          maxLength={title === 'Phone' ? 10 : null}
        />
      </View>
    );
  };

  const EditAccount = () => {
    const [name, setName] = useState(currentUser.name);
    return (
      <EditModal
        title={'Account Details'}
        visible={editAccount}
        setVisible={setEditAccount}
        onpress={async () => {
          await updateProfile(userType === USER_TYPES.VENDOR, setCurrentUser, {
            name,
          });
        }}>
        <EditFields title={'Name'} n={name} setN={setName} />
      </EditModal>
    );
  };

  const EditBankDetails = () => {
    const [holdersName, setHoldersName] = useState(
      currentUser.bankDetails.name,
    );
    const [accountNo, setAccountNo] = useState(currentUser.bankDetails.number);
    const [ifsc, setIfsc] = useState(currentUser.bankDetails.IFSC);
    return (
      <EditModal
        title={'Bank Account Details'}
        visible={editBank}
        setVisible={setEditBank}
        onpress={async () => {
          await updateProfile(userType === USER_TYPES.VENDOR, setCurrentUser, {
            bankDetails: {
              name: holdersName,
              number: accountNo,
              IFSC: ifsc,
            },
          });
        }}>
        <EditFields
          title={'Holders Name'}
          n={holdersName}
          setN={setHoldersName}
        />
        <EditFields
          title={'Account Number'}
          n={accountNo}
          setN={setAccountNo}
        />
        <EditFields title={'IFSC Code'} n={ifsc} setN={setIfsc} />
      </EditModal>
    );
  };

  useEffect(() => {
    LogBox.ignoreLogs([
      'VirtualizedLists should never be nested inside plain ScrollViews',
    ]);
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            editAccount || editBank ? 'rgba(0,0,0,0.15)' : bgcolor,
        },
      ]}>
      <Header isRounded={true}>
        <Text style={styles.title}>{currentUser.name}</Text>
        <View style={{height: 50}} />
      </Header>
      <ScrollView>
        <View style={{top: 5}}>
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
                  marginLeft: 4,
                },
              ]}>
              <FontAwesome name={'phone'} style={styles.icon} />
              <Text style={styles.subtext}>{currentUser.mobile}</Text>
            </View>
          </ProfileCard>
          <ProfileCard
            title={'bank details'}
            editable={true}
            onPress={() => setEditBank(true)}>
            <View style={styles.section}>
              <PersonPin />
              <Text style={[styles.subtext, {marginLeft: 23}]}>
                {currentUser.bankDetails.name}
              </Text>
            </View>
            <View style={styles.section}>
              <FontAwesome name={'bank'} style={styles.icon} />
              <Text style={styles.subtext}>
                {currentUser.bankDetails.number}
              </Text>
            </View>
            <View style={[styles.section, {marginLeft: 5}]}>
              <FontAwesome name={'qrcode'} style={styles.icon} />
              <Text style={[styles.subtext, {marginLeft: 26}]}>
                {currentUser.bankDetails.IFSC}
              </Text>
            </View>
          </ProfileCard>
          <ProfileCard title={'settings'}>
            {/* <TouchableOpacity style={styles.section}>
              <Ionicons
                name={'information-circle-outline'}
                style={styles.icon}
              />
              <Text style={styles.subtext}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.section}>
              <PrivacyIcon />
              <Text style={styles.subtext}>Privacy Policy</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity style={styles.section}>
              <Ionicons name={'person-add-outline'} style={styles.icon} />
              <Text style={styles.subtext}>Invite Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.section}>
              <Ionicons name={'star-outline'} style={styles.icon} />
              <Text style={styles.subtext}>Rate us</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.section} onPress={signOut}>
              <MaterialIcons name={'logout'} style={styles.icon} />
              <Text style={styles.subtext}>Log Out</Text>
            </TouchableOpacity>
          </ProfileCard>
        </View>
        <EditAccount />
        <EditBankDetails />
      </ScrollView>
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
    color: textColor,
  },
  section: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  textInput: {
    width: '90%',
    backgroundColor: '#DDDDDD',
    borderBottomColor: '#666666',
    borderBottomWidth: 1,
    fontSize: 16,
    borderRadius: 5,
    marginTop: 5,
  },
});

export default ProfileScreen;
