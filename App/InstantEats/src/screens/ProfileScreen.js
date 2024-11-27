import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Keyboard,
  ActivityIndicator,
  ToastAndroid,
  Share,
  Linking,
} from 'react-native';
import {
  bgcolor,
  fontfamily,
  width,
  yellow,
  sbgcolor,
  height,
  textColor,
  aboutUs,
  privacyPolicy,
} from '../Constants';
import Header from '../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProfileCard from '../components/ProfileCard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../authentication/AuthProvider';
import Modal from 'react-native-modal';
import API, {ENDPOINTS} from '../api/apiService';
import StorageManager from '../storage/StorageManager';
import {USER} from '../storage/StorageKeys';

// const useForceUpdate = () => {
//   const [value, setValue] = useState(0); // integer state
//   return () => setValue(value => value + 1); // update the state to force render
// };

const ProfileScreen = () => {
  const {currentUser, setCurrentUser, fcm} = useContext(AuthContext);
  const [editAccount, setEditAccount] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [about, setAbout] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const appURL =
    'https://play.google.com/store/apps/details?id=com.mealxpressuser';

  const {signOut} = useContext(AuthContext);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Hey! there,\nDownload MEAL XPRESS App from Google Playstore: ${appURL} \nand enjoy delicious meals at the comfort of your home`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const PersonPin = () => {
    return (
      <View>
        <Ionicons name={'chatbox-outline'} style={styles.icon} />
        <Ionicons
          name={'person'}
          style={{
            position: 'absolute',
            color: yellow,
            fontSize: 14,
            left: 25,
            top: 4,
          }}
        />
      </View>
    );
  };

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

  const updateProfile = async body => {
    setSubmitting(true);
    if (body.name === '' || body.addresses.length === 0) {
      ToastAndroid.show("Fields can't be empty", ToastAndroid.SHORT);
    } else {
      try {
        const res = await API.put(ENDPOINTS.UPDATE_USER, body, true);
        setCurrentUser(res);
        await StorageManager.put(USER, JSON.stringify(res));
        setEditAddress(false);
        setEditAccount(false);
      } catch (e) {
        console.log(e);
      }
    }

    setSubmitting(false);
  };

  const EditModal = ({children, type, title, tempAddress, name, email}) => {
    const [canSubmit, setCanSubmit] = useState(true);
    useEffect(() => {
      const listener1 = Keyboard.addListener('keyboardDidShow', () =>
        setCanSubmit(false),
      );
      const listener2 = Keyboard.addListener('keyboardDidHide', () =>
        setCanSubmit(true),
      );

      return listener1, listener2;
    }, []);
    return (
      <Modal
        visible={type === 'account' ? editAccount : editAddress}
        //animationType="slide"
        useNativeDriver
        transparent>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text
              style={{
                fontSize: 24,
                textAlign: 'center',
                color: textColor,
              }}>
              {title}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              marginBottom: 15,
              marginLeft: 15,
            }}>
            {children}
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={[styles.button, {borderWidth: 1, borderColor: sbgcolor}]}
              onPress={() => {
                setEditAccount(false);
                setEditAddress(false);
              }}>
              <Text style={[styles.buttonText, {color: sbgcolor}]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    !canSubmit || submitting ? '#EBEBE4' : sbgcolor,
                  flexDirection: 'row',
                },
              ]}
              disabled={!canSubmit || submitting}
              onPress={() => {
                updateProfile({
                  name,
                  email,
                  addresses: tempAddress.filter(i => i != ''),
                  registrationToken: fcm,
                });
              }}>
              {submitting ? (
                <ActivityIndicator size={'small'} color={bgcolor} />
              ) : null}
              <Text style={[styles.buttonText, {color: bgcolor}]}>Done</Text>
            </TouchableOpacity>
          </View>
          <View style={{height: 20}} />
        </View>
      </Modal>
    );
  };

  const EditFields = ({title, callBack, prev, setTempAddress}) => {
    const isAddress = title.includes('Address');
    return (
      <View style={{marginBottom: 15}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
          }}>
          <Text style={styles.modalText}>{title}</Text>
          {isAddress ? (
            <MaterialIcons
              name={'delete'}
              style={[styles.modalText, {fontSize: 24}]}
              onPress={() =>
                setTempAddress(tempAddress =>
                  tempAddress.filter(i => i != prev),
                )
              }
            />
          ) : null}
        </View>
        <TextInput
          style={styles.textInput}
          value={prev}
          onChangeText={n =>
            isAddress
              ? setTempAddress(tempAddress =>
                  tempAddress.map(i => (i === prev ? n : i)),
                )
              : callBack(n)
          }
          keyboardType={title === 'Phone' ? 'phone-pad' : 'default'}
          maxLength={title === 'Phone' ? 10 : null}
        />
      </View>
    );
  };

  const addAddressField = setTempAddress => {
    setTempAddress(tempAddress => [...tempAddress, '']);
  };

  const EditAddress = () => {
    const [tempAddress, setTempAddress] = useState(currentUser.addresses);

    return (
      <EditModal
        type={'address'}
        title={'Saved Addresses'}
        tempAddress={tempAddress}
        name={currentUser.name}
        email={currentUser.email}
        setTempAddress={setTempAddress}>
        <FlatList
          data={tempAddress}
          style={{marginTop: 10, height: '50%'}}
          keyExtractor={(x, i) => i.toString()}
          renderItem={({item, index}) => {
            return (
              <EditFields
                type={'address'}
                title={`Address ${index + 1}`}
                setTempAddress={setTempAddress}
                //callBack1={editAddressField}
                prev={item}
              />
            );
          }}
        />
        <TouchableOpacity
          style={styles.addAddressButton}
          onPress={() => addAddressField(setTempAddress)}>
          <Text style={{fontSize: 20}}>+ Add New Address</Text>
        </TouchableOpacity>
      </EditModal>
    );
  };

  const EditAccount = () => {
    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    return (
      <EditModal
        type={'account'}
        title={'Account Details'}
        tempAddress={currentUser.addresses}
        email={email}
        name={name}>
        <EditFields title={'Name'} callBack={setName} prev={name} />
        <EditFields title={'Email'} callBack={setEmail} prev={email} />
      </EditModal>
    );
  };

  const ShowModal = () => {
    return (
      <Modal
        visible={about || privacy}
        //animationType="slide"
        useNativeDriver
        transparent>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text
              style={{
                fontSize: 24,
                textAlign: 'center',
                color: textColor,
              }}>
              {about ? 'About Us' : 'Privacy Policy'}
            </Text>
          </View>
          <ScrollView
            style={{
              marginVertical: 10,
              marginLeft: 15,
            }}>
            <Text style={{fontSize: 16}}>
              {about ? aboutUs : privacyPolicy}
            </Text>
          </ScrollView>

          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: sbgcolor,
                alignSelf: 'center',
              },
            ]}
            onPress={() => (about ? setAbout(false) : setPrivacy(false))}>
            <Text style={[styles.buttonText, {color: bgcolor}]}>Done</Text>
          </TouchableOpacity>

          <View style={{height: 20}} />
        </View>
      </Modal>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            editAccount || editAddress || about || privacy
              ? 'rgba(0,0,0,0.15)'
              : bgcolor,
        },
      ]}>
      <Header isRounded={true}>
        <Text style={styles.title}>{currentUser.name}</Text>
        <View style={{height: 50}} />
      </Header>
      <ScrollView style={{flex: 1}}>
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
                top: 15,
                marginBottom: 30,
                marginLeft: 4,
              },
            ]}>
            <FontAwesome name={'phone'} style={styles.icon} />
            <Text style={styles.subtext}>{currentUser.mobile}</Text>
          </View>
          <View style={[styles.section, {marginBottom: 20}]}>
            <FontAwesome name={'envelope-o'} style={styles.icon} />
            <Text style={styles.subtext}>
              {currentUser.email || 'please enter your email'}
            </Text>
          </View>
        </ProfileCard>
        <ProfileCard
          title={'saved addresses'}
          editable={true}
          onPress={() => setEditAddress(true)}>
          {currentUser.addresses.map((item, index) => (
            <View style={[styles.section, {marginBottom: 5}]} key={index}>
              <Ionicons name={'location-outline'} style={styles.icon} />
              <Text style={styles.subtext}>{item}</Text>
            </View>
          ))}
          <View style={{height: 20}} />
        </ProfileCard>
        <ProfileCard title={'settings'}>
          <TouchableOpacity
            style={styles.section}
            onPress={() => setAbout(true)}>
            <Ionicons name={'information-circle-outline'} style={styles.icon} />
            <Text style={styles.subtext}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.section, {marginTop: 15}]}
            onPress={() => setPrivacy(true)}>
            <PrivacyIcon />
            <Text style={styles.subtext}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.section, {marginTop: 15}]}
            onPress={onShare}>
            <Ionicons name={'person-add-outline'} style={styles.icon} />
            <Text style={styles.subtext}>Invite Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.section, {marginTop: 15}]}
            onPress={() => {
              Linking.openURL(appURL);
            }}>
            <Ionicons name={'star-outline'} style={styles.icon} />
            <Text style={styles.subtext}>Rate us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.section, {marginTop: 15, marginBottom: 30}]}
            onPress={signOut}>
            <MaterialIcons name={'logout'} style={styles.icon} />
            <Text style={styles.subtext}>Log Out</Text>
          </TouchableOpacity>
        </ProfileCard>
        <EditAccount />
        <EditAddress />
        <ShowModal />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: fontfamily,
    //justifyContent: 'space-evenly',
  },
  title: {
    color: bgcolor,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    top: 20,
    letterSpacing: 3,
  },
  icon: {
    fontSize: 22,
    color: yellow,
    marginLeft: 20,
  },
  subtext: {
    marginLeft: 18,
    fontSize: 18,
    width: width / 1.8,
    color: textColor,
  },
  section: {
    flexDirection: 'row',
  },
  button: {
    height: 60,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
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
  },
  modalHeader: {
    height: 60,
    borderBottomColor: sbgcolor,
    borderBottomWidth: 1,
    justifyContent: 'center',
    marginTop: 10,
  },
  modalText: {
    color: '#666666',
    fontSize: 15,
    textAlign: 'left',
  },
  textInput: {
    width: '90%',
    backgroundColor: '#DDDDDD',
    borderBottomColor: '#666666',
    borderBottomWidth: 1,
    fontSize: 15,
    borderRadius: 5,
    marginTop: 5,
    color: 'black',
  },
  addAddressButton: {
    width: '90%',
    backgroundColor: '#DDDDDD',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default ProfileScreen;
