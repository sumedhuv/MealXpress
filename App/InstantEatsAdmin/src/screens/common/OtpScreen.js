import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {sbgcolor, bgcolor, fontfamily, width, textColor} from '../../Constants';
import Button from '../../components/Button';
import {AuthContext} from '../../authentication/AuthProvider';

const OtpScreen = ({route, navigation}) => {
  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const [mode, setMode] = useState(true);
  const [timer, setTimer] = useState(59);
  const {registering, body, phone} = route.params;
  const {checkOTP, sendOTP, isLoading, setIsLoading} = useContext(AuthContext);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  var interval;

  const verifyOTP = () => {
    checkOTP(value, phone, registering ? body : false);
  };

  const startTimer = () => {
    if (timer > 0) setTimer(timer => timer - 1);
    if (timer <= 0) {
      clearInterval(interval);
    }
  };

  const resendCode = () => {
    setTimer(59);
    sendOTP(phone, null);
    interval = setInterval(() => {
      startTimer();
    }, 1000);
  };

  useEffect(() => {
    setIsLoading(false);
    interval = setInterval(() => {
      startTimer();
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <View style={{marginTop: 70}}>
          <Text style={styles.text}> OTP VERIFICATION</Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fontfamily,
              color: 'grey',
              marginTop: 50,
              textAlign: 'center',
            }}>
            Please enter the code sent to +91 {phone}
          </Text>
        </View>

        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't OtpScreenear
          value={value}
          onChangeText={value => {
            setValue(value);
            if (value.length == CELL_COUNT) {
              setMode(false);
            } else {
              setMode(true);
            }
          }}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <View
          style={{flexDirection: 'row', marginTop: 10, alignSelf: 'center'}}>
          <TouchableOpacity disabled={timer >= 0} onPress={resendCode}>
            <Text
              style={{
                color: timer >= 0 ? '#EBEBE4' : sbgcolor,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              resend code
            </Text>
          </TouchableOpacity>
          {timer > 0 ? (
            <Text style={{color: textColor, fontSize: 16, marginLeft: 10}}>
              in {timer}s
            </Text>
          ) : null}
        </View>
        <Button disabled={mode} label={'VERIFY'} onpress={verifyOTP} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  root: {padding: 10, marginHorizontal: 20, width: '70%'},
  codeFieldRoot: {
    marginTop: 20,
    maxWidth: width - 15,
    alignSelf: 'center',
    marginBottom: 10,
  },
  cell: {
    width: width / 10,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderBottomColor: sbgcolor,
    textAlign: 'center',
    marginHorizontal: 10,
    color: textColor,
  },
  focusCell: {
    borderColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: bgcolor,
    alignItems: 'center',
  },
  text: {
    top: 100,
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: fontfamily,
    marginBottom: 70,
    color: textColor,
    textAlign: 'center',
  },
  button: {
    width: '90%',
    margin: 20,
    backgroundColor: sbgcolor,
    height: 50,
    borderRadius: 10,
  },
});

export default OtpScreen;
