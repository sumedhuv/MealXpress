import React, {useEffect, useContext, useState} from 'react';
import {StyleSheet, ScrollView, Text, View, RefreshControl} from 'react-native';
import {AuthContext} from '../../authentication/AuthProvider';
import Loading from '../../components/Loading';
import {bgcolor, height} from '../../Constants';
import {USER_TYPES} from '../../controllers/types';
import {getProfile} from './getProfile';

const Verification = () => {
  const [refreshing, setRefreshing] = useState(false);
  const {setCurrentUser, userType} = useContext(AuthContext);
  const get = async () => {
    setRefreshing(true);
    await getProfile(userType === USER_TYPES.VENDOR, setCurrentUser);
    setRefreshing(false);
  };

  useEffect(() => {
    get();
  }, []);
  return refreshing ? (
    <Loading />
  ) : (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl onRefresh={get} />}>
      <View style={{marginTop: height / 2.5}}>
        <Text style={styles.text}>
          Get yourself verified with the Admin first
        </Text>
        <Text style={styles.stext}>
          (Refresh page to check if you have been verified)
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgcolor,
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    fontStyle: 'italic',
  },
  stext: {
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
  },
});
export default Verification;
