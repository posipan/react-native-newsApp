import { useEffect, useState, VFC } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import ListItem from '../components/ListItem';
import Constants from 'expo-constants';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { Article } from '../types/article';

type RootStackParamList = {
  Home: undefined;
  Clip: undefined;
  Article: { article: Article };
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  // route: RouteProp<RootStackParamList, "Home">;
};

const URL = `https://newsapi.org/v2/top-headlines?country=jp&category=business&apiKey=${Constants.manifest.extra.newsApiKey}`;

export const HomeScreen: VFC<Props> = ({ navigation }: Props) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await axios.get(URL);
      setArticles(res.data.articles);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }: { item: Article }) => (
    <ListItem
      imageUrl={item.urlToImage}
      title={item.title}
      author={item.author}
      onPress={() => navigation.navigate('Article', { article: item })}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
