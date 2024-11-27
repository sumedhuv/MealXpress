import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {bgcolor, fontfamily, sbgcolor, textColor} from '../Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OrderScreen from '../screens/delivery/OrderScreen';
import ProfileScreen from '../screens/delivery/ProfileScreen';
import OrderDetails from '../screens/delivery/OrderDetails';

const OrderStack = createStackNavigator();

const MainTabDelivery = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
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

const OrderStackScreen = () => {
  return (
    <OrderStack.Navigator screenOptions={{headerShown: false}}>
      <OrderStack.Screen name="Order" component={OrderScreen} />
      <OrderStack.Screen name="Details" component={OrderDetails} />
    </OrderStack.Navigator>
  );
};

export default MainTabDelivery;
