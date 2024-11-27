import React from 'react';
import {View, ImageBackground, StyleSheet, Text} from 'react-native';
import {width} from '../Constants';

const CategoryCard = ({name, image}) => {
  return (
    <ImageBackground
      source={{uri: image}}
      style={styles.container}
      //imageStyle={{borderRadius: width / 20}}
    >
      <View
        style={{
          ...StyleSheet.absoluteFill,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      />
      <Text style={styles.text}>{name.replace(' ', '\n')}</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 2.2,
    height: width / 2.2,
    margin: 8,
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: width / 20,
  },
  text: {
    color: 'white',
    fontSize: 26,
    //width: '70%',
    height: '100%',
    textAlignVertical: 'center',
    zIndex: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CategoryCard;
