import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, VFC } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import ListItem from './components/ListItem';
import dummyArticles from './dummy/articles.json';
import Constants from 'expo-constants';
import axios from 'axios';

type Props = {
  urlToImage: string;
  title: string;
  author: string;
  publishedAt: string;
};

const URL = `https://newsapi.org/v2/top-headlines?country=jp&category=business&apiKey=${Constants.manifest.extra.newsApiKey}`;

export default function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await axios.get(URL);
      setArticles(res.data.articles);
      console.error(res);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }: { item: Props }) => (
    <ListItem
      imageUrl={item.urlToImage}
      title={item.title}
      author={item.author}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
