import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {bgcolor, fontfamily, sbgcolor, textColor, yellow} from '../Constants';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import OrderScreen from '../screens/OrderScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
import BillComponent from '../components/BillComponent';
import BillAddressScreen from '../screens/BillAddressScreen';
import {AuthContext} from '../authentication/AuthProvider';
import ViewOrderScreen from '../screens/ViewOrderScreen';

const HomeStack = createStackNavigator();
const OrderStack = createStackNavigator();
const CartStack = createStackNavigator();

const MainTabScreen = () => {
  const Tab = createBottomTabNavigator();
  const {cart} = useContext(AuthContext);
  const iconSize = 26;

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: sbgcolor,
        inactiveTintColor: '#9F9F9F',
        keyboardHidesTabBar: true,
        labelStyle: {fontSize: 12, bottom: 8, fontFamily: fontfamily},
        style: {
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          elevation: 20,
          height: 60,
          backgroundColor: bgcolor,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Entypo
              name="home"
              size={iconSize}
              color={focused ? sbgcolor : '#9F9F9F'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="featured-play-list"
              size={iconSize}
              color={focused ? sbgcolor : '#9F9F9F'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Entypo
                name="shopping-cart"
                size={iconSize}
                color={focused ? sbgcolor : '#9F9F9F'}
              />
              {cart.contents.length ? (
                <View
                  style={{
                    position: 'absolute',
                    backgroundColor: yellow,
                    height: 15,
                    width: 15,
                    borderRadius: 8,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{color: 'black', fontSize: 11, paddingBottom: 2}}>
                    {cart.contents.length}
                  </Text>
                </View>
              ) : null}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="notifications"
              size={iconSize}
              color={focused ? sbgcolor : '#9F9F9F'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="person"
              size={iconSize}
              color={focused ? sbgcolor : '#9F9F9F'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Restaurant" component={RestaurantScreen} />
    </HomeStack.Navigator>
  );
};

const OrderStackScreen = () => {
  return (
    <OrderStack.Navigator screenOptions={{headerShown: false}}>
      <OrderStack.Screen name="Order" component={OrderScreen} />
      <OrderStack.Screen name="View" component={ViewOrderScreen} />
    </OrderStack.Navigator>
  );
};

const CartStackScreen = () => {
  return (
    <CartStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Cart">
      <CartStack.Screen name="Cart" component={CartScreen} />
      <CartStack.Screen name="Payment" component={BillAddressScreen} />
    </CartStack.Navigator>
  );
};

export default MainTabScreen;
