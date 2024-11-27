import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import NewsCard from '../../components/NewsCard';
import {bgcolor, fontfamily} from '../../Constants';
import API, {ENDPOINTS} from '../../api/apiService';
import {
  deletePic,
  sendNotificationToAll,
  uploadPic,
} from '../common/getProfile';
import Button from '../../components/Button';
import ImagePicker from 'react-native-image-crop-picker';
import Loading from '../../components/Loading';
import {EditFields, EditModal} from '../../components/EditModal';

const NewsScreen = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const getAlerts = async () => {
    setLoading(true);
    try {
      let resp = await API.get(ENDPOINTS.ALERT_ACTIONS, true);
      setAlerts(resp);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const CreateAlertModal = () => {
    const [name, setName] = useState('');
    const [imgURI, setimgURI] = useState(null);

    const pickImage = () => {
      if (imgURI) {
        return setimgURI(null);
      }
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      })
        .then(image => {
          setimgURI(image.path);
        })
        .catch(console.log);
    };

    const create = async () => {
      if (name === '' || imgURI === null) {
        return ToastAndroid.show(
          'All fields are compulsory',
          ToastAndroid.SHORT,
        );
      }
      try {
        let image = await uploadPic(imgURI);
        let res = await API.post(
          ENDPOINTS.ALERT_ACTIONS,
          {
            name,
            image,
          },
          true,
        );
        //console.log(res);
        setAlerts(a => [...a, res]);
        await sendNotificationToAll({
          title: 'Alerts',
          body: name,
        });
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <EditModal
        title={'Create Alert'}
        visible={show}
        setVisible={setShow}
        onpress={create}>
        <EditFields title={'Alert Text'} n={name} setN={setName} />
        {imgURI ? <Text numberOfLines={1}>{imgURI}</Text> : null}
        <TouchableOpacity style={styles.addAddressButton} onPress={pickImage}>
          <Text style={{fontSize: 22, letterSpacing: 2}}>
            {imgURI ? 'Remove image' : '+ Add image'}
          </Text>
        </TouchableOpacity>
      </EditModal>
    );
  };

  useEffect(() => {
    getAlerts();
  }, []);

  const deleteFunc = (id, url) => {
    Alert.alert('Are you sure ?', 'You want to delete this alert', [
      {
        text: 'cancel',
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: async () => {
          try {
            let res = await API.deleteResource(
              ENDPOINTS.ALERT_ACTIONS + `/${id}`,
              true,
            );
            await deletePic(url);
            //console.log(delImage);
            setAlerts(a => a.filter(i => i._id != id));
          } catch (e) {
            console.log(e);
          }
        },
      },
    ]);
  };

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
      <FlatList
        data={alerts}
        keyExtractor={(x, i) => i.toString()}
        ListEmptyComponent={() => (
          <Text style={{fontSize: 16, color: 'grey', textAlign: 'center'}}>
            No Alerts created so far :(
          </Text>
        )}
        refreshControl={<RefreshControl onRefresh={getAlerts} />}
        renderItem={({item}) => {
          return (
            <NewsCard
              news={item.name}
              image={item.image}
              delete1={() => deleteFunc(item._id, item.image)}
            />
          );
        }}
      />
      <CreateAlertModal />
      <Button label={'CREATE NEW ALERT'} onpress={() => setShow(true)} />
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

export default NewsScreen;
