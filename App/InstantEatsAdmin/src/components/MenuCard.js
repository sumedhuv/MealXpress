import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
} from 'react-native';
import {fontfamily, sbgcolor, width, yellow, textColor} from '../Constants';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import API, {ENDPOINTS} from '../api/apiService';
import EditModal, {EditFields} from './EditModal';
import {deletePic, uploadPic} from '../screens/common/getProfile';
import {RadioButton} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';

const MenuCard = ({item, deleteFunc}) => {
  const [temp, setTemp] = useState(item);
  const {name, description, image, price, isQuantity} = temp;
  const isVeg = temp.foodType === 'Non-Veg' ? false : true;
  const [show, setShow] = useState(false);

  const VegIcon = () => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Feather
          name={'square'}
          style={{
            color: isVeg ? '#219653' : '#CF0026',
            fontSize: 25,
            fontWeight: 'bold',
          }}
        />
        <Entypo
          name={'dot-single'}
          style={{
            color: isVeg ? '#219653' : '#CF0026',
            fontSize: 50,
            fontWeight: 'bold',
            position: 'absolute',
          }}
        />
      </View>
    );
  };
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
  const editItem = async (
    price,
    img,
    description,
    name1,
    foodType,
    isQuantity,
  ) => {
    try {
      var uri = img;
      if (!validURL(img)) {
        uri = await uploadPic(img);
      }

      if (uri) {
        let res = await API.put(
          ENDPOINTS.ITEM_ACTIONS + `/${item._id}`,
          {
            name: name1,
            description,
            image: uri,
            foodType,
            price: parseInt(price),
            isQuantity,
          },
          true,
        );
        setTemp(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const AddItemModel = () => {
    const [name1, setName1] = useState(name);
    const [description1, setDescription1] = useState(description);
    const [price1, setPrice1] = useState(price.toString());
    const [image1, setImage1] = useState(image);
    const [foodType, setFoodType] = useState(item.foodType);
    const [isQuantity1, setIsQuantity1] = useState(isQuantity);

    const chooseImage = async () => {
      if (image1) {
        try {
          await deletePic(image1);
        } catch (error) {
          console.log(error);
        }
        return setImage1('');
      }
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      })
        .then(image => {
          setImage1(image.path);
        })
        .catch(console.log);
    };

    return (
      <EditModal
        title={'Add Item'}
        visible={show}
        setVisible={setShow}
        onpress={async () => {
          await editItem(
            price1,
            image1,
            description1,
            name1,
            foodType,
            isQuantity1,
          );
        }}>
        <ScrollView>
          <EditFields title={'Name'} n={name1} setN={setName1} />
          <EditFields
            title={'Description'}
            n={description1}
            setN={setDescription1}
          />
          <Text style={styles.modalText}>Price</Text>
          <TextInput
            value={price1}
            onChangeText={n => setPrice1(n)}
            keyboardType={'number-pad'}
            style={styles.price}
          />
          <View style={{marginTop: 10}}>
            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                //justifyContent: 'space-evenly',
              }}>
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <RadioButton
                  color={'green'}
                  status={foodType == 'Veg' ? 'checked' : 'unchecked'}
                  onPress={() => setFoodType('Veg')}
                />
                <Text
                  style={{
                    fontSize: 18,
                    color: 'green',
                    fontWeight: 'bold',
                    marginTop: 5,
                    width: '30%',
                  }}>
                  Veg
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginLeft: 20,
                }}>
                <RadioButton
                  color={'red'}
                  status={foodType == 'Non-Veg' ? 'checked' : 'unchecked'}
                  onPress={() => setFoodType('Non-Veg')}
                />
                <Text
                  style={{
                    fontSize: 18,
                    color: 'red',
                    fontWeight: 'bold',
                    marginTop: 5,
                    width: '60%',
                  }}>
                  Non-Veg
                </Text>
              </View>
            </View>
            {/* <View
              style={{
                flexDirection: 'row',
                width: '90%',
                //justifyContent: 'space-evenly',
                marginTop: 20,
              }}>
              <View style={{flexDirection: 'row', width: '50%'}}>
                <RadioButton
                  color={sbgcolor}
                  status={isQuantity1 ? 'checked' : 'unchecked'}
                  onPress={() => setIsQuantity1(true)}
                />
                <Text
                  style={{
                    fontSize: 18,
                    color: textColor,
                    fontWeight: 'bold',
                    marginTop: 5,
                    width: '100%',
                  }}>
                  Quantity
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <RadioButton
                  color={sbgcolor}
                  status={!isQuantity1 ? 'checked' : 'unchecked'}
                  onPress={() => setIsQuantity1(false)}
                />
                <Text
                  style={{
                    fontSize: 18,
                    color: textColor,
                    fontWeight: 'bold',
                    marginTop: 5,
                    width: '45%',
                  }}>
                  Weight
                </Text>
              </View>
            </View> */}
          </View>
          {image1 ? <Text numberOfLines={1}>{image1}</Text> : null}
          <TouchableOpacity
            style={styles.addAddressButton}
            onPress={chooseImage}>
            <Text style={{fontSize: 22, letterSpacing: 2}}>
              {image1 ? 'Remove image' : '+ Add image'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </EditModal>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Image style={styles.image} source={{uri: image}} />
        <View style={styles.component}>
          <Text style={styles.name}>{name}</Text>
          <Text
            style={[styles.description, {color: '#666666'}]}
            numberOfLines={3}>
            {description}
          </Text>
          {/* {!isQuantity ? (
            <Text style={{fontWeight: 'bold'}}>1kg , 2kg , 3kg , ......</Text>
          ) : null} */}
        </View>
      </View>
      <View
        style={[
          styles.component,
          {alignItems: 'flex-end', justifyContent: 'space-evenly'},
        ]}>
        <Text style={{fontSize: 18}}>₹ {price}</Text>
        <VegIcon />
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons
            name={'pencil'}
            style={styles.icon}
            onPress={() => setShow(true)}
          />
          <MaterialCommunityIcons
            name={'delete'}
            style={styles.icon}
            onPress={deleteFunc}
          />
        </View>
      </View>
      <AddItemModel />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: '95%',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 2,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 10,
    fontFamily: fontfamily,
    justifyContent: 'space-around',
  },
  image: {
    height: 75,
    width: 75,
    borderRadius: 10,
    top: 5,
  },
  name: {
    fontSize: 22,
  },
  description: {
    fontSize: 15,
    width: width / 2.5,
  },
  component: {
    flexDirection: 'column',
    marginLeft: 15,
  },
  add: {
    width: 85,
    height: 30,
    borderColor: sbgcolor,
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    fontSize: 24,
    color: yellow,
    marginLeft: 20,
  },
  price: {
    width: '90%',
    backgroundColor: '#DDDDDD',
    borderBottomColor: '#666666',
    borderBottomWidth: 1,
    fontSize: 16,
    borderRadius: 5,
    marginTop: 5,
    color: 'black',
  },
  modalText: {
    color: '#666666',
    fontSize: 16,
    textAlign: 'left',
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

export default MenuCard;
