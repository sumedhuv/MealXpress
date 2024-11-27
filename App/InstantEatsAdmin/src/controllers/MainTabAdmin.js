import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {bgcolor, sbgcolor, fontfamily, textColor} from '../Constants';

import PeopleScreen from '../screens/admin/PeopleScreen';
import DuesScreen from '../screens/admin/DuesScreen';
import MediaScreen from '../screens/admin/MediaScreen';
import OrderScreen from '../screens/delivery/OrderScreen';
import ProfileScreen from '../screens/admin/ProfileScreen';
import OrderDetails from '../screens/admin/OrderDetails';
import VendorDetails from '../screens/admin/VendorDetails';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DeliveryDetails from '../screens/admin/DeliveryDetails';

const OrderStack = createStackNavigator();
const PeopleStack = createStackNavigator();
const MainTabAdmin = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      shifting={true}
      tabBarOptions={{
        activeTintColor: sbgcolor,
        inactiveTintColor: '#9F9F9F',
        keyboardHidesTabBar: true,
        labelStyle: {fontSize: 15, bottom: 8, fontFamily: fontfamily},
        style: {
          elevation: 20,
          height: 66,
          backgroundColor: bgcolor,
          shadowColor: textColor,
        },
      }}>
      <Tab.Screen
        name="People"
        component={PeopleStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="people"
              size={30}
              color={focused ? sbgcolor : '#9F9F9F'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Dues"
        component={DuesScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="credit-card"
              size={30}
              color={focused ? sbgcolor : '#9F9F9F'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Media"
        component={MediaScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="newspaper"
              size={30}
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
              size={30}
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
              size={30}
              color={focused ? sbgcolor : '#9F9F9F'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const PeopleStackScreen = () => {
  return (
    <PeopleStack.Navigator screenOptions={{headerShown: false}}>
      <PeopleStack.Screen name="VendorList" component={PeopleScreen} />
      <PeopleStack.Screen name="VendorDetails" component={VendorDetails} />
      <PeopleStack.Screen name="DeliveryDetails" component={DeliveryDetails} />
    </PeopleStack.Navigator>
  );
};

const OrderStackScreen = () => {
  return (
    <OrderStack.Navigator screenOptions={{headerShown: false}}>
      <OrderStack.Screen name="Order" component={OrderScreen} />
      <OrderStack.Screen name="Details" component={OrderDetails} />
    </OrderStack.Navigator>
  );
};

export default MainTabAdmin;
