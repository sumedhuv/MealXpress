/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import {bgcolor, width} from '../../Constants';
import VendorCard from '../../components/VendorCard';
import API, {ENDPOINTS} from '../../api/apiService';
import Loading from '../../components/Loading';

export default function VendorsScreen() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);

  const get = async () => {
    setLoading(true);
    try {
      let res = await API.get(ENDPOINTS.GET_ALL_VENDORS, false);
      setVendors(res);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    get();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <View style={{marginVertical: 10}}>
        <FlatList
          data={vendors}
          keyExtractor={(x, i) => i.toString()}
          refreshControl={<RefreshControl onRefresh={get} />}
          renderItem={({item}) => {
            return <VendorCard item={item} isVendor={true} />;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgcolor,
    padding: 10,
    width: width,
  },
});
