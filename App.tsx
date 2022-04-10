import { StatusBar } from 'expo-status-bar';
import { VFC } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import ListItem from './components/ListItem';
import articles from './dummy/articles.json';

type Props = {
  urlToImage: string;
  title: string;
  author: string;
  publishedAt: string;
}

type ItemProps = {
  item: Props
}

export default function App() {
  const renderItem: VFC<ItemProps> = ({ item }) => (
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
