// import React from 'react';
// import {StyleSheet, View, Text, Linking, Platform} from 'react-native';
// import {bgcolor, fontfamily, width, yellow} from '../Constants';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

// const RestaurantDetailsCard = ({number, address}) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Restaurant Details</Text>
//       <View style={styles.seperator} />
//       <View style={{top: 15, left: 10}}>
//         <View style={{flexDirection: 'row'}}>
//           <FontAwesome name={'phone'} style={styles.icon} />
//           <Text
//             style={styles.subtext}
//             onPress={() => {
//               const num = Platform.select({
//                 ios: `telprompt:${'+91'}${number}`,
//                 android: `tel:${'+91'}${number}`,
//               });
//               Linking.openURL(num);
//             }}>
//             {number}
//           </Text>
//         </View>
//         <View style={{flexDirection: 'row', marginTop: 15}}>
//           <Ionicons name={'location-outline'} style={styles.icon} />
//           <Text
//             style={styles.subtext}
//             numberOfLines={3}
//             onPress={() => {
//               const url = Platform.select({
//                 ios: `maps:0,0?q=${address}`,
//                 android: `geo:0,0?q=${address}`,
//               });

//               Linking.openURL(url);
//             }}>
//             {address}
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     fontFamily: fontfamily,
//     backgroundColor: bgcolor,
//     height: 190,
//     width: width / 1.17,
//     elevation: 10,
//     borderRadius: 15,
//     alignSelf: 'center',
//     top: 24,
//   },
//   title: {
//     fontSize: 26,
//     paddingTop: 10,
//     paddingLeft: 15,
//     fontWeight: '400',
//   },
//   seperator: {
//     backgroundColor: '#9F9F9F',
//     height: 1,
//     width: width / 1.25,
//     alignSelf: 'center',
//     marginTop: 12,
//   },
//   icon: {
//     fontSize: 26,
//     color: yellow,
//     marginLeft: 20,
//   },
//   subtext: {
//     marginLeft: 20,
//     fontSize: 18,
//     width: width / 1.8,
//     textDecorationLine: 'underline',
//   },
// });

// export default RestaurantDetailsCard;
