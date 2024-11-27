/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, RefreshControl} from 'react-native';
import {bgcolor, textColor} from '../../Constants';
import DuesCard from '../../components/DuesCard';
import Loading from '../../components/Loading';
import API, {ENDPOINTS} from '../../api/apiService';
import DuesGroup from '../../components/DuesGroup';
import {groupBy} from '../common/getProfile';

export default function DuesPending() {
  const [dues, setDues] = useState([]);
  const [loading, setLoading] = useState(false);

  const get = async () => {
    setLoading(true);
    try {
      let res = await API.get(ENDPOINTS.GET_DUE_PAYMENT_ORDERS, true);
      let raw_data = res.data.filter(i => i.status === 'finished');
      setDues(groupBy(raw_data, 'orderedFrom', 'registeredRestaurant', 'name'));
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{height: 10}} />
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={Object.keys(dues)}
          ListEmptyComponent={
            <Text
              style={{
                fontSize: 18,
                color: textColor,
                textAlign: 'center',
                textAlignVertical: 'center',
                marginTop: 30,
              }}>
              You have no Payments Due :) {'\n'} (Pull Down to Refresh)
            </Text>
          }
          refreshControl={<RefreshControl onRefresh={get} />}
          keyExtractor={(x, i) => i.toString()}
          renderItem={({item}) => {
            return <DuesGroup array={dues[item]} name={item} />;
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgcolor,
  },
  title: {
    color: bgcolor,
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    top: 25,
    letterSpacing: 4,
  },
});
