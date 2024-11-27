import React, {createContext, useState} from 'react';
import {Alert, ToastAndroid} from 'react-native';
import auth from '@react-native-firebase/auth';
import API, {ENDPOINTS} from '../api/apiService';
import StorageManager from '../storage/StorageManager';
import {API_TOKEN, USER} from '../storage/StorageKeys';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [fbUser, setfbUser] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);
  //const [deliveryCharge, setDeliveryCharge] = useState(20);
  const [cart, setCart] = useState({contents: [], totalPrice: 0});
  const [updatingCart, setUpdatingCart] = useState(false);
  const [cartVendor, setCartVendor] = useState(null);
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

  const updateCart = async clear => {
    setUpdatingCart(true);
    let body;
    if (clear) {
      body = {contents: [], totalPrice: 0};
      setCart(body);
      setCartVendor(null);
    } else {
      body = {
        contents: cart.contents.map(i => {
          return {item: i.item._id, quantity: i.quantity};
        }),
        totalPrice: cart.totalPrice,
      };
    }
    if (cart.contents.length === 0) setCartVendor(null);
    try {
      //console.log('Body :- ' + JSON.stringify(body));
      const res = await API.post(ENDPOINTS.GET_UPDATE_CART, body, true);

      //console.log('Updated Cart:- ' + JSON.stringify(res.contents));
    } catch (e) {
      console.log(e);
    }
    setUpdatingCart(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isLoading,
        setIsLoading,
        sendOTP,
        fbUser,
        setfbUser,
        token,
        setToken,
        cart,
        setCart,
        updatingCart,
        updateCart,
        cartVendor,
        setCartVendor,
        fcm,
        setFcm,
        // deliveryCharge,
        // setDeliveryCharge,

        signIn: async (phoneNo, callback) => {
          setIsLoading(true);
          //has registered before
          try {
            const res = await API.post(
              ENDPOINTS.IS_REGISTERED,
              {
                mobile: phoneNo,
              },
              false,
            );
            if (res.success) {
              await sendOTP(phoneNo, callback);
            }
          } catch (e) {
            if (e == 'Error: Request failed with status code 401') {
              Alert.alert(
                'No Such User Found!',
                'The number is not registered with us, please login with a different number or proceed to Sign Up',
                [
                  {
                    text: 'okay',
                    style: 'cancel',
                  },
                ],
              );
            }
          }

          setIsLoading(false);
        },

        checkOTP: async (otp, mobile, signup) => {
          setIsLoading(true);
          try {
            await confirmation.confirm(otp);
            let user = null;
            if (signup) {
              user = await API.post(ENDPOINTS.REGISTER, signup, false);
            } else {
              user = await API.post(
                ENDPOINTS.LOGIN,
                {
                  mobile,
                },
                false,
              );
            }

            //console.log(user);
            if (user.success) {
              await StorageManager.put(API_TOKEN, user.token);
              setToken(user.token);
              let profile = await API.put(ENDPOINTS.UPDATE_USER, {
                registrationToken: fcm,
              });
              await StorageManager.put(USER, profile);
              // console.log(profile);
              setCurrentUser(profile);
            }
          } catch (e) {
            console.log('Error in confirming otp' + e);
          }
          setIsLoading(false);
        },

        signUp: async (phoneNo, callback) => {
          setIsLoading(true);
          try {
            const res = await API.post(
              ENDPOINTS.IS_REGISTERED,
              {
                mobile: phoneNo,
              },
              false,
            );
            if (res.success) {
              ToastAndroid.show(
                `${phoneNo} , This number is already registered`,
                ToastAndroid.SHORT,
              );
              setIsLoading(false);
            }
          } catch (e) {
            if (e == 'Error: Request failed with status code 401') {
              //signUp
              await sendOTP(phoneNo, callback);
            }
          }
        },

        addCartItem: itemComplete => {
          setUpdatingCart(true);
          //let price = getItemPriceById(item);
          // if (cart.contents.length === 0) {
          //   setCart({totalPrice: deliveryCharge, contents: []});
          // }
          if (cart.contents.find(i => i.item._id === itemComplete._id)) {
            let temp = cart.contents.map(t =>
              t.item._id === itemComplete._id
                ? {item: itemComplete, quantity: t.quantity + 1}
                : t,
            );
            setCart(cart => {
              return {
                contents: temp,
                totalPrice: cart.totalPrice + itemComplete.price,
              };
            });
          } else {
            if (
              cart.contents.length === 0 ||
              cart.contents[0].item.createdBy === itemComplete.createdBy
            )
              setCart(cart => {
                return {
                  contents: [
                    ...cart.contents,
                    {item: itemComplete, quantity: 1},
                  ],
                  totalPrice: cart.totalPrice + itemComplete.price,
                };
              });
            else {
              ToastAndroid.show(
                'Your cart cannot contain items from more than one vendor. Order again if you want to do so :) ',
                ToastAndroid.SHORT,
              );
              setUpdatingCart(false);
            }
          }
          //updateCart();
          // setUpdatingCart(false);
        },

        reduceCartItem: itemComplete => {
          setUpdatingCart(true);
          //let price = getItemPriceById(item);
          if (
            cart.contents.find(i => i.item._id === itemComplete._id)
              .quantity === 1
          ) {
            // if (cart.contents.length === 1) {
            //   setCart(cart => {
            //     return {
            //       totalPrice: cart.totalPrice - deliveryCharge,
            //       contents: cart.contents,
            //     };
            //   });
            // }
            setCart(cart => {
              return {
                contents: cart.contents.filter(
                  i => i.item._id != itemComplete._id,
                ),
                totalPrice: cart.totalPrice - itemComplete.price,
              };
            });
          } else {
            let temp = cart.contents.map(t =>
              t.item._id === itemComplete._id
                ? {item: itemComplete, quantity: t.quantity - 1}
                : t,
            );
            setCart(cart => {
              return {
                contents: temp,
                totalPrice: cart.totalPrice - itemComplete.price,
              };
            });
          }
          //updateCart();
          // setUpdatingCart(false);
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
