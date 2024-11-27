import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {bgcolor, fontfamily, textColor} from '../Constants';

const GreetingHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome To</Text>
      <View
        style={{
          flexDirection: 'row',
          width: '50%',
          justifyContent: 'space-evenly',
        }}>
        <View>
          <Image
            source={require('../images/name.png')}
            style={{height: 100, width: 120}}
          />
          {/* <Text style={[styles.header, {color: '#ED1C24'}]}>Meal</Text>
          <Text style={styles.sub}>xpress</Text> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 100,
    backgroundColor: bgcolor,
    alignItems: 'center',
    marginBottom: 60,
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: fontfamily,
    textTransform: 'uppercase',
    color: textColor,
    letterSpacing: 3,
  },
  sub: {
    fontSize: 27,
    fontFamily: fontfamily,
    marginBottom: 20,
    textTransform: 'uppercase',
    color: textColor,
    letterSpacing: 2,
    fontWeight: 'bold',
  },
});

export default GreetingHeader;
