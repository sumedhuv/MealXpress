import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, FlatList, RefreshControl} from 'react-native';
import Header from '../components/Header';
import NewsCard from '../components/NewsCard';
import {bgcolor, fontfamily} from '../Constants';
import Loading from '../components/Loading';
import API, {ENDPOINTS} from '../api/apiService';

const NotificationScreen = ({navigation}) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAlerts = async () => {
    setLoading(true);
    try {
      let res = await API.get(ENDPOINTS.GET_ALERTS, false);
      setNotifications(
        res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      );
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAlerts();
    console.log(notifications);
  }, []);

  return (
    <View style={styles.container}>
      <Header isRounded={true}>
        <Text style={styles.title}>News Alerts</Text>
        <View style={{height: 50}} />
      </Header>
      {/* <Text style={styles.info}>Tap on the alert to mark as read</Text> */}
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={notifications}
          style={{top: 15}}
          refreshControl={<RefreshControl onRefresh={getAlerts} />}
          keyExtractor={(x, i) => i.toString()}
          renderItem={({item}) => {
            return (
              <NewsCard
                news={item.name}
                image={item.image}
                day={item.createdAt}
              />
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: fontfamily,
    backgroundColor: bgcolor,
  },
  title: {
    color: bgcolor,
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    top: 20,
    letterSpacing: 3,
  },
  info: {
    fontSize: 16,
    //marginTop: 10,
    color: 'grey',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
  },
});

export default NotificationScreen;
