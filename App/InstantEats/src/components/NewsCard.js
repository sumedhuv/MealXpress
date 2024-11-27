import React from 'react';
import {bgcolor, fontfamily, yellow} from '../Constants';
import {Text, StyleSheet, View, Image} from 'react-native';

const NewsCard = ({delete1, image, news, day}) => {
  return (
    <View
      style={{
        ...styles.container,
        borderLeftColor: yellow,
        borderLeftWidth: 8,
      }}>
      <Image source={{uri: image}} style={styles.image} />
      <View style={{flex: 1, marginLeft: 10, justifyContent: 'space-between'}}>
        <Text style={styles.article}>{news}</Text>
        <Text style={styles.day}>On {new Date(day).toLocaleDateString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: fontfamily,
    backgroundColor: bgcolor,
    height: 'auto',
    flexDirection: 'row',
    borderBottomColor: '#9F9F9F',
    borderBottomWidth: 2,
    padding: 15,
  },
  article: {
    fontSize: 16,
    width: '85%',
  },
  image: {
    height: 65,
    width: 65,
    borderRadius: 35,
  },
  day: {
    color: '#666666',
    fontSize: 11,
    marginTop: 15,
    //textAlign: 'right',
  },
});

export default NewsCard;
