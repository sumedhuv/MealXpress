import React from 'react';
import {View, StyleSheet, Text, Image, StatusBar} from 'react-native';
import {bgcolor, sbgcolor} from '../../Constants';

const OfflineScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={sbgcolor} />
      <View style={{flex: 0.4, justifyContent: 'space-between'}}>
        <Image
          source={require('../../images/MEALEXPRESS.png')}
          style={styles.image}
        />
        <View>
          <Text style={styles.text}>Looks like you are offline {'\n'} :(</Text>
          <Text style={styles.stext}>
            Please check your interent connection and try again
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgcolor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  stext: {
    color: 'grey',
    fontSize: 20,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  image: {
    marginTop: 10,
    height: 120,
    width: 120,
    alignSelf: 'center',
  },
});
export default OfflineScreen;
