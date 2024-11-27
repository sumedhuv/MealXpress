/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import {bgcolor} from '../../Constants';
import DuesCard from '../../components/DuesCard';
import Loading from '../../components/Loading';
import API, {ENDPOINTS} from '../../api/apiService';

export default function DuesPaid() {
  const [dues, setDues] = useState([]);
  const [loading, setLoading] = useState(false);

  const get = async () => {
    setLoading(true);
    try {
      let res = await API.get(ENDPOINTS.GET_FINISHED_ORDERS, true);
      setDues(
        res.data
          .filter(i => i.isVendorPaid)
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)),
      );
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
          data={dues}
          refreshControl={<RefreshControl onRefresh={get} />}
          keyExtractor={(x, i) => i.toString()}
          renderItem={({item}) => {
            return <DuesCard item={item} />;
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
