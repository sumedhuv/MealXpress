import React from 'react';
import {View, StyleSheet} from 'react-native';
import {sbgcolor, width} from '../Constants';

const Header = ({children, isRounded}) => {
  return (
    <View
      style={[
        styles.container,
        isRounded
          ? {borderBottomLeftRadius: 25, borderBottomRightRadius: 25}
          : null,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: sbgcolor,
    width: width,
    height: 'auto',
  },
});

export default Header;
