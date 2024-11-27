/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  RefreshControl,
  Alert,
} from 'react-native';
import AdCard from '../../components/AdCard';
import {bgcolor, fontfamily, height, width} from '../../Constants';
import Button from '../../components/Button';
import API, {ENDPOINTS} from '../../api/apiService';
import ImagePicker from 'react-native-image-crop-picker';
import {FlatList} from 'react-native-gesture-handler';
import Loading from '../../components/Loading';
import {
  deletePic,
  sendNotificationToAll,
  uploadPic,
} from '../common/getProfile';
import {EditFields, EditModal} from '../../components/EditModal';

const AdsScreen = () => {
  const [show, setShow] = useState(false);
  const [ads, setAds] = useState([]);
  const [showSample, setShowSample] = useState(false);
  const [loading, setLoading] = useState(false);
  // const {currentUser} = useContext(AuthContext);

  const CreateAdModal = () => {
    //const [name, setName] = useState('');
    // const [line1, setLine1] = useState('');
    // const [line2, setLine2] = useState('');
    // const [line3, setLine3] = useState('');
    const [imgURI, setimgURI] = useState(null);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const pickImage = () => {
      if (imgURI) {
        return setimgURI(null);
      }
      ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: true,
      })
        .then(image => {
          setimgURI(image.path);
        })
        .catch(console.log);
    };

    const create = async () => {
      if (title === '' || message === '' || imgURI === null) {
        return ToastAndroid.show(
          'Title , message and image fields are compulsory',
          ToastAndroid.SHORT,
        );
      }
      try {
        let image = await uploadPic(imgURI);
        let res = await API.post(
          ENDPOINTS.AD_ACTIONS,
          {
            name: 'shjdhwd',
            line1: 'jshdsd',
            line2: 'jsdjksd',
            line3: 'shbdhsd',
            image,
          },
          true,
        );
        //console.log(res);
        setAds(ads => [...ads, res]);

        await sendNotificationToAll({
          title: title,
          body: message,
        });

        //console.log(notified);
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <EditModal
        title={'Create Ad'}
        visible={show}
        setVisible={setShow}
        onpress={create}>
        <ScrollView>
          <EditFields title={'Notification title'} n={title} setN={setTitle} />
          <EditFields
            title={'Notification Message'}
            n={message}
            setN={setMessage}
          />
          {/* <EditFields
            title={'Name of the restaurant'}
            n={name}
            setN={setName}
          />
          <EditFields title={'Line 1'} n={line1} setN={setLine1} />
          <EditFields title={'Line 2'} n={line2} setN={setLine2} />
          <EditFields title={'Line 3'} n={line3} setN={setLine3} /> */}
          {imgURI ? <Text numberOfLines={1}>{imgURI}</Text> : null}
          <TouchableOpacity style={styles.addAddressButton} onPress={pickImage}>
            <Text style={{fontSize: 22, letterSpacing: 2}}>
              {imgURI ? 'Remove image' : '+ Add image'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </EditModal>
    );
  };

  const getAds = async () => {
    setLoading(true);
    try {
      let resp = await API.get(ENDPOINTS.AD_ACTIONS, true);
      setAds(resp);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const deleteFunc = (id, url) => {
    Alert.alert('Are you sure ?', 'You want to delete this ad', [
      {
        text: 'cancel',
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: async () => {
          try {
            let res = await API.deleteResource(
              ENDPOINTS.AD_ACTIONS + `/${id}`,
              true,
            );
            await deletePic(url);
            //console.log(delImage);
            setAds(ads => ads.filter(i => i._id !== id));
          } catch (e) {
            console.log(e);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    getAds();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <View
      style={[
        styles.container,
        {
          backgroundColor: show ? 'rgba(0,0,0,0.15)' : bgcolor,
        },
      ]}>
      {/* <Text
        onPress={() => setShowSample(n => !n)}
        style={{
          textAlign: 'center',
          fontSize: 16,
          textDecorationLine: 'underline',
          color: 'grey',
        }}>
        {showSample ? 'Close' : 'Show'} sample Ad
      </Text>
      {showSample ? (
        <AdCard
          name={'Restaurant Name'}
          line1={'Line 1'}
          line2={'Line 2 (Offer)'}
          line3={'Line 3'}
          image={
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80'
          }
        />
      ) : null} */}
      <FlatList
        data={ads}
        keyExtractor={(x, i) => i.toString()}
        refreshControl={<RefreshControl onRefresh={getAds} />}
        renderItem={({item}) => {
          return (
            <AdCard
              id={item._id}
              name={item.name}
              line1={item.line1}
              line2={item.line2}
              line3={item.line3}
              image={item.image}
              deleteFunc={() => deleteFunc(item._id, item.image)}
            />
          );
        }}
      />
      <CreateAdModal />
      <Button label={'CREATE NEW AD'} onpress={() => setShow(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: fontfamily,
    backgroundColor: bgcolor,
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

export default AdsScreen;
