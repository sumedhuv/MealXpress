import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  UIManager,
  Platform,
  ToastAndroid,
  Alert,
  TextInput,
} from 'react-native';
import {bgcolor, sbgcolor, textColor} from '../Constants';
import Icon from 'react-native-vector-icons/AntDesign';
import {Button} from 'react-native-paper';
import MenuCard from './MenuCard';
import API, {ENDPOINTS} from '../api/apiService';
import EditModal, {EditFields} from './EditModal';
import {uploadPic} from '../screens/common/getProfile';
import ImagePicker from 'react-native-image-crop-picker';
import {RadioButton} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';

const CategorySection = ({name, items, vID, id}) => {
  const [expanded, setExpanded] = useState(false);
  const [foods, setFoods] = useState(items);
  const [show, setShow] = useState(false);

  const togglePlans = () => {
    LayoutAnimation.configureNext({
      duration: 700,
      create: {type: 'linear', property: 'opacity'},
      update: {type: 'spring', springDamping: 1},
      delete: {type: 'linear', property: 'opacity'},
    });
    setExpanded(e => !e);
  };
  const getHeight = () => {
    if (expanded) return 'auto';
    else return 60;
  };
  // console.log(name);
  // console.log(vID);
  const addItem = async (
    price,
    img,
    description,
    name1,
    foodType,
    isQuantity,
  ) => {
    if (price === '' || img === '' || description === '' || name1 === '') {
      return ToastAndroid.show(
        'Item Fields cannot be empty :(',
        ToastAndroid.SHORT,
      );
    }
    try {
      let image = await uploadPic(img);
      if (image) {
        let res = await API.post(
          ENDPOINTS.ITEM_ACTIONS,
          {
            name: name1,
            description,
            category: id,
            image,
            foodType,
            price: parseInt(price) || 0,
            createdBy: vID,
            isQuantity,
          },
          true,
        );
        console.log(res);
        setFoods(f => [...f, res]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const AddItemModel = () => {
    const [name1, setName1] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [foodType, setFoodType] = useState('Veg');
    const [isQuantity, setIsQuantity] = useState(true);

    const chooseImage = () => {
      if (image) {
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

    return (
      <EditModal
        title={'Add Item'}
        visible={show}
        setVisible={setShow}
        onpress={async () => {
          await addItem(price, image, description, name1, foodType, isQuantity);
        }}>
        <ScrollView>
          <EditFields title={'Name'} n={name1} setN={setName1} />
          <EditFields
            title={'Description'}
            n={description}
            setN={setDescription}
          />
          <Text style={styles.modalText}>Price</Text>
          <TextInput
            value={price}
            onChangeText={n => setPrice(n)}
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
                  status={isQuantity ? 'checked' : 'unchecked'}
                  onPress={() => setIsQuantity(true)}
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
                  status={!isQuantity ? 'checked' : 'unchecked'}
                  onPress={() => setIsQuantity(false)}
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
          {image ? <Text numberOfLines={1}>{image}</Text> : null}
          <TouchableOpacity
            style={styles.addAddressButton}
            onPress={chooseImage}>
            <Text style={{fontSize: 22, letterSpacing: 2}}>
              {image ? 'Remove image' : '+ Add image'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </EditModal>
    );
  };

  const deleteItem = id => {
    Alert.alert(
      'Are you sure ? ',
      'You want to remove this item from your menu..',
      [
        {
          text: 'cancel',
          style: 'cancel',
        },
        {
          text: 'ok',
          onPress: async () => {
            try {
              let res = await API.deleteResource(
                ENDPOINTS.ITEM_ACTIONS + `/${id}`,
                true,
              );
              setFoods(f => f.filter(i => i._id != id));
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
    );
  };

  return (
    <View
      style={{
        backgroundColor: show ? 'rgba(0,0,0,0.15)' : bgcolor,
        height: getHeight(),
        marginHorizontal: 15,
        marginBottom: 10,
      }}>
      <View style={styles.header}>
        <Text style={styles.category}>{name}</Text>
        <Button
          icon={() => (
            <Icon name={expanded ? 'up' : 'down'} style={styles.icon} />
          )}
          onPress={togglePlans}></Button>
        {/* <TouchableOpacity onPress={togglePlans}>
          <Icon name={expanded ? 'up' : 'down'} style={styles.icon} />
        </TouchableOpacity> */}
      </View>
      {expanded ? (
        <View>
          <TouchableOpacity style={styles.add} onPress={() => setShow(true)}>
            <Text style={styles.label}>ADD ITEM</Text>
          </TouchableOpacity>
          {foods.map((item, index) => (
            <MenuCard
              item={item}
              key={index}
              deleteFunc={() => deleteItem(item._id)}
            />
          ))}
        </View>
      ) : null}
      <AddItemModel />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    right: 10,
    fontSize: 24,
    color: textColor,
  },
  category: {
    textTransform: 'uppercase',
    color: textColor,
    fontSize: 18,
    letterSpacing: 2,
    width: '85%',
  },
  header: {
    flexDirection: 'row',
    height: 60,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  add: {
    width: '100%',
    backgroundColor: bgcolor,
    borderWidth: 2,
    borderColor: sbgcolor,
    height: 60,
    alignSelf: 'center',
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {color: sbgcolor, letterSpacing: 2, fontSize: 22},
  addAddressButton: {
    width: '90%',
    backgroundColor: '#DDDDDD',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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
});
export default CategorySection;
