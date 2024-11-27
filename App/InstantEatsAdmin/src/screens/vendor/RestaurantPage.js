import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import {bgcolor, width, fontfamily, yellow, textColor} from '../../Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';
import Button from '../../components/Button';
import ProfileCard from '../../components/ProfileCard';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import API, {ENDPOINTS} from '../../api/apiService';
import {AuthContext} from '../../authentication/AuthProvider';
import {USER_TYPES} from '../../controllers/types';
import {
  getProfile,
  updateProfile,
  uploadPic,
  deletePic,
} from '../common/getProfile';
import Loading from '../../components/Loading';
import EditModal, {EditFields} from '../../components/EditModal';
import CategorySection from '../../components/CategorySection';
import ImagePicker from 'react-native-image-crop-picker';
import {ActivityIndicator} from 'react-native-paper';

const RestaurantPage = () => {
  const {currentUser, setCurrentUser, userType} = useContext(AuthContext);
  const [editRestaurant, setEditRestaurant] = useState(false);
  const [loading, setLoading] = useState(false);
  const [menuItems, setMenuItems] = useState({});
  const [categories, setCategories] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [itemsL, setItemsL] = useState(false);
  const [uploading, setUploading] = useState(false);

  const getMenuItems = async () => {
    try {
      let res = await API.get(
        ENDPOINTS.FILTERED_ITEMS + `?vendor=${currentUser._id}`,
      );
      setMenuItems(res);
    } catch (e) {
      console.log('Menu items error');
    }
  };

  useEffect(async () => {
    setLoading(true);
    await getProfile(userType === USER_TYPES.VENDOR, setCurrentUser);
    setLoading(false);
  }, []);

  const EditRestaurantDetails = () => {
    const [name, setName] = useState(currentUser.registeredRestaurant.name);
    const [address, setAddress] = useState(
      currentUser.registeredRestaurant.address,
    );
    const [number, setNumber] = useState(
      currentUser.registeredRestaurant.number,
    );

    return (
      <EditModal
        title={'Restaurant Details'}
        visible={editRestaurant}
        setVisible={setEditRestaurant}
        onpress={async () => {
          await updateProfile(userType === USER_TYPES.VENDOR, setCurrentUser, {
            registeredRestaurant: {
              name,
              number,
              address,
            },
          });
        }}>
        <EditFields title={'Name'} n={name} setN={setName} />
        <EditFields title={'Phone number'} n={number} setN={setNumber} />
        <EditFields title={'Address'} n={address} setN={setAddress} />
      </EditModal>
    );
  };

  const ImageCard = ({uri}) => {
    const [deleting, setDeleting] = useState(false);
    const deleteImg = async () => {
      setDeleting(true);
      try {
        await deletePic(uri);
        await updateProfile(userType === USER_TYPES.VENDOR, setCurrentUser, {
          menuImgs: currentUser.menuImgs.filter(i => i != uri),
        });
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <View
        style={{
          width: width / 4.7,
          height: width / 4.7,
          marginHorizontal: 5,
        }}>
        {deleting ? (
          <View
            style={{
              ...StyleSheet.absoluteFill,
              zIndex: 2,
              backgroundColor: 'rgba(0,0,0,0.15)',
              justifyContent: 'center',
            }}>
            <ActivityIndicator color={'grey'} size={'small'} />
          </View>
        ) : null}
        <Image
          source={{uri}}
          style={{
            borderRadius: 10,
            width: '97%',
            height: '97%',
          }}
        />
        <TouchableOpacity style={styles.crossContainer} onPress={deleteImg}>
          <Text style={{color: 'white'}}>X</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const addMenuimages = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(async img => {
        setUploading(true);
        try {
          let image = await uploadPic(img.path);
          if (image)
            await updateProfile(
              userType === USER_TYPES.VENDOR,
              setCurrentUser,
              {
                menuImgs: [...currentUser.menuImgs, image],
              },
            );
        } catch (e) {
          console.log(e);
        }
        setUploading(false);
      })
      .catch(console.log);
  };

  const getAllCategories = async () => {
    try {
      let res = await API.get(ENDPOINTS.CATEGORY_ACTIONS, false);
      setCategories(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(async () => {
    setItemsL(true);
    if (currentUser) {
      getMenuItems().then(() => getAllCategories());
      setItemsL(false);
    }
  }, [currentUser]);

  const onRefresh = async () => {
    setRefreshing(true);
    await getProfile(userType === USER_TYPES.VENDOR, setCurrentUser);
    await getMenuItems();
    await getAllCategories();
    setRefreshing(false);
  };

  return loading || !currentUser ? (
    <Loading />
  ) : (
    <View
      style={[
        styles.container,
        {
          backgroundColor: editRestaurant ? 'rgba(0,0,0,0.15)' : bgcolor,
        },
      ]}>
      <Header isRounded={true}>
        <Text style={styles.title}>
          {currentUser.registeredRestaurant.name}
        </Text>
        <View style={{height: 50}} />
      </Header>
      <ScrollView
        style={{flex: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <ProfileCard
          title={'Restaurant Details'}
          editable={true}
          onPress={() => setEditRestaurant(true)}>
          <View style={styles.section}>
            <FontAwesome name={'phone'} style={styles.icon} />
            <Text style={styles.subtext}>
              {currentUser.registeredRestaurant.number}
            </Text>
          </View>
          <View style={styles.section}>
            <MaterialIcons name={'location-on'} style={styles.icon} />
            <Text style={styles.subtext}>
              {currentUser.registeredRestaurant.address}
            </Text>
          </View>
        </ProfileCard>
        <ProfileCard title={'Menu Images'}>
          <FlatList
            data={currentUser.menuImgs}
            horizontal
            style={{margin: 5}}
            ListFooterComponent={() => (
              <View style={{flexDirection: 'row'}}>
                {uploading ? (
                  <View style={[styles.addImage, {marginRight: 10}]}>
                    <ActivityIndicator color={'white'} size={'small'} />
                  </View>
                ) : null}
                <TouchableOpacity
                  style={styles.addImage}
                  onPress={addMenuimages}>
                  <Text
                    style={{
                      fontSize: 60,
                      color: '#666666',
                      marginBottom: 10,
                    }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(x, i) => i.toString()}
            renderItem={({item}) => <ImageCard uri={item} />}
          />
        </ProfileCard>
        <ProfileCard title={'Categories'}>
          {/* {Object.keys(menuItems).map((item, index) => {
            return (
              <CategorySection
                key={index}
                name={item}
                items={menuItems[item] || []}
                vID={currentUser._id}
              />
            );
          })} */}
          {itemsL ? (
            <Loading />
          ) : (
            categories.map((item, index) => (
              <CategorySection
                key={index}
                name={item.name}
                items={menuItems[item.name] || []}
                vID={currentUser._id}
                id={item._id}
              />
            ))
          )}
        </ProfileCard>
      </ScrollView>
      <EditRestaurantDetails />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: fontfamily,
  },
  title: {
    color: bgcolor,
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    top: 20,
    letterSpacing: 3,
  },
  crossContainer: {
    backgroundColor: 'black',
    width: '35%',
    height: '35%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  icon: {
    fontSize: 26,
    color: yellow,
    marginLeft: 20,
  },
  subtext: {
    marginLeft: 20,
    fontSize: 18,
    width: width / 1.8,
    color: textColor,
  },
  section: {
    flexDirection: 'row',
    marginBottom: 20,
    marginLeft: 4,
  },

  textInput: {
    width: '90%',
    backgroundColor: '#DDDDDD',
    borderBottomColor: '#666666',
    borderBottomWidth: 1,
    fontSize: 16,
    borderRadius: 5,
    marginTop: 5,
  },
  category: {
    textTransform: 'uppercase',
    color: 'black',
    fontSize: 26,
    marginTop: 10,
    marginLeft: 5,
  },
  addImage: {
    width: width / 4.9,
    height: width / 4.9,
    backgroundColor: '#DDDDDD',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  addAddressButton: {
    width: '90%',
    backgroundColor: '#DDDDDD',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default RestaurantPage;
