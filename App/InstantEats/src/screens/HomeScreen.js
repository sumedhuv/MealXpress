import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
  BackHandler,
  LogBox,
  RefreshControl,
  Alert,
} from 'react-native';
import Header from '../components/Header';
import {bgcolor, textColor, width, fontfamily} from '../Constants';
import {Searchbar} from 'react-native-paper';
import HomeCard from '../components/HomeCard';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import CategoryCard from '../components/CategoryCard';
import {AuthContext} from '../authentication/AuthProvider';
import API, {ENDPOINTS} from '../api/apiService';
import Loading from '../components/Loading';
import ItemCard from '../components/ItemCard';
import AdCorousel from '../components/AdCorousel';

const HomeScreen = ({navigation}) => {
  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const {setCurrentUser, setCart, setCartVendor} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [selectCategory, setSelectCategory] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  //const forceUpdate = useForceUpdate();
  const [cresults, setCResults] = useState([]);
  const [ads, setAds] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchMode, setSearchMode] = useState(false);
  //const [text , setText] = useState("");

  const getAllVendors = async () => {
    setLoading(true);
    try {
      const res = await API.get(ENDPOINTS.GET_ALL_VENDORS, false);
      setVendors(res.filter(i => i.isVerified));
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const search = text => {
    let filteredName = vendors.filter(item => {
      return item.registeredRestaurant.name
        .toLowerCase()
        .match(text.toLowerCase());
    });
    if (!text || text === '') {
      setSearchMode(false);
      getAllVendors();
    } else if (Array.isArray(filteredName)) {
      setVendors(filteredName);
    }
  };

  const getCart = async () => {
    try {
      let res = await API.get(ENDPOINTS.GET_UPDATE_CART, true);
      //console.log('Cart:- ' + JSON.stringify(res));
      //setCurrentUser(res.user);
      setCart({contents: res.contents, totalPrice: res.totalPrice});
      if (res.contents.length != 0) {
        let resp = await API.get(
          ENDPOINTS.GET_VENDOR + `/${res.contents[0].item.createdBy}`,
          false,
        );
        setCartVendor(resp);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const getAds = async () => {
    try {
      let res = await API.get(ENDPOINTS.GET_ADS, false);
      setAds(res);
    } catch (e) {
      console.log(e);
    }
  };

  const OnRefresh = async () => {
    setRefreshing(true);
    await getAllVendors();
    await getCategories();
    await getAds();
    setRefreshing(false);
  };

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    //getProfile(setCurrentUser);
    getAllVendors();
    getAds();
    getCategories();
    getCart();
    const backAction = () => {
      // if (!searchMode && !showCategories) {
      //   return ExitAppAlert();
      // }
      setSearchMode(false);
      setShowCategories(false);
    };
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const getCategories = async () => {
    setLoading(true);
    try {
      const res = await API.get(ENDPOINTS.GET_CATEGORIES, false);
      setCategories(res);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const CategorySubScreen = () => {
    const categorySelect = async id => {
      setCResults([]);
      setLoading(true);
      try {
        const res = await API.get(
          ENDPOINTS.FILTERED_ITEMS + `?category=${id}`,
          false,
        );
        //console.log(res);
        setCResults(res);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };

    return (
      <View style={{alignItems: 'center'}}>
        {selectCategory === '' ? (
          <FlatList
            data={categories}
            keyExtractor={(x, i) => i.toString()}
            numColumns={2}
            refreshControl={<RefreshControl onRefresh={getCategories} />}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    categorySelect(item._id, item.name);
                    setSelectCategory(item.name);
                  }}>
                  <CategoryCard name={item.name} image={item.image} />
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <FlatList
            data={cresults}
            keyExtractor={(x, i) => i.toString()}
            renderItem={({item}) => {
              return (
                <ItemCard
                  vendor={item.createdBy}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  isVeg={item.foodType === 'Non-Veg' ? false : true}
                />
              );
            }}
          />
        )}
      </View>
    );
  };

  // useEffect(() => {
  //   getAllVendors();
  // }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <Header isRounded={true}>
        <View style={{flexDirection: 'row'}}>
          <Searchbar
            style={styles.Searchbar}
            placeholder={'Search'}
            value={searchText}
            onChangeText={n => {
              setSearchMode(true);
              search(n);
              setSearchText(n);
            }}
            iconColor={textColor}
            placeholderTextColor={'grey'}
            onSubmitEditing={() => search(searchText)}
          />
          <FontAwesome5
            name="sliders-h"
            style={styles.menuIcon}
            onPress={() => setShowCategories(showCategories => !showCategories)}
          />
        </View>
        <View style={{height: 52}} />
      </Header>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={OnRefresh} />
        }>
        {showCategories ? null : ads.length === 0 || searchMode ? null : (
          <AdCorousel list={ads} />
        )}
        {showCategories ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 15,
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 24,
                fontFamily: fontfamily,
                marginBottom: 10,
                color: textColor,
              }}>
              {selectCategory || 'Browse Categories'}
            </Text>
            <Entypo
              size={30}
              color={'grey'}
              name={'cross'}
              onPress={() => {
                if (selectCategory === '') {
                  setShowCategories(false);
                } else {
                  setSelectCategory('');
                }
              }}
            />
          </View>
        ) : (
          <Text
            style={[
              styles.text,
              {marginLeft: 15, marginTop: ads.length === 0 ? 10 : -30},
            ]}>
            Top Restaurants
          </Text>
        )}

        {loading ? (
          <Loading />
        ) : (
          <View>
            {showCategories ? (
              <CategorySubScreen />
            ) : (
              <View>
                {vendors.map((item, index) => {
                  return (
                    <TouchableWithoutFeedback
                      key={index}
                      onPress={() => navigation.navigate('Restaurant', {item})}>
                      <View>
                        <HomeCard
                          name={item.registeredRestaurant.name}
                          stars={item.avgRating}
                          category={'Fast Food, Beverages'}
                          avgCost={100}
                        />
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgcolor,
  },
  Searchbar: {
    backgroundColor: bgcolor,
    color: textColor,
    height: 45,
    width: width / 1.35,
    left: 20,
    top: 26,
    borderRadius: 10,
  },
  menuIcon: {
    fontSize: 25,
    left: 42,
    top: 35,
  },
  text: {
    fontSize: 24,
    fontFamily: fontfamily,
    marginBottom: 10,
    color: textColor,
    marginTop: -50,
  },
});

export default HomeScreen;
