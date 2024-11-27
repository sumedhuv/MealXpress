import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {bgcolor, sbgcolor, yellow} from '../Constants';
import FinishedScreen from '../screens/delivery/FinishedScreen';
import ActiveScreen from '../screens/delivery/ActiveScreen';

const TopTabs = ({screen1, screen2}) => {
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
          letterSpacing: 2,
          width: '100%',
        },
        indicatorStyle: {
          backgroundColor: yellow,
          height: 4,
        },
      }}>
      <TopTab.Screen name={screen1} component={ActiveScreen} />
      <TopTab.Screen name={screen2} component={FinishedScreen} />
    </TopTab.Navigator>
  );
};

export default TopTabs;
