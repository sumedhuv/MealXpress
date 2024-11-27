import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import OrderCard from '../../components/OrderCard';
import Loading from '../../components/Loading';
import {bgcolor, textColor} from '../../Constants';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../authentication/AuthProvider';
import {getFinishedOrder} from '../common/getProfile';
import {USER_TYPES} from '../../controllers/types';

const FinishedScreen = () => {
  const {userType} = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLaoding] = useState(false);
  const navigation = useNavigation();

  const get = async () => {
    setLaoding(true);
    await getFinishedOrder(userType === USER_TYPES.VENDOR, setOrders);
    setLaoding(false);
  };
  useEffect(() => {
    get();
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
        refreshControl={<RefreshControl onRefresh={get} />}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Details', {order: item})}>
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
