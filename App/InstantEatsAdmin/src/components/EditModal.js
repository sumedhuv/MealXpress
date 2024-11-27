import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {bgcolor, height, textColor, sbgcolor} from '../Constants';
import Modal from 'react-native-modal';

export const EditModal = ({title, visible, setVisible, onpress, children}) => {
  const [canSubmit, setCanSubmit] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const listener1 = Keyboard.addListener('keyboardDidShow', () =>
      setCanSubmit(false),
    );
    const listener2 = Keyboard.addListener('keyboardDidHide', () =>
      setCanSubmit(true),
    );

    return listener1, listener2;
  }, []);

  return (
    <Modal visible={visible} useNativeDriver transparent>
      <View style={styles.modalView}>
        <View style={styles.modalHeader}>
          <Text
            style={{
              fontSize: 24,
              textAlign: 'center',
              color: textColor,
            }}>
            {title}
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            marginBottom: 15,
            marginLeft: 15,
            maxHeight: '65%',
          }}>
          {children}
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            style={[styles.button, {borderWidth: 1, borderColor: sbgcolor}]}
            onPress={() => {
              setVisible(false);
            }}>
            <Text style={[styles.buttonText, {color: sbgcolor}]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor:
                  !canSubmit || submitting ? '#EBEBE4' : sbgcolor,
                flexDirection: 'row',
              },
            ]}
            disabled={!canSubmit || submitting}
            onPress={async () => {
              setSubmitting(true);
              //create ad
              await onpress();
              setSubmitting(false);
              setVisible(false);
            }}>
            {submitting ? (
              <ActivityIndicator size={'small'} color={bgcolor} />
            ) : null}
            <Text style={[styles.buttonText, {color: bgcolor}]}>Done</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 20}} />
      </View>
    </Modal>
  );
};

export const EditFields = ({title, n, setN, isNumeric}) => {
  return (
    <View style={{marginBottom: 15}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '90%',
        }}>
        <Text style={styles.modalText}>{title}</Text>
      </View>
      <TextInput
        style={styles.textInput}
        value={n}
        onChangeText={n => setN(n)}
        keyboardType={isNumeric ? 'number-pad' : 'default'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 60,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
  },
  modalView: {
    height: 'auto',
    maxHeight: height / 1.4,
    backgroundColor: bgcolor,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: '90%',
  },
  modalHeader: {
    height: 60,
    borderBottomColor: sbgcolor,
    borderBottomWidth: 1,
    justifyContent: 'center',
    marginTop: 10,
  },
  modalText: {
    color: '#666666',
    fontSize: 16,
    textAlign: 'left',
  },
  textInput: {
    width: '90%',
    backgroundColor: '#DDDDDD',
    borderBottomColor: '#666666',
    borderBottomWidth: 1,
    fontSize: 16,
    borderRadius: 5,
    marginTop: 5,
    color: 'black',
  },
});

export default EditModal;
