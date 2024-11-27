import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Header from '../components/Header';
import TopTabs from '../components/TopTabs';
import {bgcolor, fontfamily, width} from '../Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RestaurantScreen = ({route, navigation}) => {
  const {item} = route.params;

  return (
    <View style={styles.container}>
      <Header>
        <View
          style={{
            flexDirection: 'row',
            top: 10,
            left: 10,
          }}>
          <Ionicons
            name="arrow-back"
            style={styles.back}
            onPress={navigation.goBack}
          />
          <View style={{justifyContent: 'center', width: width / 1.3}}>
            <Text style={styles.title}>{item.registeredRestaurant.name}</Text>
          </View>
        </View>

        <View style={{height: 15}} />
      </Header>
      <TopTabs
        screen1={'Menu'}
        screen2={'Reviews'}
        s1Props={item}
        //s2Props={item.reviews}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: fontfamily,
    backgroundColor: bgcolor,
  },
  title: {
    color: bgcolor,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  back: {
    color: bgcolor,
    fontSize: 28,
    marginLeft: 10,
  },
});

export default RestaurantScreen;
