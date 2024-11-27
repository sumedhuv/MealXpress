import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {bgcolor, sbgcolor, yellow} from '../../Constants';
import AdsScreen from './AdsScreen';
import NewsScreen from './NewsScreen';
import CategoryScreen from './CategoryScreen';

const MediaTopTabs = ({screen1, screen2}) => {
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
      <TopTab.Screen name={screen1} component={AdsScreen} />
      <TopTab.Screen name={screen2} component={NewsScreen} />
      <TopTab.Screen name={'Category'} component={CategoryScreen} />
    </TopTab.Navigator>
  );
};

export default MediaTopTabs;
