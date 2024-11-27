import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import API, {ENDPOINTS} from '../../api/apiService';
import {bgcolor} from '../../Constants';
import CategoryCard from '../../components/CategoryCard';
import Loading from '../../components/Loading';

const CategoryScreen = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    setLoading(true);
    try {
      let res = await API.get(ENDPOINTS.CATEGORY_ACTIONS);
      setCategories(res);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(x, i) => i.toString()}
        numColumns={2}
        refreshControl={<RefreshControl onRefresh={getCategories} />}
        renderItem={({item}) => {
          return <CategoryCard category={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgcolor,
  },
});

export default CategoryScreen;
