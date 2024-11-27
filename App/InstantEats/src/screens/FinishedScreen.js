import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import OrderCard from '../components/OrderCard';
import API, {ENDPOINTS} from '../api/apiService';
import Loading from '../components/Loading';
import {bgcolor, textColor} from '../Constants';
import {useNavigation} from '@react-navigation/native';

const FinishedScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLaoding] = useState(false);
  const navigation = useNavigation();

  const getFinishedOrders = async () => {
    setLaoding(true);
    try {
      let resp = await API.get(ENDPOINTS.GET_FINISHED_ORDERS, true);
      if (resp.success)
        setOrders(
          resp.data.sort(
            (a, b) => new Date(b.orderedAt) - new Date(a.orderedAt),
          ),
        );
    } catch (e) {
      console.log(e);
    }
    setLaoding(false);
  };

  useEffect(() => {
    getFinishedOrders();
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(x, i) => i.toString()}
        ListEmptyComponent={() => (
          <Text
            style={{
              fontSize: 18,
              color: textColor,
              textAlign: 'center',
              textAlignVertical: 'center',
              marginTop: 30,
            }}>
            You have no Finished orders {'\n'}as yet :( {'\n'} (Pull Down to
            Refresh)
          </Text>
        )}
        refreshControl={<RefreshControl onRefresh={getFinishedOrders} />}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('View', {order: item})}>
              <OrderCard
                name={item.orderedFrom.registeredRestaurant.name}
                location={item.orderedFrom.registeredRestaurant.address}
                address={item.address}
                price={item.totalPrice + parseInt(item.deliveryCharged)}
                timestamp={item.orderedAt}
                status={item.status}
                isActive={false}
                mode={item.paymentMode}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgcolor,
  },
});

export default FinishedScreen;
