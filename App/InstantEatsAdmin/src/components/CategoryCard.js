import React, {useState} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {width, yellow} from '../Constants';
import API, {ENDPOINTS} from '../api/apiService';
import ImagePicker from 'react-native-image-crop-picker';
import EditModal from './EditModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {uploadPic, deletePic} from '../screens/common/getProfile';

const CategoryCard = ({category}) => {
  const [item, setItem] = useState(category);
  const [show, setShow] = useState(false);

  const UpdateCategoryModel = () => {
    const [image, setImage] = useState(item.image);

    // const [name, setName] = useState('');
    // const [description, setDescription] = useState('');
    function validURL(str) {
      var pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$',
        'i',
      ); // fragment locator
      return !!pattern.test(str);
    }

    const chooseImage = async () => {
      if (image) {
        try {
          await deletePic(image);
        } catch (error) {
          console.log(error);
        }
        return setImage('');
      }
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      })
        .then(image => {
          setImage(image.path);
        })
        .catch(console.log);
    };

    const addACategory = async () => {
      if (image === '') {
        return ToastAndroid.show(
          'Image field cannot be empty :(',
          ToastAndroid.SHORT,
        );
      }
      try {
        var uri = image;
        if (!validURL(image)) {
          uri = await uploadPic(image);
        }

        if (uri) {
          let res = await API.put(
            ENDPOINTS.CATEGORY_ACTIONS + `/${category._id}`,
            {
              image: uri,
            },
            true,
          );
          //console.log(res);
          setItem(res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <EditModal
        title={'Add a Category'}
        visible={show}
        setVisible={setShow}
        onpress={addACategory}>
        {image ? <Text numberOfLines={1}>{image}</Text> : null}
        <TouchableOpacity style={styles.addAddressButton} onPress={chooseImage}>
          <Text style={{fontSize: 22, letterSpacing: 2}}>
            {image ? 'Remove image' : '+ Add image'}
          </Text>
        </TouchableOpacity>
      </EditModal>
    );
  };

  return (
    <ImageBackground
      source={{uri: item.image}}
      style={styles.container}
      //imageStyle={{borderRadius: width / 20}}
    >
      <View
        style={{
          ...StyleSheet.absoluteFill,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      />
      <MaterialCommunityIcons
        name={'pencil'}
        style={styles.icon}
        onPress={() => setShow(true)}
      />
      <Text style={styles.text}>{item.name.replace(' ', '\n')}</Text>

      <UpdateCategoryModel />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 2.2,
    height: width / 2.2,
    margin: 8,
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: width / 20,
  },
  text: {
    color: 'white',
    fontSize: 32,
    //width: '70%',
    zIndex: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  addAddressButton: {
    width: '90%',
    backgroundColor: '#DDDDDD',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  icon: {
    fontSize: 26,
    color: yellow,
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 10,
    right: 10,
  },
});

export default CategoryCard;
