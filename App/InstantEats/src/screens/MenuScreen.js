import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import MenuCard from '../components/MenuCard';
import RestaurantDetailsCard from '../components/RestaurantDetailsCard';
import {bgcolor, fontfamily, width} from '../Constants';
import API, {ENDPOINTS} from '../api/apiService';
import Loading from '../components/Loading';

const MenuScreen = ({props}) => {
  const [menuItems, setMenuItems] = useState({});
  const [loading, setLoading] = useState(false);

  const getMenuItems = async () => {
    setLoading(true);
    try {
      let res = await API.get(
        ENDPOINTS.FILTERED_ITEMS + `?vendor=${props._id}`,
      );
      setMenuItems(res);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  useEffect(() => {
    getMenuItems();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <RestaurantDetailsCard
          number={props.registeredRestaurant.number}
          address={props.registeredRestaurant.address}
        />
        {props.menuImgs.length > 0 && (
          <View>
            <FlatList
              horizontal
              style={{height: width / 2.7}}
              data={props.menuImgs}
              keyExtractor={(x, i) => i.toString()}
              renderItem={({item}) => {
                return <Image source={{uri: item}} style={styles.image} />;
              }}
            />
          </View>
        )}
        {loading ? (
          <Loading />
        ) : (
          Object.keys(menuItems).map((item, index) => {
            return (
              <View key={index}>
                <Text style={styles.category}>{item}</Text>
                {menuItems[item].map((item, index) => {
                  return <MenuCard item={item} key={index} vendor={props} />;
                })}
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: fontfamily,
    backgroundColor: bgcolor,
  },
  image: {
    width: width / 4.5,
    height: width / 4.5,
    borderRadius: 10,
    marginLeft: 10,
    top: 50,
  },
  category: {
    textTransform: 'uppercase',
    color: '#666666',
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10,
  },
});

export default MenuScreen;
