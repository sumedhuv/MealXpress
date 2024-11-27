import React from 'react';
import {View, StyleSheet, ImageBackground, Text, Image} from 'react-native';
import {bgcolor, height, sbgcolor, width} from '../Constants';
import Swiper from 'react-native-swiper';

const AdCorousel = ({list}) => {
  // const SwipeComponent = ({name, image, line1, line2, line3}) => {
  //   return (
  //     <ImageBackground
  //       imageStyle={{borderRadius: 20}}
  //       source={{
  //         uri: image,
  //       }}
  //       style={styles.imgBg}>
  //       <View
  //         style={{
  //           ...StyleSheet.absoluteFill,
  //           backgroundColor: 'rgba(0,0,0,0.4)',
  //           borderRadius: 20,
  //         }}
  //       />
  //       <View
  //         style={{margin: 20, justifyContent: 'space-between', height: '76%'}}>
  //         <Text style={styles.title}>{name}</Text>
  //         <View style={{height: '60%', justifyContent: 'space-evenly'}}>
  //           {line1 ? <Text style={styles.text}>{line1}</Text> : null}
  //           <Text style={styles.deal}>{line2}</Text>
  //           {line3 ? <Text style={styles.text}>{line3}</Text> : null}
  //         </View>
  //       </View>
  //     </ImageBackground>
  //   );
  // };

  return (
    <View style={styles.container}>
      <Swiper
        autoplay
        activeDotColor={sbgcolor}
        autoplayTimeout={3.5}
        removeClippedSubviews={false}>
        {list.map((item, index) => (
          <Image source={{uri: item.image}} key={index} style={styles.imgBg} />
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height * 0.4,
    backgroundColor: bgcolor,
    alignSelf: 'center',
    marginTop: 20,
  },
  imgBg: {
    height: height * 0.3,
    width: width * 0.95,
    alignSelf: 'center',
    borderRadius: 20,
  },
  // title: {
  //   fontWeight: 'bold',
  //   fontSize: 34,
  //   color: sbgcolor,
  //   letterSpacing: 4,
  // },
  // text: {
  //   fontSize: 18,
  //   color: 'white',
  //   letterSpacing: 2,
  // },
  // deal: {
  //   fontWeight: 'bold',
  //   fontSize: 30,
  //   color: 'white',
  //   letterSpacing: 3,
  //   textTransform: 'uppercase',
  // },
});

export default AdCorousel;
