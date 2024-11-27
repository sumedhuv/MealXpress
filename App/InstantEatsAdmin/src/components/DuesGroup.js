import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  LayoutAnimation,
  UIManager,
  TouchableOpacity,
} from 'react-native';
import {bgcolor, textColor} from '../Constants';
import Icon from 'react-native-vector-icons/AntDesign';
import DuesCard from './DuesCard';

const DuesGroup = ({name, array}) => {
  const [expanded, setExpanded] = useState(false);
  //const [total, setTotal] = useState(0);
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

  useEffect(() => {
    // console.log(array);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const getTotal = () => {
    let temp = 0;
    for (let i in array) {
      temp += array[i].totalPrice;
    }
    return temp;
  };

  return (
    <View
      style={{
        backgroundColor: bgcolor,
        height: getHeight(),
        marginHorizontal: 15,
        marginBottom: 10,
      }}>
      <View style={styles.header}>
        <Text style={styles.category}>{name}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 14, marginRight: 20}}>
            Total Due:- ₹{getTotal()}
          </Text>
          <TouchableOpacity onPress={togglePlans}>
            <Icon name={expanded ? 'up' : 'down'} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {array.map((item, index) => {
        return <DuesCard item={item} key={index} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  category: {
    // textTransform: 'uppercase',
    color: textColor,
    fontSize: 18,
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
  icon: {
    right: 10,
    fontSize: 24,
    color: textColor,
  },
});

export default DuesGroup;
