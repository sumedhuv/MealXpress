import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {bgcolor, fontfamily, textColor, width, yellow} from '../Constants';
import Entypo from 'react-native-vector-icons/Entypo';

const HomeCard = ({name, stars}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 15,
        }}>
        <View style={{width: '75%'}}>
          <Text
            style={{
              fontSize: 18,
              color: textColor,
            }}>
            {name}
          </Text>
        </View>

        <View>
          {stars ? (
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
                width: 50,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: textColor,
                  width: '60%',
                }}>
                {(Math.round(stars * 10) / 10).toString().length === 1
                  ? (Math.round(stars * 10) / 10).toString() + '.0'
                  : Math.round(stars * 10) / 10}
              </Text>
              <Entypo name={'star'} style={styles.star} />

              {/* <Text style={{color: sbgcolor, fontSize: 13, marginTop: 5}}>
            ${avgCost} for 2
          </Text> */}
            </View>
          ) : (
            <Text
              style={{
                fontWeight: 'bold',
                color: textColor,
                width: '100%',
              }}>
              No-Ratings
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 75,
    width: width / 1.1,
    elevation: 10,
    backgroundColor: bgcolor,
    alignSelf: 'center',
    marginVertical: 10,
    fontFamily: fontfamily,
    borderRadius: 10,
    shadowColor: textColor,
    justifyContent: 'center',
  },
  star: {
    color: yellow,
    fontSize: 20,
    marginLeft: 6.5,
  },
});

export default HomeCard;
