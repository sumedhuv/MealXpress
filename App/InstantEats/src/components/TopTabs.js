import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {bgcolor, sbgcolor, width, yellow} from '../Constants';
import MenuScreen from '../screens/MenuScreen';
import ReviewScreen from '../screens/ReviewScreen';
import FinishedScreen from '../screens/FinishedScreen';
import ActiveScreen from '../screens/ActiveScreen';
import {LogBox} from 'react-native';

const TopTabs = ({screen1, screen2, s1Props, s2Props}) => {
  const TopTab = createMaterialTopTabNavigator();
  LogBox.ignoreLogs(['If you want to use Reanimated 2 then go through']);
  return (
    <TopTab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: sbgcolor,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          overflow: 'hidden',
        },
        labelStyle: {
          textTransform: 'uppercase',
          fontSize: 15,
          color: bgcolor,
          fontWeight: '200',
          width: '100%',
        },
        indicatorStyle: {
          backgroundColor: yellow,
          height: 4,
        },
      }}>
      <TopTab.Screen
        name={screen1}
        children={() =>
          screen1 === 'Menu' ? <MenuScreen props={s1Props} /> : <ActiveScreen />
        }
      />
      <TopTab.Screen
        name={screen2}
        children={() =>
          screen2 === 'Reviews' ? (
            <ReviewScreen props={s1Props} />
          ) : (
            <FinishedScreen />
          )
        }
      />
    </TopTab.Navigator>
  );
};

export default TopTabs;
