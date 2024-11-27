import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {bgcolor, sbgcolor, yellow} from '../../Constants';
import VendorsScreen from './VendorsScreen';
import DeliveryScreen from './DeliveryScreen';

const PeopleTopTabs = ({screen1, screen2}) => {
  const TopTab = createMaterialTopTabNavigator();

  return (
    <TopTab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: sbgcolor,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          overflow: 'hidden',
          elevation: 0,
        },
        labelStyle: {
          textTransform: 'uppercase',
          fontSize: 18,
          color: bgcolor,
          fontWeight: '200',
          width: '100%',
        },
        indicatorStyle: {
          backgroundColor: yellow,
          height: 4,
        },
      }}>
      <TopTab.Screen name={screen1} component={VendorsScreen} />
      <TopTab.Screen name={screen2} component={DeliveryScreen} />
    </TopTab.Navigator>
  );
};

export default PeopleTopTabs;
