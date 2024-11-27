import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  ToastAndroid,
  Keyboard,
} from 'react-native';
import {
  bgcolor,
  fontfamily,
  height,
  sbgcolor,
  textColor,
  width,
} from '../Constants';
import Entypo from 'react-native-vector-icons/Entypo';
import ReviewCard from '../components/ReviewCard';
import Button from '../components/Button';
import {ActivityIndicator, Modal} from 'react-native-paper';
import API from '../api/apiService';
import {ENDPOINTS} from '../api/apiRoutes';

const ReviewScreen = ({props}) => {
  const [addReview, setAddReview] = useState(false);
  const [props1, setProps1] = useState(props);
  const [submitting, setSubmitting] = useState(false);

  const EditModal = ({children, title, name, comment, rating}) => {
    const [canSubmit, setCanSubmit] = useState(true);

    useEffect(() => {
      const listener1 = Keyboard.addListener('keyboardDidShow', () =>
        setCanSubmit(false),
      );
      const listener2 = Keyboard.addListener('keyboardDidHide', () =>
        setCanSubmit(true),
      );

      return listener1, listener2;
    }, []);

    return (
      <Modal
        visible={addReview}
        //animationType="slide"
        useNativeDriver
        transparent>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text
              style={{
                fontSize: 24,
                textAlign: 'center',
                color: textColor,
              }}>
              {title}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              marginBottom: 15,
              marginLeft: 15,
            }}>
            {children}
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={[styles.button, {borderWidth: 1, borderColor: sbgcolor}]}
              onPress={() => setAddReview(false)}>
              <Text style={[styles.buttonText, {color: sbgcolor}]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    !canSubmit || submitting ? '#EBEBE4' : sbgcolor,
                  flexDirection: 'row',
                },
              ]}
              disabled={!canSubmit || submitting}
              onPress={() => postReview(name, comment, rating)}>
              {submitting ? (
                <ActivityIndicator size={'small'} color={bgcolor} />
              ) : null}
              <Text style={[styles.buttonText, {color: bgcolor}]}>Done</Text>
            </TouchableOpacity>
          </View>
          <View style={{height: 20}} />
        </View>
      </Modal>
    );
  };

  const EditFields = ({title, setVal, val}) => {
    const isRating = title.includes('Rating');
    useEffect(() => {
      if (isRating && (parseFloat(val) > 5 || parseFloat(val) < 0)) {
        Alert.alert(
          'Invalid!',
          'Rating can neither be less than 1 nor more than 5',
          [
            {
              text: 'ok',
              style: 'cancel',
              onpress: setVal(''),
            },
          ],
        );
      }
    }, [val]);
    return (
      <View style={{marginBottom: 15}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
          }}>
          <Text style={styles.modalText}>{title}</Text>
        </View>
        <TextInput
          style={styles.textInput}
          value={val}
          onChangeText={n => setVal(n)}
          keyboardType={isRating ? 'decimal-pad' : 'default'}
          maxLength={isRating ? 3 : 50}
        />
        <Text style={{textAlign: 'right', marginRight: '10%'}}>
          {val.length}/{isRating ? 3 : 50}
        </Text>
      </View>
    );
  };

  const postReview = async (name, comment, rating) => {
    setSubmitting(true);
    if (name === '' || comment === '' || rating === '') {
      ToastAndroid.show(
        'Complete all fiels and submit with keyboard . Then press Done :)',
        ToastAndroid.SHORT,
      );
    } else {
      try {
        const res = await API.post(ENDPOINTS.ADD_REVIEW, {
          name,
          rating: parseFloat(rating),
          comment,
          vendorId: props._id,
        });
        setProps1(res);
        setAddReview(false);
      } catch (e) {
        console.log(e);
      }
    }
    setSubmitting(false);
  };

  const Review = () => {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');

    return (
      <EditModal
        title={'Add Your Review'}
        name={name}
        comment={comment}
        rating={rating}>
        <EditFields title={'Enter your name'} setVal={setName} val={name} />
        <EditFields title={'Enter Comment'} setVal={setComment} val={comment} />
        <EditFields title={'Rating'} setVal={setRating} val={rating} />
      </EditModal>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: addReview ? 'rgba(0,0,0,0.15)' : bgcolor,
        },
      ]}>
      <View style={styles.subheader}>
        <Text style={styles.category}>overall rating</Text>
        <View style={styles.overall}>
          <Text style={styles.rating}>
            {(Math.round(props1.avgRating * 10) / 10).toString().length === 1
              ? (Math.round(props1.avgRating * 10) / 10).toString() + '.0'
              : Math.round(props1.avgRating * 10) / 10}
          </Text>
          <Entypo name={'star'} style={styles.starBig} />
        </View>
      </View>
      <FlatList
        data={props1.reviews}
        keyExtractor={(x, i) => i.toString()}
        renderItem={({item}) => {
          return (
            <ReviewCard
              user={item.name}
              rating={item.rating}
              review={item.comment}
            />
          );
        }}
      />
      <Button label={'+  Add a Review'} onpress={() => setAddReview(true)} />
      <Review />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: fontfamily,
    backgroundColor: bgcolor,
  },
  category: {
    textTransform: 'uppercase',
    color: '#666666',
    fontSize: 22,
    marginTop: 10,
    marginLeft: 10,
  },
  subheader: {
    flexDirection: 'row',
    marginTop: 5,
    borderBottomColor: '#9F9F9F',
    borderBottomWidth: 1,
    height: height / 10,
    width: width / 1.1,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  starBig: {
    color: sbgcolor,
    fontSize: 22,
  },
  overall: {
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    alignItems: 'center',
    padding: 5,
  },
  rating: {
    fontWeight: 'bold',
    fontSize: 22,
    color: sbgcolor,
    width: 40,
  },
  button: {
    height: 60,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
  },
  modalView: {
    height: 'auto',
    maxHeight: height / 1.4,
    backgroundColor: bgcolor,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: '90%',
  },
  modalHeader: {
    height: 60,
    borderBottomColor: sbgcolor,
    borderBottomWidth: 1,
    justifyContent: 'center',
    marginTop: 10,
  },
  modalText: {
    color: '#666666',
    fontSize: 16,
    textAlign: 'left',
  },
  textInput: {
    width: '90%',
    backgroundColor: '#DDDDDD',
    borderBottomColor: '#666666',
    borderBottomWidth: 1,
    fontSize: 16,
    borderRadius: 5,
    marginTop: 5,
    color: 'black',
  },
});

export default ReviewScreen;
