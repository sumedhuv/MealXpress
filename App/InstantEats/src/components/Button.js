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
    fontSize: 22,
    color: bgcolor,
    fontWeight: '100',
    height: '100%',
    textAlignVertical: 'center',
  },
  button: {
    width: width / 1.2,
    margin: 20,
    height: 45,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default Button;
