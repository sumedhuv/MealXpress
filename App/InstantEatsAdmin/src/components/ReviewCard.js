import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {width} from '../Constants';
import Entypo from 'react-native-vector-icons/Entypo';

const ReviewCard = ({user, rating, review}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>{user}</Text>
        <Text style={styles.description} numberOfLines={4}>
          {review}
        </Text>
      </View>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>{rating}</Text>
        <Entypo name={'star'} style={styles.star} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 2,
    height: 150,
    width: width / 1.1,
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  header: {
    fontSize: 24,
    marginTop: 10,
  },
  description: {
    fontSize: 17,
    width: width / 1.6,
    marginTop: 10,
    color: '#666666',
  },
  star: {
    color: '#FEC671',
    fontSize: 22,
    marginLeft: 6.5,
  },
});

export default ReviewCard;
