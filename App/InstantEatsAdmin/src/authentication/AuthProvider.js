import React, {createContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {USER_TYPES} from '../controllers/types';
import API, {ENDPOINTS} from '../api/apiService';
import StorageManager from '../storage/StorageManager';
import {USER_TYPE, API_TOKEN, USER} from '../storage/StorageKeys';
import {updateProfile} from '../screens/common/getProfile';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState(USER_TYPES.VENDOR);
  const [fbUser, setfbUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  //const [deliveryCharge, setDeliveryCharge] = useState(20);
  const [fcm, setFcm] = useState(null);

  const sendOTP = async (phoneNo, callback) => {
    try {
      const confirm = await auth().signInWithPhoneNumber(
        `+91 ${phoneNo}`,
        true,
      );
      setConfirmation(confirm);
      if (callback) callback();
    } catch (e) {
      console.log('Error in phone number signing!! :- ' + e);
    }
  };

  const checkOrloginUser = async (mobile, registering = false, callback) => {
    try {
      const res = await API.post(
        userType === USER_TYPES.VENDOR
          ? ENDPOINTS.VENDOR_LOGIN
          : ENDPOINTS.LOGIN,
        {
          mobile,
        },
        false,
      );
      //console.log(res);
      if (res.success) {
        if (
          userType === USER_TYPES.VENDOR
            ? res.sendVendor.role !== userType
            : res.sendUser.role !== userType
        ) {
          Alert.alert(
            'No Such User Found!',
            'The number is registered with us, but not with this type . Please try again',
            [
              {
                text: 'okay',
                style: 'cancel',
              },
            ],
          );
        } else {
          await sendOTP(mobile, callback);
        }
      }
    } catch (e) {
      console.log(e);
      if (e == 'Error: Request failed with status code 401') {
        {
          !registering
            ? Alert.alert(
                'No Such User Found!',
                'The number is not registered with us, please login with a different number or proceed to Sign Up',
                [
                  {
                    text: 'okay',
                    style: 'cancel',
                  },
                ],
              )
            : callback(); // register here
        }
      }
    }
  };

  useEffect(() => {
    setIsVerified(currentUser ? currentUser.isVerified : true);
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isLoading,
        setIsLoading,
        sendOTP,
        userType,
        setUserType,
        fbUser,
        setfbUser,
        token,
        setToken,
        isVerified,
        setIsVerified,
        // deliveryCharge,
        // setDeliveryCharge,
        fcm,
        setFcm,

        signIn: async (phoneNo, callback) => {
          setIsLoading(true);
          //has registered before
          await checkOrloginUser(phoneNo, false, callback);

          //await sendOTP(phoneNo, callback);
          setIsLoading(false);
        },

        checkOTP: async (otp, mobile, signup) => {
          setIsLoading(true);
          try {
            await confirmation.confirm(otp);
            let user = null;
            if (signup) {
              user = await API.post(
                userType === USER_TYPES.VENDOR
                  ? ENDPOINTS.VENDOR_REGISTER
                  : ENDPOINTS.REGISTER,
                signup,
                false,
              );
            } else {
              user = await API.post(
                userType === USER_TYPES.VENDOR
                  ? ENDPOINTS.VENDOR_LOGIN
                  : ENDPOINTS.LOGIN,
                {
                  mobile,
                },
                false,
              );
            }

            //console.log(user);
            if (user.success) {
              await StorageManager.put(API_TOKEN, user.token);
              await StorageManager.put(USER_TYPE, userType);
              await updateProfile(
                userType === USER_TYPES.VENDOR,
                setCurrentUser,
                {
                  registrationToken: fcm,
                },
              );
              await StorageManager.put(
                USER,
                JSON.stringify(
                  userType === USER_TYPES.VENDOR
                    ? user.sendVendor
                    : user.sendUser,
                ),
              );
              setToken(user.token);
              setCurrentUser(
                userType === USER_TYPES.VENDOR
                  ? user.sendVendor
                  : user.sendUser,
              );
            }
          } catch (e) {
            console.log('Error in confirming otp' + e);
          }
          setIsLoading(false);
        },

        signUp: async (phoneNo, callback) => {
          setIsLoading(true);
          checkOrloginUser(
            phoneNo,
            true,
            async () => await sendOTP(phoneNo, callback),
          );
        },

        signOut: () => {
          Alert.alert('Are You sure ?', `Do you want to SignOut...`, [
            {
              text: 'NO',
              style: 'cancel',
            },
            {
              text: 'YES',
              onPress: async () => {
                try {
                  await StorageManager.clearStore();
                  await auth().signOut();
                  setToken(null);
                  setCurrentUser(null);
                } catch (e) {
                  console.log(e);
                }
              },
            },
          ]);
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
