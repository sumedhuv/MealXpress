import React, {useContext} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import {AuthContext} from '../authentication/AuthProvider';
import {bgcolor, fontfamily, sbgcolor, width} from '../Constants';

const Button = ({label, onpress, disabled = false}) => {
  const {isLoading} = useContext(AuthContext);
  return (
    <TouchableOpacity
      disabled={disabled || isLoading}
      style={[
        styles.button,
        {backgroundColor: disabled || isLoading ? '#EBEBE4' : sbgcolor},
      ]}
      onPress={onpress}>
      {isLoading ? <ActivityIndicator color={bgcolor} size={'small'} /> : null}

      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: fontfamily,
    textAlign: 'center',
    margin: 8,
    fontSize: 24,
    color: bgcolor,
    fontWeight: '100',
    letterSpacing: 3,
  },
  button: {
    width: width / 1.1,
    margin: 20,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Button;
