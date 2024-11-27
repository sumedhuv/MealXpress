import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {height, width, yellow, textColor} from '../Constants';
import Entypo from 'react-native-vector-icons/Entypo';

const ReviewCard = ({user, rating, review}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View>
          <Text style={styles.header}>{user}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {review}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-evenly',
            width: '20%',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              width: '50%',
              color: textColor,
            }}>
            {(Math.round(rating * 10) / 10).toString().length === 1
              ? (Math.round(rating * 10) / 10).toString() + '.0'
              : Math.round(rating * 10) / 10}
          </Text>
          <Entypo name={'star'} style={styles.star} />
        </View>
      </View>
      <View style={{height: 10}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 2,
    width: width / 1.1,
    alignSelf: 'center',
    maxHeight: 100,
    overflow: 'hidden',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    color: textColor,
    fontSize: 20,
    marginTop: 10,
  },
  description: {
    width: width / 1.6,
    marginVertical: 10,
    color: '#666666',
  },
  star: {
    color: yellow,
    fontSize: 20,
  },
});

export default ReviewCard;
