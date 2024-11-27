import React, {useState} from 'react';
import {bgcolor, fontfamily, width, yellow} from '../Constants';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const NewsCard = ({delete1, image, news, day}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: image}} style={styles.image} />
      <Text style={styles.article}>{news}</Text>
      <Text style={styles.day}>{day}</Text>
      <TouchableOpacity onPress={delete1}>
        <MaterialCommunityIcons name="delete" size={25} color={yellow} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: fontfamily,
    backgroundColor: bgcolor,
    height: 'auto',
    width: width,
    flexDirection: 'row',
    borderBottomColor: '#9F9F9F',
    borderBottomWidth: 2,
    padding: 15,
  },
  article: {
    fontSize: 18,
    width: '65%',
    marginLeft: 10,
  },
  image: {
    height: 65,
    width: 65,
    borderRadius: 35,
  },
  day: {
    color: '#666666',
    fontSize: 18,
    textAlignVertical: 'center',
    marginLeft: 20,
  },
});

export default NewsCard;
