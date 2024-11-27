import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {bgcolor, width} from '../Constants';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const ProfileCard = ({title, children, editable, onPress}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.category}>{title}</Text>
        {editable ? (
          <EvilIcons name={'pencil'} style={styles.icon} onPress={onPress} />
        ) : null}
      </View>

      <View style={styles.holder}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    width: width / 1.1,
    alignSelf: 'center',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 2,
    top: 10,
    marginBottom: 10,
  },
  category: {
    textTransform: 'uppercase',
    color: '#666666',
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10,
  },
  holder: {
    marginTop: 15,
  },
  icon: {
    color: '#666666',
    fontSize: 35,
    marginTop: 10,
    marginRight: 15,
  },
});

export default ProfileCard;
